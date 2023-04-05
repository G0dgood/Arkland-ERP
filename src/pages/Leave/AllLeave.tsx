// import React, { useEffect, useState } from 'react'
// import { BsCalendarDate, BsCalendarDateFill, BsFillBriefcaseFill } from 'react-icons/bs'
// import { MdOutlineClose } from 'react-icons/md'
// import TableLoader from '../../components/TableLoader'
// import Cookies from 'js-cookie'
// import { Link, useNavigate, useParams } from 'react-router-dom'
// import { Button } from '@material-ui/core';
// import moment from 'moment'
// import { Spinner } from 'react-bootstrap'
// import { fireAlert } from '../../utils/Alert'

// const AllLeave = ({ setShowLeave }: any) => {
// 	const navigate = useNavigate();
// 	const { id } = useParams()
// 	const token = Cookies.get("token");
// 	const [isLoading, setisLoading] = useState(false);
// 	const [isLoading1, setisLoading1] = useState(false);
// 	const [isSuccess, setisSuccess] = useState(false);
// 	const [isSuccess1, setisSuccess1] = useState(false);
// 	const [isError, setisError] = useState(false)
// 	const [isError1, setisError1] = useState(false)
// 	const [message, setMessage] = useState("");
// 	const [message1, setMessage1] = useState("");


// 	const [data, setData] = useState("");
// 	const [count, setCount] = useState(0);
// 	const [inputs, setInputs] = useState({
// 		start_date: "",
// 		end_date: "",
// 		description: "",
// 		leave_type: ""
// 	})
// 	// @ts-ignore  
// 	console.log('description', inputs)

// 	useEffect(() => {
// 		setisLoading(true);
// 		fetch(`${process.env.REACT_APP_API}/hr/leaves/${id}`, {
// 			method: "GET",
// 			headers: {
// 				"Content-Type": "application/json",
// 				Authorization: `Bearer ${token}`
// 			},
// 		})
// 			.then((response) => response.json())
// 			.then((data) => {
// 				if (data?.success === false) {
// 					setMessage(data?.message)
// 					setisError(true)
// 				} else {
// 					setData(data)
// 					setisSuccess(true)
// 					setTimeout(() => {
// 						setMessage('')
// 					}, 2000);
// 				}
// 				setisLoading(false);
// 			})
// 			.catch((error) => {
// 				console.error("Error:", error);
// 				setisLoading(false);
// 			});
// 	}, [id, token])



// 	const handelupdate = () => {
// 		setisLoading1(true);
// 		fetch(`${process.env.REACT_APP_API}/hr/leaves/${id}/final-approval`, {
// 			method: "PATCH", // or 'PUT'
// 			headers: {
// 				"Content-Type": "application/json",
// 				Authorization: `Bearer ${token}`
// 			},
// 		})
// 			.then((response) => response.json())
// 			.then((data) => {
// 				if (data?.success === false) {
// 					setMessage1(data?.message)
// 					setisError1(true)
// 				} else {
// 					setisSuccess(true)
// 					setTimeout(() => {
// 						navigate("/allleaveapplications");
// 					}, 2000);
// 					setData(data?.data)
// 				}
// 				setisLoading1(false);
// 			})
// 			.catch((error) => {
// 				console.error("Error:", error);
// 				setisLoading1(false);
// 			});
// 	}

// 	const title = "Successful";
// 	const html = "Final Approval Successful!";
// 	const icon = "success";
// 	const title1 = "Leave error";
// 	const html1 = message1;
// 	const icon1 = "error";


// 	useEffect(() => {
// 		if (isSuccess1) {
// 			fireAlert(title, html, icon);
// 			setTimeout(() => {
// 				setisSuccess(false)
// 				setMessage1("")
// 			}, 5000);
// 			// setLgShow(false)
// 		} else if (isError1) {
// 			fireAlert(title1, html1, icon1);
// 			setTimeout(() => {
// 				setisError1(false)
// 				setMessage1("")
// 			}, 5000);
// 		}
// 	}, [html, html1, isError1, isSuccess1, setMessage1])

// 	const handleOnChange = (input: any, value: any) => {
// 		setInputs((prevState: any) => ({
// 			...prevState,
// 			[input]: value,
// 		}));
// 	};

// 	useEffect(() => {
// 		setInputs((prevState: any) => {
// 			return ({
// 				...prevState,
// 				// @ts-ignore  
// 				description: data?.data?.description,
// 				// @ts-ignore  
// 				leave_type: data?.data?.type,

// 			});
// 		});
// 		// @ts-ignore  
// 	}, [setInputs, data?.data?.description, data?.data?.type]);

