import React, { useEffect, useState } from 'react'
import { Button } from "@material-ui/core";
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { EntriesPerPage, MainSearch, NoRecordFound, TableFetch } from '../../components/TableOptions';
import Cookies from 'js-cookie';
import storage from '../../utils/storage';
import Pagination from '../../components/Pagination';
import moment from 'moment';
import { BsCheckCircle, BsClock } from 'react-icons/bs';
import { SlClose } from 'react-icons/sl';
import HodLeaveView from './HodLeaveView';
import TableLoader from '../../components/TableLoader';

const TeamLeaveApplications = () => {
	const navigate = useNavigate();
	// @ts-ignore
	const userInfo: any = JSON.parse(storage?.get("user"));
	const token = Cookies.get("token");
	const [collapseNav, setCollapseNav] = useState(() => {
		// @ts-ignore
		return JSON.parse(localStorage.getItem("collapse")) || false;
	});

	useEffect(() => {
		// --- Set state of collapseNav to localStorage on pageLoad --- //
		localStorage.setItem("collapse", JSON.stringify(collapseNav));
		// --- Set state of collapseNav to localStorage on pageLoad --- //
	}, [collapseNav]);

	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "10";
	});

	useEffect(() => {
		localStorage.setItem("reportsPerPage", entriesPerPage);
	}, [entriesPerPage]);

	const toggleSideNav = () => {
		setCollapseNav(!collapseNav);
	}
	const [data, setData] = useState("");
	const [isLoading, setisLoading] = useState(false);
	const [isSuccess, setisSuccess] = useState(false);
	const [isError, setisError] = useState(false)
	const [message, setMessage] = useState("");
	const [sortData, setSortData] = useState([]);
	const [showLeave, setShowLeaver] = useState(false)
	const [leaveid, setLeaveid] = useState(0);




	useEffect(() => {
		setisLoading(true);
		fetch(`${process.env.REACT_APP_API}/hr/leaves?department=${userInfo?.data?.department?.id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data?.success === false) {
					setMessage(data?.message)
					setisError(true)
				} else {
					setSortData(data?.data?.data)
					console.log('data?.data?.data', data?.data?.data)
					setisSuccess(true)
					setTimeout(() => {
						setMessage('')
					}, 2000);
				}
				setisLoading(false);
			})
			.catch((error) => {
				console.error("Error:", error);
				setisLoading(false);
			});
	}, [token, userInfo?.data?.department?.id])




	const [displayData, setDisplayData] = useState([]);

	return (
		<div id="screen-wrapper">
			<Header toggleSideNav={toggleSideNav} />
			<Sidebar collapseNav={collapseNav} />
			<main>
				<div className='SiteWorkermaindiv'>
					<div className='SiteWorkermaindivsub'>


						<span className='SupportmainTitleh3'>My Team Leave Applications</span>
					</div>
					<div>
						<EntriesPerPage
							data={sortData}
							entriesPerPage={entriesPerPage}
							setEntriesPerPage={setEntriesPerPage}
						/>
					</div>
					<div>
						<MainSearch placeholder={'Search...          Team Leave '} />
					</div>
				</div>
				<section className="md-ui component-data-table">
					{isLoading ? <TableLoader isLoading={isLoading} /> : ""}
					{/* <header className="main-table-header">
							<h1 className="table-header--title">Nutrition</h1>
							<span className="table-header--icons"><i className="material-icons">filter_list</i><i className="material-icons">more_vert</i>
							</span>
						</header> */}
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
								{isLoading ? (
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
											<Button className={item?.hod_approved === false && item?.status !== "rejected" ? "table-link" : item?.hod_approved === true ? "table-link-active" : "table-link-reject"}>{item?.hod_approved === false && item?.status !== "rejected" ? "IN PROGRESS" : item?.status === "rejected" ? "Rejected" : 'LEAVE APPROVED'}</Button>
										</td>
										<td className="table-datacell datatype-numeric">
											{/* <Button id="team-applicatiom-update" onClick={() => {
												setLeaveid(item?._id);
												setShowLeaver(true);
												// @ts-ignore
											}}> {item?.hod_approved === false ? "Update" : "View"}</Button> */}
											<Link to={`/hodleaveview/${item?._id}`}  >
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
						data={sortData}
						entriesPerPage={entriesPerPage}
						Total={"Team Leave"}
					/>
				</footer>
			</main>
		</div>
	)
}

export default TeamLeaveApplications

