import { useEffect, useState } from 'react'
import { EntriesPerPage, MainSearch, NoRecordFound, TableFetch } from '../../components/TableOptions'
import { BsCheckCircle } from 'react-icons/bs'
import { Button } from '@material-ui/core'
import Pagination from '../../components/Pagination'
import { ImBin } from 'react-icons/im'
import moment from 'moment'
import TableLoader from '../../components/TableLoader'
import DeleteModals from '../../components/DeleteModals'
import CreateRoleModal from '../../components/Modals/CreateRoleModal'
import { fireAlert } from '../../utils/Alert'
import { useAppDispatch, useAppSelector } from '../../store/useStore'
import { deleteRole, getRole, reset } from '../../features/Employee/employeeSlice'


const CreateRole = ({ setShowTitle }: any) => {
	const dispatch = useAppDispatch();
	const { getroledata, getroleisError, getroleisLoading, getrolemessage, getroleisSuccess } = useAppSelector((state: any) => state.employee)
	const { deleteroleisError, deleteroleisLoading, deleterolemessage, deleteroleisSuccess } = useAppSelector((state: any) => state.employee)

	const [showdelete, setShowDelete] = useState(false);
	const [rolesid, setRolesid] = useState(0);

	useEffect(() => {
		if (deleteroleisSuccess) {
			dispatch(getRole());
			dispatch(reset());
			fireAlert("Successful", "Role Deleted!", "success");
		} else
			if (deleteroleisError) {
				dispatch(reset());
				fireAlert("error", deleterolemessage, "error");
			}
	}, [deleterolemessage, deleteroleisError, deleteroleisSuccess, dispatch])



	useEffect(() => {
		dispatch(getRole());
	}, [dispatch]);


	const [sortData, setSortData] = useState([]);
	const [searchItem, setSearchItem] = useState("");

	useEffect(() => {
		if (getroleisError) {
			dispatch(reset());
			fireAlert("Error role", getrolemessage, "error");
		}
	}, [dispatch, getroleisError, getroleisSuccess, getrolemessage])

	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "10";
	});

	useEffect(() => {
		localStorage.setItem("reportsPerPage", entriesPerPage);
	}, [entriesPerPage]);

	useEffect(() => {
		if (getroledata) {
			// @ts-ignore
			const result = getroledata?.filter((data) => data?.name.toString()?.includes(searchItem));
			setSortData(result);
		}
	}, [getroledata, searchItem]);



	const [displayData, setDisplayData] = useState([]);

	const handleCreate = () => {
		// @ts-ignore
		dispatch(deleteRole(rolesid));
	}


	return (
		<div  >
			<div className='SiteWorkermaindiv'>
				<div className='SiteWorkermaindivsub'>
					<CreateRoleModal />
				</div>
				<div>
					<EntriesPerPage
						data={sortData}
						entriesPerPage={entriesPerPage}
						setEntriesPerPage={setEntriesPerPage}
					/>
				</div>
				<div>
					<MainSearch placeholder={'Search...         Role'} />
				</div>
			</div>
			<section className="md-ui component-data-table">
				{getroleisLoading ? <TableLoader isLoading={getroleisLoading} /> : ""}
				<div className="main-table-wrapper">
					<table className="main-table-content">
						<thead className="data-table-header">
							<tr className="data-table-row" >
								<td className="table-datacell datatype-numeric">Name</td>
								<td className="table-datacell datatype-numeric">Description</td>
								<td className="table-datacell datatype-numeric">Created Date</td>
								<td className="table-datacell datatype-numeric">Status</td>
								<td className="table-datacell datatype-numeric">ACTION</td>

							</tr>
						</thead>
						<tbody className="data-table-content">
							{getroleisLoading ? (
								<TableFetch colSpan={8} />
							) : displayData?.length === 0 || displayData == null ? (
								<NoRecordFound colSpan={8} />
							) : (
								displayData.map((item: any, i: any) => (
									<tr className="data-table-row" key={i}>
										<td className="table-datacell datatype-numeric">{item?.name}</td>
										<td className="table-datacell datatype-numeric">{item?.description}</td>
										<td className="table-datacell datatype-numeric">{moment(item?.created_at).format("DD-MM-YYYY")}</td>

										<td className="table-datacell datatype-numeric">
											{item?.status === "active" ? <BsCheckCircle size={25} color={"green"} /> : <BsCheckCircle size={25} color={"red"} className="icon-bold" />}

										</td>
										<td className="table-datacell datatype-numeric">
											<Button onClick={() => { setShowDelete(true); setRolesid(item?._id) }}> <ImBin size={25} color='#bf8412' /></Button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				<DeleteModals showdelete={showdelete} setShowDelete={setShowDelete} isLoading1={deleteroleisLoading} handleDelete={handleCreate} />
			</section>
			<footer className="main-table-footer">
				<Pagination
					setDisplayData={setDisplayData}
					data={sortData}
					entriesPerPage={entriesPerPage}
					Total={"Employee"}
				/>
			</footer>
		</div>
	)
}

export default CreateRole



