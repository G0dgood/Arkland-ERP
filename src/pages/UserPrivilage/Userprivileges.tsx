import { Button } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { NoRecordFound, SearchComponent, TableFetch } from '../../components/TableOptions'
import { BsCheckCircle } from 'react-icons/bs'
import moment from 'moment'
import TableLoader from '../../components/TableLoader'
import Pagination from '../../components/Pagination'
import AssignPrivilegesModal from '../../components/Modals/AssignPrivilegesModal'
import { useAppDispatch, useAppSelector } from '../../store/useStore'
import { userprivileges } from '../../features/User/userSlice'
import { useNavigate } from 'react-router-dom'



const Userprivileges = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { privilegesdata, privilegesisLoading } = useAppSelector((state: any) => state.userinfo)
	const { createisSuccess } = useAppSelector((state: any) => state.userinfo)
	const [displayData, setDisplayData] = useState([]);
	const [sortData, setSortData] = useState([]);
	const [result, setResult] = useState("");

	useEffect(() => {
		dispatch(userprivileges());
		if (createisSuccess) {
			dispatch(userprivileges());
		}
	}, [createisSuccess, dispatch]);

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


	return (

		<div id="reports">
			<h5 className="page-title">User Privileges</h5>

			<AssignPrivilegesModal />

			<div className='half-background'>
				<SearchComponent sortData={sortData} entriesPerPage={entriesPerPage} setEntriesPerPage={setEntriesPerPage} placeholder={"User Privileges"} />
				<section className="md-ui component-data-table">
					{privilegesisLoading ? <TableLoader isLoading={privilegesisLoading} /> : ""}
					<div className="main-table-wrapper">
						<table className="main-table-content">
							<thead className="data-table-header">
								<tr className="data-table-row" >
									<td className="table-datacell  ">Name</td>
									<td className="table-datacell  ">Role</td>
									<td className="table-datacell datatype-numeric">Created Date</td>
									<td className="table-datacell datatype-numeric">Status</td>
									<td className="table-datacell datatype-numeric">View</td>

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
											<td className="table-datacell ">{!item?.user?.full_name ? "---" : item?.user?.full_name}</td>
											<td className="table-datacell ">{item?.role}</td>
											<td className="table-datacell datatype-numeric">{moment(item?.created_at).format("DD-MM-YYYY")}</td>

											<td className="table-datacell datatype-numeric">
												{item?.status === "active" ? <BsCheckCircle size={25} color={"green"} /> : <BsCheckCircle size={25} color={"red"} className="icon-bold" />}

											</td>
											{/* <td className="table-datacell datatype-numeric">
											<Button onClick={() => { setShowDelete(true); setPrivilegesid(item?._id) }}> <ImBin size={25} color='#bf8412' /></Button>
										</td> */}
											<td className="table-datacell datatype-numeric">
												<Button id="view-status" onClick={() => navigate(`/userprivileges/userprivileges/viewprivilage/${item?.id}`)}>View</Button>
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
						Total={"Privileges"}
					/>
				</footer>
			</div>
		</div>
	)
}

export default Userprivileges