// 	useEffect(() => {
// 		// @ts-ignore  
// 		if (data?.data?.hod_approved === true) {
// 			setCount(1)
// 			// @ts-ignore  
// 		} else if (data?.data?.hr_approved === true) {
// 			setCount(3)
// 			// @ts-ignore  
// 		} else if (data?.data?.finally_approved === true) {
// 			setCount(3)
// 		} else {
// 			setCount(0)
// 		}
// 		// @ts-ignore 
// 	}, [data?.data?.finally_approved, data?.data?.hod_approved, data?.data?.hr_approved])

// 	return (
// 		<div>
// 			<header className="ChatProgressView-header"  >
// 				<div className='leave-Update-titile-icon'>
// 					<span className="app-chat--icon">
// 						<BsFillBriefcaseFill />
// 					</span>
// 					<span className="in-progresss">
// 						UPDTAE LEAVE
// 					</span>

// 				</div>
// 				<div className="ChatProgressView-close">
// 					<Link
// 						to={"/allleaveapplications"}>
// 						<MdOutlineClose
// 							size={25}
// 							style={{ color: "white", backgroundColor: "" }}
// 							className="ChatProgressView-close-icon"
// 						/>
// 					</Link>
// 				</div>
// 			</header>
// 			{isLoading ? <TableLoader isLoading={isLoading} /> : ""}
// 			<div className='contact-container-body'>
// 				<section className="contact-container">
// 					<div className="contact-logo">

// 					</div>

// 					<div className="contact-form">
// 						<div className="heading">
// 							{/* @ts-ignore */}
// 							<h2>Leave Type : {data?.data?.type}</h2>
// 							<p>Fill in information to update your Leave!</p>
// 						</div>
// 						<div  >
// 							<h6>Name</h6>
// 							<select id="Modal-textarea-input-sub"
// 								value={inputs.leave_type}
// 								onChange={(e) => handleOnChange("leave_type", e.target.value)}>
// 								<option value=" ">Select Name...</option>
// 								<option value="Paid Leave">Paid Leave</option>
// 								<option value="Sick Leave">Sick Leave</option>
// 								<option value="casual">Casual</option>
// 							</select >
// 							<div className='Modal-data-time'>
// 							</div>
// 							<div className='Modal-data-time'>
// 								<div className='Modal-two-input'>
// 									<h6>Start Date</h6>
// 									<input id='Modal-textarea-input-sub' placeholder='Select start date of leave' type={'date'}
// 										value={inputs.start_date}
// 										onChange={(e) => handleOnChange("start_date", e.target.value)} />
// 								</div>
// 								<div className='div-space' />
// 								<div className='Modal-two-input'>
// 									<h6>End Date</h6>
// 									<input id='Modal-textarea-input-sub' placeholder='Select end date of leave' type={'date'}
// 										value={inputs.end_date}
// 										onChange={(e) => handleOnChange("end_date", e.target.value)} />
// 								</div>
// 							</div>
// 							<div className='Modal-textarea-middle'>
// 								<h6>Description</h6>
// 								<textarea rows={6} className='Modal-textarea' placeholder='Enter detailed reason for leave'
// 									value={inputs.description}
// 									onChange={(e) => handleOnChange("description", e.target.value)} />
// 							</div>
// 						</div>
// 						{/* @ts-ignore */}
// 						{data?.data?.hr_approved === false &&
// 							<Button variant="contained"
// 								className="Add-btn-modal" type="submit" onClick={handelupdate}>
// 								{isLoading1 ? <Spinner animation="border" /> : "Approve"}</Button>}
// 					</div>
// 					<div className="contact-info">
// 						<h3 className="heading">Leave Details</h3>
// 						<ul className="contacts">
// 							<li>
// 								<span className='BsFillBriefcaseFill'><BsFillBriefcaseFill /></span>

// 								{/* @ts-ignore */}
// 								Leave Type : {data?.data?.type}
// 							</li>
// 							<li>
// 								<span className='BsFillBriefcaseFill'><BsCalendarDateFill /></span>
// 								{/* @ts-ignore */}
// 								State date : {moment(data?.data?.start_date).format("DD-MM-YYYY")}
// 							</li>
// 							<li>
// 								<span className='BsFillBriefcaseFill'><BsCalendarDate /></span>
// 								{/* @ts-ignore */}
// 								End date :  {moment(data?.data?.end_date).format("DD-MM-YYYY")}
// 							</li>

// 							<span  >
// 								Leave Progress
// 							</span>
// 							<div className='leave-type-progress'>
// 								<li className="  rounded mb-3">
// 									<div className="progress mb-3"  >
// 										{/* @ts-ignore */}
// 										{data?.data?.hod_approved === true && <div className="progress-bar bg-success" role="progressbar" style={{ width: "35% " }} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"> </div>}
// 										{/* @ts-ignore */}
// 										{data?.data?.hr_approved === true && <div className="progress-bar bg-warning" role="progressbar" style={{ width: "30% " }} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"> </div>}
// 										{/* @ts-ignore */}
// 										{data?.data?.finally_approved === true && <div className="progress-bar bg-danger" role="progressbar" style={{ width: "35% " }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"> </div>}

