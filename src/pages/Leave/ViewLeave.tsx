import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core';
import { BsCalendarDate, BsCalendarDateFill, BsChatLeftText, BsFillBriefcaseFill } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';
import Cookies from 'js-cookie';
import TableLoader from '../../components/TableLoader';
import moment from 'moment';
import axios, { AxiosResponse } from 'axios';

const ViewLeave = ({ showLeave, setShowLeaver, leaveid }: any) => {

	const token = Cookies.get("token");


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
	// @ts-ignore  
	console.log('leaveid?.data?.description', inputs)

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


	// const handleDelete = () => {
	// 	setisLoading(true);
	// 	fetch(`${process.env.REACT_APP_API}/hr/appraisals/${leaveid}`, {
	// 		method: "GET", // or 'PUT'
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			Authorization: `Bearer ${token}`
	// 		},
	// 	})
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			if (data?.success === false) {
	// 				setMessage(data?.message)
	// 				setisError(true)
	// 			} else {
	// 				setData(data?.data)
	// 			}
	// 			setisLoading(false);
	// 		})
	// 		.catch((error) => {
	// 			console.error("Error:", error);
	// 			setisLoading(false);
	// 		});
	// }


	// const handleDelete = () => {
	// 	setisLoading1(true);
	// 	axios
	// 		.delete(`${process.env.REACT_APP_API}/hr/appraisals/${id}`)
	// 		.then((res: AxiosResponse) => {
	// 			setData(res?.data);
	// 			setisLoading1(false);
	// 			setTimeout(() => {
	// 				navigate("/kpicontainer");
	// 			}, 5000);
	// 		})
	// 		.catch((data) => {
	// 			console.log(data);
	// 			setisLoading1(false);
	// 		});
	// }



	const handleOnChange = (input: any, value: any) => {
		setInputs((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};

	useEffect(() => {
		setInputs((prevState: any) => {
			return ({
				...prevState,
				// @ts-ignore  
				description: data?.data?.description,
				// @ts-ignore  
				leave_type: data?.data?.type,

			});
		});
		// @ts-ignore  
	}, [setInputs, data?.data?.description, data?.data?.type]);

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
							<select id="Modal-textarea-input-sub"
								value={inputs.leave_type}
								onChange={(e) => handleOnChange("leave_type", e.target.value)}>
								<option value=" ">Select Name...</option>
								<option value="Paid Leave">Paid Leave</option>
								<option value="Sick Leave">Sick Leave</option>
								<option value="casual">Casual</option>
							</select >
							<div className='Modal-data-time'>
							</div>
							<div className='Modal-data-time'>
								<div className='Modal-two-input'>
									<h6>Start Date</h6>
									<input id='Modal-textarea-input-sub' placeholder='Select start date of leave' type={'date'}
										value={inputs.start_date}
										onChange={(e) => handleOnChange("start_date", e.target.value)} />
								</div>
								<div className='div-space' />
								<div className='Modal-two-input'>
									<h6>End Date</h6>
									<input id='Modal-textarea-input-sub' placeholder='Select end date of leave' type={'date'}
										value={inputs.end_date}
										onChange={(e) => handleOnChange("end_date", e.target.value)} />
								</div>
							</div>
							<div className='Modal-textarea-middle'>
								<h6>Description</h6>
								<textarea rows={6} className='Modal-textarea' placeholder='Enter detailed reason for leave'
									value={inputs.description}
									onChange={(e) => handleOnChange("description", e.target.value)} />
							</div>
						</div>
						{/* @ts-ignore */}
						{/* {data?.data?.hod_approved === false &&
							<Button variant="contained"
								className="Add-btn-modal" type="submit"> */}
						{/* {isLoading ? <Spinner animation="border" /> : "APPLY"} */}
						{/* Submit</Button>} */}
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

export default ViewLeave