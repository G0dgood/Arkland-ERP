import { useEffect, useState } from 'react'
import { BsCalendarDate, BsCalendarDateFill, BsFillBriefcaseFill } from 'react-icons/bs';

import TableLoader from '../../components/TableLoader';
import { Button } from '@material-ui/core';
import moment from 'moment';
import { Spinner } from 'react-bootstrap';
import { fireAlert } from '../../utils/Alert';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/useStore';

import { reset } from '../../features/Announcement/announcemetSlice';
import { viewTeamLeave } from '../../features/Leave/leaveSlice';
import DataService from '../../utils/dataService';

const dataService = new DataService()
const HodLeaveView = () => {
	const dispatch = useAppDispatch();
	const token = dataService.getToken()
	const { teamviewdata: data, teamviewisError, teamviewisLoading, teamviewmessage } = useAppSelector((state: any) => state.leave)

	const { id } = useParams()
	const navigate = useNavigate();

	console.log('teamviewdata', data, teamviewisError, teamviewisLoading, teamviewmessage, id)

	useEffect(() => {
		dispatch(viewTeamLeave(id));
	}, [dispatch, id])


	const [isLoading, setisLoading] = useState(false);
	const [isSuccess, setisSuccess] = useState(false);
	const [isSuccess2, setisSuccess2] = useState(false);
	const [isError, setisError] = useState(false)
	const [message, setMessage] = useState("");
	const [isLoading1, setisLoading1] = useState(false);
	const [isLoading2, setisLoading2] = useState(false);
	const [isError1, setisError1] = useState(false)
	const [message1, setMessage1] = useState("");

	const [count, setCount] = useState(0);

	const [inputs, setInputs] = useState({
		start_date: "",
		end_date: "",
		description: "",
		leave_type: ""
	})

	const title = "Successful";
	const html = "Leave Approve!";
	const icon = "success";
	const title1 = "Leave error";
	const html1 = message1;
	const icon1 = "error";
	const title2 = "Successful";
	const html2 = "Leave have been Deleted!";
	const icon2 = "success";



	useEffect(() => {
		if (isSuccess) {
			fireAlert(title, html, icon);
			setTimeout(() => {
				setisSuccess(false)
				setMessage1("")
			}, 5000);
		} else if (teamviewisError) {
			fireAlert(title1, html1, icon1);
			dispatch(reset());
		} else if (isSuccess2) {
			fireAlert(title2, html2, icon2);
			setTimeout(() => {
				setisError1(false)
				setMessage1("")
			}, 5000);
		}
	}, [dispatch, html, html1, isError1, isSuccess, isSuccess2, setMessage1, teamviewisError])

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
					console.log('data?.message', data?.message)
					setisError(true)
				} else {
					console.log(data)

				}
				setisLoading(false);
			})
			.catch((error) => {
				console.error("Error:", error);
				setisLoading(false);
			});
	}, [id, navigate, token])

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
		// @ts-ignore 
	}, [data?.data?.finally_approved, data?.data?.hod_approved, data?.data?.hr_approved])



	useEffect(() => {
		setInputs((prevState: any) => {
			return ({
				...prevState,
				description: data?.data?.description,
				leave_type: data?.data?.type,
				start_date: data?.data?.start_date,
				end_date: data?.data?.end_date,

			});
		});
	}, [setInputs, data?.data?.description, data?.data?.type, data?.data?.start_date, data?.data?.end_date]);


	// const handelupdate = () => {
	// 	setisLoading1(true);
	// 	fetch(`${process.env.REACT_APP_API}/hr/leaves/${id}/hod-approval`, {
	// 		method: "PATCH", // or 'PUT'
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			Authorization: `Bearer ${token}`
	// 		},
	// 	})
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			if (data?.success === false) {
	// 				setMessage1(data?.message)

	// 			} else { 
	// 				setTimeout(() => {
	// 					navigate(-1);
	// 				}, 2000);
	// 			}
	// 			setisLoading1(false);
	// 		})
	// 		.catch((error) => {
	// 			console.error("Error:", error);
	// 			setisLoading1(false);
	// 		});
	// }

	// const handleDelete = () => {
	// 	setisLoading2(true);
	// 	axios
	// 		.patch(`${process.env.REACT_APP_API}/hr/leaves/${id}/reject`)
	// 		.then((res: AxiosResponse) => {
	// 			console.log('AxiosResponse', res)
	// 			setisLoading2(false);
	// 			setisSuccess2(true)
	// 			setTimeout(() => {
	// 				navigate("/teamleaveapplications");
	// 			}, 2000);
	// 		})
	// 		.catch((data) => {
	// 			setisLoading2(false);
	// 		});
	// }



	return (
		<div  >
			{teamviewisLoading ? <TableLoader isLoading={teamviewisLoading} /> : ""}
			<div className='contact-container-body'>
				<section className="contact-container">

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

							<span>
								{data?.data?.hod_approved === false &&
									<div className='deleteKPIHandler  mt-5'>
										<span className='deleteKPIHandler-mr'>
											<Button className="table-link"  >
												{isLoading2 ? <Spinner animation="border" /> : "Reject"}</Button>
										</span>
										<span ><Button className="table-link-active"   >
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

export default HodLeaveView