// 									</div>
// 									<div className="p-3">
// 										<div className="media">
// 											<div className="media-body align-self-center">
// 												<div className="small text-muted">{count + ' Aprovals'}</div>
// 											</div>
// 											<div className="align-self-center ml-3">
// 												{/* @ts-ignore */}
// 												{data?.data?.hod_approved === true &&
// 													<img className="rounded-circle border mr-n2" src="https://www.gravatar.com/avatar?d=mp&s=40" alt='' />}
// 												{/* @ts-ignore */}
// 												{data?.data?.hr_approved === true &&
// 													<img className="rounded-circle border mr-n2" src="https://www.gravatar.com/avatar?d=mp&s=40" alt='' />}
// 												{/* @ts-ignore */}
// 												{data?.data?.finally_approved === true &&
// 													<img className="rounded-circle border" src="https://www.gravatar.com/avatar?d=mp&s=40" alt='' />}
// 											</div>
// 										</div>
// 									</div>
// 									{/* @ts-ignore */}

// 									<Button className={data?.data?.finally_approved === true ? "table-link-active" : "table-link"}>{data?.data?.finally_approved === false ? "IN PROGRESS" : 'LEAVE APPROVED'}</Button>

// 								</li>
// 							</div>
// 						</ul>
// 						<div className="social-links"></div>
// 					</div>
// 				</section>
// 			</div>
// 		</div>
// 	)
// }

// export default AllLeave

import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { BsCheckCircle, BsClock } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Header from '../../components/Header'
import Pagination from '../../components/Pagination';
import Sidebar from '../../components/Sidebar'
import { EntriesPerPage, MainSearch, NoRecordFound, TableFetch } from '../../components/TableOptions';
import moment from 'moment';
import Cookies from 'js-cookie';
import storage from '../../utils/storage';
import TableLoader from '../../components/TableLoader';
import { SlClose } from 'react-icons/sl';

const AllLeave = () => {


	// @ts-ignore
	const userInfo: any = JSON.parse(storage?.get("user"));
	const token = Cookies.get("token");
	const [data, setData] = useState([]);
	const [sortData, setSortData] = useState([]);
	const [searchItem, setSearchItem] = useState("");
	const [isLoading, setisLoading] = useState(false);
	const [leaveid, setLeaveid] = useState(0);
	const [showLeave, setShowLeave] = useState(false)
	const [message, setMessage] = useState("");
	const [isError, setisError] = useState(false)

	useEffect(() => {
		setisLoading(true);
		fetch(`${process.env.REACT_APP_API}/hr/leaves`, {
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


	const [collapseNav, setCollapseNav] = useState(() => {
		// @ts-ignore
		return JSON.parse(localStorage.getItem("collapse")) || false;
	});

	useEffect(() => {
		// --- Set state of collapseNav to localStorage on pageLoad --- //
		localStorage.setItem("collapse", JSON.stringify(collapseNav));
		// --- Set state of collapseNav to localStorage on pageLoad --- //
	}, [collapseNav]);
	const toggleSideNav = () => {
		setCollapseNav(!collapseNav);
	};

	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "10";
	});

	useEffect(() => {
		localStorage.setItem("reportsPerPage", entriesPerPage);
	}, [entriesPerPage]);

	useEffect(() => {
		if (data) {
			const result = data?.filter((object) => {
				// @ts-ignore
				return JSON?.stringify(object)?.toString()?.includes(searchItem);
			});
			setSortData(result);
		}

	}, [data, searchItem]);

	const [displayData, setDisplayData] = useState([]);

	return (
		<div id="screen-wrapper">
			<Header toggleSideNav={toggleSideNav} />
			<Sidebar collapseNav={collapseNav} />
			<main>
				<div className='SiteWorkermaindiv'>
					<div className='SiteWorkermaindivsub'>


						<span className='SupportmainTitleh3'>Employee Leave Applications</span>
					</div>
					<div>
						<EntriesPerPage
							data={sortData}
							entriesPerPage={entriesPerPage}
							setEntriesPerPage={setEntriesPerPage}
						/>
					</div>
					<div>
						<MainSearch placeholder={'Search...         Leave Applications'} />

					</div>
				</div>
				<section className="md-ui component-data-table">
					{isLoading ? <TableLoader isLoading={isLoading} /> : ""}
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
								) : (
									displayData?.map((item: any, i: any) => (
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
												<Link to={`/finalleaveupdate/${item?._id}`}  >
													{/* @ts-ignore */}
													{item?.status === "rejected" ? "" :
														<Button id="team-applicatiom-update">{item?.finally_approved === false ? "Update" : "View"}</Button>}
												</Link>
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
						Total={"All Leave"}
					/>
				</footer>
			</main>
		</div>
	)
}

export default AllLeave
