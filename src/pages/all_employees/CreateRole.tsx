import { useEffect, useState } from 'react'
import { EntriesPerPage, MainSearch, NoRecordFound, SearchComponent, TableFetch } from '../../components/TableOptions'
import { BsCheckCircle } from 'react-icons/bs'
import { Button } from '@material-ui/core'
import Pagination from '../../components/Pagination'
import moment from 'moment'
import TableLoader from '../../components/TableLoader'
import CreateRoleModal from '../../components/Modals/CreateRoleModal'
import { useAppDispatch, useAppSelector } from '../../store/useStore'
import { getRole } from '../../features/Employee/employeeSlice'
import { useNavigate } from 'react-router-dom'
import CopyToClipboardButton from '../../components/CopyToClipboardButton'


const CreateRole = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { getroledata, getroleisLoading } = useAppSelector((state: any) => state.employee)
	const { createroleisSuccess } = useAppSelector((state: any) => state.employee)
	const [displayData, setDisplayData] = useState([]);

	useEffect(() => {
		dispatch(getRole());
		if (createroleisSuccess) {
			dispatch(getRole());

		}
	}, [createroleisSuccess, dispatch]);


	const [sortData, setSortData] = useState([]);
	const [searchItem, setSearchItem] = useState("");



	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "8";
	});

	useEffect(() => {
		localStorage.setItem("reportsPerPage", entriesPerPage);
	}, [entriesPerPage]);

	useEffect(() => {
		if (getroledata) {
			// @ts-ignore
			const result = getroledata?.filter((data) => data?.name?.toString()?.includes(searchItem));
			setSortData(result);
		}
	}, [getroledata, searchItem]);






	return (

		<div id="reports">
			<h5 className="page-title">Employee Role</h5>
			<ul className="nav-tabs-btn mb-3">
				<CreateRoleModal />
			</ul>
			<div className='half-background'>
				<SearchComponent sortData={sortData} entriesPerPage={entriesPerPage} setEntriesPerPage={setEntriesPerPage} placeholder={"Role"} />
				<section className="md-ui component-data-table">
					{getroleisLoading ? <TableLoader isLoading={getroleisLoading} /> : ""}
					<div className="main-table-wrapper">
						<table className="main-table-content">
							<thead className="data-table-header">
								<tr className="data-table-row" >
									<td className="table-datacell  ">Name</td>
									<td className="table-datacell ">ID</td>
									<td className="table-datacell ">Description</td>
									<td className="table-datacell ">Created Date</td>
									<td className="table-datacell ">Status</td>
									<td className="table-datacell ">Action</td>

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
											<td className="table-datacell  ">{item?.name}</td>
											<td className="table-datacell ">
												<CopyToClipboardButton url={item?.id} padding={"6px"} size={15} />
											</td>
											<td className="table-datacell ">{item?.description}</td>
											<td className="table-datacell ">{moment(item?.created_at).format("DD-MM-YYYY")}</td>

											<td className="table-datacell ">
												{item?.status === "active" ? <BsCheckCircle size={25} color={"green"} /> : <BsCheckCircle size={25} color={"red"} className="icon-bold" />}

											</td>
											<td className="table-datacell ">
												<Button id="view-status" onClick={() => navigate(`/userrole/userrole/viewrole/${item?.id}`)}>View</Button>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>


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
		</div>
	)
}

export default CreateRole



