import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core';
import { BsCalendarDate, BsCalendarDateFill, BsFillBriefcaseFill } from 'react-icons/bs';
import TableLoader from '../../components/TableLoader';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import DataService from '../../utils/dataService';
const dataService = new DataService()

const ViewLeave = () => {

	const { id } = useParams()
	const token = dataService.getToken()

	const [isLoading, setisLoading] = useState(false);
	const [isError, setisError] = useState(false)
	const [message, setMessage] = useState("");

	const [data, setData] = useState<any>("");
	const [count, setCount] = useState(0);
	const [inputs, setInputs] = useState({
		start_date: "",
		end_date: "",
		description: "",
		leave_type: ""
	})


	useEffect(() => {
		setisLoading(true);
		fetch(`${process.env.REACT_APP_API}/hr/leaves/${id}`, {
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
				}
				setisLoading(false);
			})
			.catch((error) => {
				console.error("Error:", error);
				setisLoading(false);
			});
	}, [id, token])





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
				description: data?.data?.description,
				leave_type: data?.data?.type,

			});
		});

	}, [setInputs, data?.data?.description, data?.data?.type]);

	useEffect(() => {
		if (data?.data?.hod_approved === true && !data?.data?.hr_approved) {
			setCount(1)
		} else if (data?.data?.hr_approved && data?.data?.hod_approved && !data?.data?.finally_approved) {
			setCount(2)
		} else if (data?.data?.hr_approved === true && data?.data?.hod_approved === true && data?.data?.finally_approved === true) {
			setCount(3)
		} else {
			setCount(0)
		}
	}, [data?.data?.finally_approved, data?.data?.hod_approved, data?.data?.hr_approved])


	return (
		<div  >
			{/* <header className="ChatProgressView-header"  >
				<div className='leave-Update-titile-icon'>
					<BsFillBriefcaseFill />

					<span className="in-progresss">
						My Leave Applications
					</span>

				</div>
				<div className="ChatProgressView-close"  >
					<Link
						to={"/leave"}>
						<MdOutlineClose
							size={25}
							style={{ color: "white", backgroundColor: "" }}
							className="ChatProgressView-close-icon"
						/>
					</Link>
				</div>
			</header> */}

			{isLoading ? <TableLoader isLoading={isLoading} /> : ""}
			<div className='contact-container-body'>
				<section className="contact-container">


					<form className="contact-form">
						<div className="heading">
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
					</form>
					<div className="contact-info">
						<h3 className="heading">Leave Details</h3>
						<ul className="contacts">
							<li>
								<span className='BsFillBriefcaseFill'><BsFillBriefcaseFill /></span>
								Leave Type : {data?.data?.type}
							</li>
							<li>
								<span className='BsFillBriefcaseFill'><BsCalendarDateFill /></span>
								State date : {moment(data?.data?.start_date).format("DD-MM-YYYY")}
							</li>
							<li>
								<span className='BsFillBriefcaseFill'><BsCalendarDate /></span>
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
												{data?.data?.hod_approved === true &&
													<img className="rounded-circle border mr-n2" src="https://www.gravatar.com/avatar?d=mp&s=40" alt='' />}
												{data?.data?.hr_approved === true &&
													<img className="rounded-circle border mr-n2" src="https://www.gravatar.com/avatar?d=mp&s=40" alt='' />}
												{data?.data?.finally_approved === true &&
													<img className="rounded-circle border" src="https://www.gravatar.com/avatar?d=mp&s=40" alt='' />}
											</div>
										</div>
									</div>

									<Button className={data?.data?.status === "HOD approved" ? "table-link" :
										data?.data?.status === "HR approved" ? "table-link-hr" :
											data?.data?.status === "approved" ? "table-link-active" :
												data?.data?.status === "rejected" ? "table-link-reject" : "table-link"}>
										{data?.data?.status === "HOD approved" ? "HOD approved" :
											data?.data?.status === "HR approved" ? "HR approved" :
												data?.data?.status === "approved" ? "LEAVE approved" :
													data?.data?.status === "rejected" ? "LEAVE Rejected" : "IN Progress"}</Button>

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