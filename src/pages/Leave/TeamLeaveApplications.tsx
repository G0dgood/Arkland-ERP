import { useEffect, useState } from 'react'
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { EntriesPerPage, MainSearch, NoRecordFound, TableFetch } from '../../components/TableOptions';
import Pagination from '../../components/Pagination';
import moment from 'moment';
import { BsCheckCircle, BsClock } from 'react-icons/bs';
import { SlClose } from 'react-icons/sl';
import TableLoader from '../../components/TableLoader';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import DataService from '../../utils/dataService';
import { getTeamLeave } from '../../features/Leave/leaveSlice';


const dataService = new DataService()
const TeamLeaveApplications = () => {
	const userInfo = dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`)
	const dispatch = useAppDispatch();
	const { teamdata, teamisLoading } = useAppSelector((state: any) => state.leave)

	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "10";
	});




	const id = userInfo?.department?.id

	useEffect(() => {
		dispatch(getTeamLeave(id));
	}, [dispatch, id])

	// const [activities, setactivities] = useState<any>(newg?.map((item: any, i: any) => (

	// 	{
	// 		id: i + 1,
	// 		name: item?.fullName?.value,
	// 		nameComment: item?.fullName?.comment,
	// 		address: item?.address?.value,
	// 		addressComment: item?.address?.comment,

	// 	})) || []);

	// useEffect(() => {
	// 	if (newg) {
	// 		setactivities(newg?.map((item: any, i: any) => (

	// 			{
	// 				id: i + 1,
	// 				name: item?.fullName?.value,
	// 				nameComment: item?.fullName?.comment,
	// 				address: item?.address?.value,
	// 				addressComment: item?.address?.comment,

	// 			})))
	// 	}
	// }, [newg])


	const [displayData, setDisplayData] = useState([]);

	return (
		<div  >
			<div className='SiteWorkermaindiv'>
				<div className='SiteWorkermaindivsub'>
					<span className='SupportmainTitleh3'>My Team Leave Applications</span>
				</div>
				<div>
					<EntriesPerPage
						data={teamdata}
						entriesPerPage={entriesPerPage}
						setEntriesPerPage={setEntriesPerPage}
					/>
				</div>
				<div>
					<MainSearch placeholder={'Search...          Team Leave '} />
				</div>
			</div>
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
										<Button className={item?.status === "HOD approved" ? "table-link" :
											item?.status === "HR approved" ? "table-link-hr" :
												item?.status === "approved" ? "table-link-active" :
													item?.status === "rejected" ? "table-link-reject" : "table-link"}>{item?.status === "HOD approved" ? "HOD approved" :
														item?.status === "HR approved" ? "HR approved" :
															item?.status === "approved" ? "LEAVE approved" :
																item?.status === "rejected" ? "LEAVE Rejected" : "IN Progress"}</Button>
									</td>
									<td className="table-datacell datatype-numeric">
										<Link to={`/leave/leave/hod/${item?._id}`}  >
											{item?.status === "rejected" ? "" :
												<Button id="team-applicatiom-update">{item?.hod_approved === false ? "Update" : "View"}</Button>
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
					data={teamdata?.data}
					entriesPerPage={entriesPerPage}
					Total={"Team Leave"}
				/>
			</footer>
		</div>
	)
}

export default TeamLeaveApplications

