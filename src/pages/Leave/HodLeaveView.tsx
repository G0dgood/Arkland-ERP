import React, { useEffect, useState } from 'react'
import { BsCalendarDate, BsCalendarDateFill, BsFillBriefcaseFill } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';
import TableLoader from '../../components/TableLoader';
import { Button } from '@material-ui/core';
import Cookies from 'js-cookie';
import moment from 'moment';
import { Spinner } from 'react-bootstrap';
import { fireAlert } from '../../utils/Alert';
import { useNavigate } from 'react-router-dom';

const HodLeaveView = ({ showLeave, setShowLeaver, leaveid }: any) => {
	const navigate = useNavigate();
	const token = Cookies.get("token");
	const [lgShow, setLgShow] = useState(false);
	const [isLoading, setisLoading] = useState(false);
	const [isSuccess, setisSuccess] = useState(false);
	const [isError, setisError] = useState(false)
	const [message, setMessage] = useState("");
	const [isLoading1, setisLoading1] = useState(false);
	const [isSuccess1, setisSuccess1] = useState(false);
	const [isError1, setisError1] = useState(false)
	const [message1, setMessage1] = useState("");
	const [data, setData] = useState("");
	const [count, setCount] = useState(0);
	const [inputs, setInputs] = useState({
		start_date: "",
		end_date: "",
		description: "",
		leave_type: ""
	})

	const title = "Successful";
	const html = "Leave Created!";
	const icon = "success";
	const title1 = "Leave error";
	const html1 = message1;
	const icon1 = "error";


	useEffect(() => {
		if (isSuccess1) {
			fireAlert(title, html, icon);
			setTimeout(() => {
				setisSuccess(false)
				setMessage1("")
			}, 5000);
			setLgShow(false)
		} else if (isError1) {
			fireAlert(title1, html1, icon1);
			setTimeout(() => {
				setisError1(false)
				setMessage1("")
			}, 5000);
		}
	}, [html, html1, isError1, isSuccess1, setMessage1])

	useEffect(() => {
		setisLoading(true);
		fetch(`${process.env.REACT_APP_API}/hr/leaves/${leaveid}`, {
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
					setData(data)
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
	}, [leaveid, token])

	useEffect(() => {
		// @ts-ignore  
		if (data?.data?.hod_approved === true) {
			setCount(1)
			// @ts-ignore  
		} else if (data?.data?.hr_approved === true) {
			setCount(3)
			// @ts-ignore  
		} else if (data?.data?.finally_approved === true) {
			setCount(3)
		} else {
			setCount(0)
		}
		// @ts-ignore 
	}, [data?.data?.finally_approved, data?.data?.hod_approved, data?.data?.hr_approved])

	useEffect(() => {
		setInputs((prevState: any) => {
			return ({
				...prevState,
				// @ts-ignore  
				description: data?.data?.description,
				// @ts-ignore  
				leave_type: data?.data?.type,
				// @ts-ignore  
				start_date: data?.data?.start_date,
				// @ts-ignore  
				end_date: data?.data?.end_date,

			});
		});
		// @ts-ignore  
	}, [setInputs, data?.data?.description, data?.data?.type, data?.data?.start_date, data?.data?.end_date]);


	const handelupdate = () => {
		setisLoading1(true);
		fetch(`${process.env.REACT_APP_API}/hr/leaves/${leaveid}/hod-approval`, {
			method: "PATCH", // or 'PUT'
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data?.success === false) {
					setMessage1(data?.message)
					setisError1(true)
				} else {
					setisSuccess(true)
					setTimeout(() => {
						navigate("/kpicontainer");
					}, 2000);
					setData(data?.data)
				}
				setisLoading1(false);
			})
			.catch((error) => {
				console.error("Error:", error);
				setisLoading1(false);
			});
	}

	return (
		<div className={showLeave ? "Drawer" : "Drawer1"}>
			<header className="ChatProgressView-header"  >
				<div className='leave-Update-titile-icon'>
					<span className="app-chat--icon">
						<BsFillBriefcaseFill />
					</span>
					<span className="in-progresss">
						UPDTAE LEAVE
					</span>

				</div>
				<div className="ChatProgressView-close" onClick={() => setShowLeaver(false)}>
					<MdOutlineClose
						size={25}
						style={{ color: "white", backgroundColor: "" }}
						className="ChatProgressView-close-icon"
					/>
				</div>
			</header>
			{isLoading ? <TableLoader isLoading={isLoading} /> : ""}
			<div className='contact-container-body'>
				<section className="contact-container">
					<div className="contact-logo">

					</div>

					<form className="contact-form">
						<div className="heading">
							{/* @ts-ignore */}
							<h2>Leave Type : {data?.data?.type}</h2>
							<p>Fill in information to update your Leave!</p>
						</div>
						<div  >
							<h6>Name</h6>
							<input id='Modal-textarea-input-sub' type={'text'}
								value={inputs.leave_type} />
							<div className='Modal-data-time'>
							</div>
							<div className='Modal-data-time'>
								<div className='Modal-two-input'>
									<h6>Start Date</h6>
									<input id='Modal-textarea-input-sub' type={'text'}
										value={moment(inputs?.start_date).format("DD-MM-YYYY")} />
								</div>
								<div className='div-space' />
								<div className='Modal-two-input'>
									<h6>End Date</h6>
									<input id='Modal-textarea-input-sub' type={'text'}
										value={moment(inputs?.end_date).format("DD-MM-YYYY")}
									/>
								</div>
							</div>
							<div className='Modal-textarea-middle'>
								<h6>Description</h6>
								<textarea rows={6} className='Modal-textarea'
									value={inputs.description}
								/>
							</div>
						</div>
						<div className='data-hod_approved'>
							<span className='data-hod_approved-span'>
								{/* @ts-ignore */}
								{data?.data?.hod_approved === false &&
									<Button variant="contained"
										className="table-link" type="submit">
										{/* {isLoading ? <Spinner animation="border" /> : "APPLY"} */}
										Delete</Button>}
							</span>
							<span>
								{/* @ts-ignore */}
								{data?.data?.hod_approved === false &&
									// <Button variant="contained"
									// 	className="table-link-active" onClick={handelupdate}>
									// 	{isLoading1 ? <Spinner animation="border" /> : "Approve"}
									// </Button>
									<div className='deleteKPIHandler  mt-5'>
										<span className='deleteKPIHandler-mr'>
											<Button className="table-link">
												Delete </Button></span>
										<span ><Button className="table-link-active" onClick={handelupdate} >
											{isLoading1 ? <Spinner animation="border" /> : "Approve"}
										</Button>
										</span>
									</div>
								}
							</span>
						</div>




					</form>
					<div className="contact-info">
						<h3 className="heading">Leave Details</h3>
						<ul className="contacts">
							<li>
								<span className='BsFillBriefcaseFill'><BsFillBriefcaseFill /></span>

								{/* @ts-ignore */}
								Leave Type : {data?.data?.type}
							</li>
							<li>
								<span className='BsFillBriefcaseFill'><BsCalendarDateFill /></span>
								{/* @ts-ignore */}
								State date : {moment(data?.data?.start_date).format("DD-MM-YYYY")}
							</li>
							<li>
								<span className='BsFillBriefcaseFill'><BsCalendarDate /></span>
								{/* @ts-ignore */}
								End date :  {moment(data?.data?.end_date).format("DD-MM-YYYY")}
							</li>

							<span  >
								Leave Progress
							</span>
							<div className='leave-type-progress'>
								<li className="  rounded mb-3">
									<div className="progress mb-3"  >
										{/* @ts-ignore */}
										{data?.data?.hod_approved === true && <div className="progress-bar bg-success" role="progressbar" style={{ width: "35% " }} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"> </div>}
										{/* @ts-ignore */}
										{data?.data?.hr_approved === true && <div className="progress-bar bg-warning" role="progressbar" style={{ width: "30% " }} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"> </div>}
										{/* @ts-ignore */}
										{data?.data?.finally_approved === true && <div className="progress-bar bg-danger" role="progressbar" style={{ width: "35% " }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"> </div>}

									</div>
									<div className="p-3">
										<div className="media">
											<div className="media-body align-self-center">
												<div className="small text-muted">{count + ' Aprovals'}</div>
											</div>
											<div className="align-self-center ml-3">
												{/* @ts-ignore */}
												{data?.data?.hod_approved === true &&
													<img className="rounded-circle border mr-n2" src="https://www.gravatar.com/avatar?d=mp&s=40" alt='' />}
												{/* @ts-ignore */}
												{data?.data?.hr_approved === true &&
													<img className="rounded-circle border mr-n2" src="https://www.gravatar.com/avatar?d=mp&s=40" alt='' />}
												{/* @ts-ignore */}
												{data?.data?.finally_approved === true &&
													<img className="rounded-circle border" src="https://www.gravatar.com/avatar?d=mp&s=40" alt='' />}
											</div>
										</div>
									</div>
									{/* @ts-ignore */}

									<Button className={data?.data?.finally_approved === true ? "table-link-active" : "table-link"}>{data?.data?.finally_approved === false ? "IN PROGRESS" : 'LEAVE APPROVED'}</Button>

								</li>
							</div>
						</ul>
						<div className="social-links"></div>
					</div>
				</section>
			</div>

		</div>
	)
}

export default HodLeaveView
