import { Button } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { EntriesPerPage, MainSearch, NoRecordFound, TableFetch } from './TableOptions'
import { BsCheckCircle } from 'react-icons/bs'
import moment from 'moment'
import TableLoader from './TableLoader'
import Pagination from './Pagination'
import { ImBin } from 'react-icons/im'
import DeleteModals from './DeleteModals'
import { fireAlert } from '../utils/Alert'
import AssignPrivilegesModal from './Modals/AssignPrivilegesModal'
import { useAppDispatch, useAppSelector } from '../store/useStore'
import { deleteprivileges, reset, userprivileges } from '../features/User/userSlice'


const Userprivileges = ({ showprivileges, setShowprivileges, }: any) => {
	const dispatch = useAppDispatch();
	const { privilegesdata, privilegesisError, privilegesisLoading, privilegesmessage } = useAppSelector((state: any) => state.userinfo)
	const { deleteisError, deleteisLoading, deletemessage, deleteisSuccess } = useAppSelector((state: any) => state.userinfo)

	const [sortData, setSortData] = useState([]);
	const [showdelete, setShowDelete] = useState(false);
	const [id, setPrivilegesid] = useState(0);
	const [result, setResult] = useState("");


	useEffect(() => {
		// @ts-ignore
		dispatch(userprivileges());
	}, [dispatch]);

	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "10";
	});

	useEffect(() => {
		localStorage.setItem("reportsPerPage", entriesPerPage);
	}, [entriesPerPage]);


	useEffect(() => {
		if (privilegesdata) {
			// @ts-ignore
			const results = privilegesdata?.data?.filter((data) => data?.role.toString()?.includes(result));
			setSortData(results);
		}
	}, [privilegesdata, result]);

	const onChange = (e: any) => {
		setResult(e.target.value);
	}



	const title = "Successful";
	const html = "User Privilege Deleted!";
	const icon = "success";
	const title1 = "Delete Privilege error";

	const icon1 = "error";


	useEffect(() => {
		if (deleteisSuccess) {
			fireAlert(title, html, icon);
			setShowDelete(false)
			dispatch(userprivileges());
			dispatch(reset());
		} else if (deleteisError) {
			fireAlert(title1, deletemessage, icon1);
			dispatch(reset());
		} else if (privilegesisError) {
			fireAlert(title1, privilegesmessage, icon1);
			dispatch(reset());
		}
	}, [deleteisError, deleteisSuccess, deletemessage, dispatch, html, privilegesisError, privilegesmessage])

	const handleDelete = () => {
		// @ts-ignore
		dispatch(deleteprivileges(id));
	}

	const [displayData, setDisplayData] = useState([]);

	return (
		<div  >
			<div className='SiteWorkermaindiv'>
				<div className='SiteWorkermaindivsub'>
					{/* <span className='SupportmainTitleh3'> */}
					<AssignPrivilegesModal />
					{/* </span> */}
				</div>
				<div>
					<EntriesPerPage
						data={displayData}
						entriesPerPage={entriesPerPage}
						setEntriesPerPage={setEntriesPerPage}
					/>
				</div>
				<div>
					<MainSearch placeholder={'Search...      User Privileges'} onChange={onChange} result={result} />
				</div>
			</div>

			<section className="md-ui component-data-table">
				{privilegesisLoading ? <TableLoader isLoading={privilegesisLoading} /> : ""}
				<div className="main-table-wrapper">
					<table className="main-table-content">
						<thead className="data-table-header">
							<tr className="data-table-row" >
								<td className="table-datacell datatype-numeric">Role</td>
								<td className="table-datacell datatype-numeric">Created Date</td>
								<td className="table-datacell datatype-numeric">Status</td>
								<td className="table-datacell datatype-numeric">ACTION</td>

							</tr>
						</thead>
						<tbody className="data-table-content">
							{privilegesisLoading ? (
								<TableFetch colSpan={8} />
							) : displayData?.length === 0 || displayData == null ? (
								<NoRecordFound colSpan={8} />
							) : (
								displayData.map((item: any, i: any) => (
									<tr className="data-table-row" key={i}>
										<td className="table-datacell datatype-numeric">{item?.role}</td>
										<td className="table-datacell datatype-numeric">{moment(item?.created_at).format("DD-MM-YYYY")}</td>

										<td className="table-datacell datatype-numeric">
											{item?.status === "active" ? <BsCheckCircle size={25} color={"green"} /> : <BsCheckCircle size={25} color={"red"} className="icon-bold" />}

										</td>
										<td className="table-datacell datatype-numeric">
											<Button onClick={() => { setShowDelete(true); setPrivilegesid(item?._id) }}> <ImBin size={25} color='#bf8412' /></Button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</section>
			<DeleteModals showdelete={showdelete} setShowDelete={setShowDelete} handleDelete={handleDelete} isLoading1={deleteisLoading} />
			<footer className="main-table-footer">
				<Pagination
					setDisplayData={setDisplayData}
					data={sortData}
					entriesPerPage={entriesPerPage}
					Total={"Privileges"}
				/>
			</footer>
		</div>
	)
}

export default Userprivileges
