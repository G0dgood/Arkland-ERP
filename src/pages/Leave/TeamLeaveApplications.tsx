import { useEffect, useState } from 'react'
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { NoRecordFound, SearchComponent, TableFetch } from '../../components/TableOptions';
import Pagination from '../../components/Pagination';
import moment from 'moment';
import { BsCheckCircle, BsClock } from 'react-icons/bs';
import { SlClose } from 'react-icons/sl';
import TableLoader from '../../components/TableLoader';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { getTeamLeave } from '../../features/Leave/leaveSlice';




const TeamLeaveApplications = () => {
	const dispatch = useAppDispatch();
	const { teamdata, teamisLoading } = useAppSelector((state: any) => state.leave)

	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "10";
	});


	useEffect(() => {
		dispatch(getTeamLeave());
	}, [dispatch])


	const [displayData, setDisplayData] = useState([]);

	return (

		<div id="reports">
			<h5 className="page-title">My Team Leave Applications</h5>

			<div className='half-background mt-4'>
				<SearchComponent sortData={teamdata} entriesPerPage={entriesPerPage} setEntriesPerPage={setEntriesPerPage} placeholder={"My Team Leave Applications"} />
				<section className="md-ui component-data-table">
					{teamisLoading ? <TableLoader isLoading={teamisLoading} /> : ""}
					<div className="main-table-wrapper">
						<table className="main-table-content">
							<thead className="data-table-header">
								<tr className="data-table-row" >
									<td className="table-datacell datatype-numeric">Date Applied</td>
									<td className="table-datacell datatype-numeric">Leave  Type</td>
									<td className="table-datacell datatype-numeric">Start Date</td>
									<td className="table-datacell datatype-numeric">End Date</td>
									<td className="table-datacell datatype-numeric">HOD Approval</td>
									<td className="table-datacell datatype-numeric">HR Approval</td>
									<td className="table-datacell datatype-numeric">Final Approval</td>
									<td className="table-datacell datatype-numeric">Leave Status</td>
									<td className="table-datacell datatype-numeric">View</td>
								</tr>
							</thead>
							<tbody className="data-table-content">
								{teamisLoading ? (
									<TableFetch colSpan={9} />
								) : displayData?.length === 0 || displayData == null ? (
									<NoRecordFound colSpan={9} />
								) : (displayData?.map((item: any, i: any) => (
									<tr className="data-table-row" key={i}>
										<td className="table-datacell datatype-numeric">{moment(item?.updated_at).format("DD-MM-YYYY")}</td>
										<td className="table-datacell datatype-numeric">{item?.type}</td>
										<td className="table-datacell datatype-numeric">{moment(item?.start_date).format("DD-MM-YYYY")}</td>
										<td className="table-datacell datatype-numeric">{moment(item?.end_date).format("DD-MM-YYYY")}</td>
										<td className="table-datacell datatype-numeric">
											{item?.hod_approved ?
												<BsCheckCircle size={25} color={"green"} /> : item?.status === "rejected" ?
													<SlClose size={25} color={"red"} className="icon-bold" /> :
													<BsClock size={25} color={"#bf8412"} className="icon-bold" />}
										</td>
										<td className="table-datacell datatype-numeric">
											{item?.hr_approved ?
												<BsCheckCircle size={25} color={"green"} /> : item?.status === "rejected" ?
													<SlClose size={25} color={"red"} className="icon-bold" /> :
													<BsClock size={25} color={"#bf8412"} className="icon-bold" />}
										</td>
										<td className="table-datacell datatype-numeric">
											{item?.finally_approved ?
												<BsCheckCircle size={25} color={"green"} /> : item?.status === "rejected" ?
													<SlClose size={25} color={"red"} className="icon-bold" /> :
													<BsClock size={25} color={"#bf8412"} className="icon-bold" />}
										</td>
										<td className="table-datacell datatype-numeric">
											{/* @ts-ignore */}
											<div className={
												item?.status === "HR approved"
													? "status is-purple   move-svg-left"
													: item?.status === "HOD approved"
														? "status  is-pending move-svg-left" :
														item?.status === "approved"
															? "status is-green  move-svg-left" :
															item?.status === "rejected"
																? "status is-red move-svg-left" :
																"status  is-pending" && "status is-wait move-svg-left"}>
												{item?.status === "HR approved"
													? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
														<path d="M20 6L9 17l-5-5" />
													</svg>
													: item?.status === "HOD approved" ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
														<path d="M20 6L9 17l-5-5" />
													</svg>
														: item?.status === "approved" ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
															<path d="M20 6L9 17l-5-5" />
														</svg>
															: item?.status === "rejected" ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
																<path d="M18 6L6 18M6 6l12 12" />
															</svg>
																: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-loader">
																	<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
																</svg>}
												{item?.status === "HOD approved" ? "HOD Approved" :
													item?.status === "HR approved" ? "HR Approved" :
														item?.status === "approved" ? "Leave Approved" :
															item?.status === "rejected" ? "Leave Rejected" :
																"IN Progress"}
											</div>

										</td>
										<td className="table-datacell datatype-numeric">
											<Link to={`/leave/leave/hod/${item?._id}`}>
												{item?.status === "rejected" ? "" :
													<Button id="team-applicatiom-update">
														{item?.hod_approved === false ? "Update" : "View"}
													</Button>
												}
											</Link>
										</td>
									</tr>
								)))}
							</tbody>
						</table>
					</div>

				</section>
				<footer className="main-table-footer">
					<Pagination
						setDisplayData={setDisplayData}
						data={teamdata}
						entriesPerPage={entriesPerPage}
						Total={"Team Leave"}
					/>
				</footer>
			</div>
		</div>
	)
}

export default TeamLeaveApplications

