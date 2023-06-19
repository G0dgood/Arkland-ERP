import { useEffect, useState } from 'react'
import { BsCalendarDate, BsCalendarDateFill, BsFillBriefcaseFill } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@material-ui/core';
import moment from 'moment'
import { Spinner } from 'react-bootstrap'
import { fireAlert } from '../../utils/Alert'
import { BounceLoader } from 'react-spinners'
import { SlBriefcase } from 'react-icons/sl'
import { useAppDispatch, useAppSelector } from '../../store/useStore'
import { hrApproveLeave, rejectLeave, reset, viewTeamLeave, } from '../../features/Leave/leaveSlice';


const HRUpdateLeave = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { id } = useParams()
	const { teamviewdata: data, teamviewisLoading: isLoading } = useAppSelector((state: any) => state.leave)

	const { hrApproveisLoading, hrApproveisSuccess } = useAppSelector((state: any) => state.leave)
	const { rejectisLoading, rejectisSuccess } = useAppSelector((state: any) => state.leave)


	useEffect(() => {
		dispatch(viewTeamLeave(id));
	}, [dispatch, id])


	const handelupdate = () => {
		dispatch((hrApproveLeave(id)));
	}

	const handleReject = () => {
		dispatch((rejectLeave(id)));
	}



	const [count, setCount] = useState(0);
	const [inputs, setInputs] = useState({
		start_date: "",
		end_date: "",
		description: "",
		leave_type: ""
	})





	const title = "Successful";
	const html = "Leave Approve!";
	const html2 = "Leave have been Deleted!";
	const icon = "success";


	useEffect(() => {
		if (hrApproveisSuccess) {
			fireAlert(title, html, icon);
			navigate(-1)
			dispatch(reset());
		} else if (rejectisSuccess) {
			fireAlert(title, html2, icon);
			navigate(-1)
			dispatch(reset());
		}
	}, [dispatch, rejectisSuccess, html, navigate, hrApproveisSuccess])


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
				description: data?.description,
				leave_type: data?.type,

			});
		});
	}, [setInputs, data?.description, data?.type]);

	useEffect(() => {
		if (data?.hod_approved === true && !data?.hr_approved) {
			setCount(1)
		} else if (data?.hr_approved && data?.hod_approved && !data?.finally_approved) {
			setCount(2)
		} else if (data?.hr_approved === true && data?.hod_approved === true && data?.finally_approved === true) {
			setCount(3)
		} else {
			setCount(0)
		}
	}, [data?.finally_approved, data?.hod_approved, data?.hr_approved])





	return (
		<div>
			{isLoading ? (
				<div className="isLoading-container-view" >
					<BounceLoader
						color={"#990000"} loading={isLoading} />
				</div>
			) : !data || data === undefined ? (
				<div className="table-loader-announcement">
					<div>
						{/* eslint-disable-next-line jsx-a11y/alt-text */}
						<SlBriefcase size={80} />
						<p className="mt-3">No Leave details</p>
					</div>
				</div>
			) : (
				<div>
					<div className='contact-container-body'>
						<section className="contact-container">


							<div className="contact-form">
								<div className="heading">
									<h2>Leave Type : {data?.type}</h2>
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
								{data?.hr_approved === false &&
									<div className='deleteKPIHandler  mt-5'>
										<span className='deleteKPIHandler-mr'>
											<Button className="table-link" onClick={handleReject}>
												{rejectisLoading ? <Spinner animation="border" /> : "Reject"}</Button>
										</span>
										<span >
											<Button className="table-link-active" onClick={handelupdate} >
												{hrApproveisLoading ? <Spinner animation="border" /> : "Approve"}
											</Button>
										</span>
									</div>
								}
							</div>
							<div className="contact-info">
								<h3 className="heading">Leave Details</h3>
								<ul className="contacts">
									<li>
										<span className='BsFillBriefcaseFill'>
											<BsFillBriefcaseFill />
										</span>
										Leave Type : {data?.type}
									</li>
									<li>
										<span className='BsFillBriefcaseFill'>
											<BsCalendarDateFill />
										</span>
										State date : {moment(data?.start_date).format("DD-MM-YYYY")}
									</li>
									<li>
										<span className='BsFillBriefcaseFill'>
											<BsCalendarDate />
										</span>
										End date :  {moment(data?.end_date).format("DD-MM-YYYY")}
									</li>

									<span  >
										Leave Progress
									</span>
									<div className='leave-type-progress'>
										<li className="  rounded mb-3">
											<div className="progress mb-3"  >
												{/* @ts-ignore */}
												{data?.hod_approved === true && <div className="progress-bar bg-success" role="progressbar" style={{ width: "35% " }} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"> </div>}
												{/* @ts-ignore */}
												{data?.hr_approved === true && <div className="progress-bar bg-warning" role="progressbar" style={{ width: "30% " }} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"> </div>}
												{/* @ts-ignore */}
												{data?.finally_approved === true && <div className="progress-bar bg-danger" role="progressbar" style={{ width: "35% " }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"> </div>}

											</div>
											<div className="p-3">
												<div className="media">
													<div className="media-body align-self-center">
														<div className="small text-muted">{count + ' Aprovals'}</div>
													</div>
													<div className="align-self-center ml-3">
														{data?.hod_approved === true &&
															<img className="rounded-circle border mr-n2" src="https://www.gravatar.com/avatar?d=mp&s=40" alt='' />}
														{data?.hr_approved === true &&
															<img className="rounded-circle border mr-n2" src="https://www.gravatar.com/avatar?d=mp&s=40" alt='' />}
														{data?.finally_approved === true &&
															<img className="rounded-circle border" src="https://www.gravatar.com/avatar?d=mp&s=40" alt='' />}
													</div>
												</div>
											</div>
											<Button className={data?.status === "HOD approved" ? "table-link" :
												data?.status === "HR approved" ? "table-link-hr" :
													data?.status === "approved" ? "table-link-active" :
														data?.status === "rejected" ? "table-link-reject" : "table-link"}>
												{data?.status === "HOD approved" ? "HOD approved" :
													data?.status === "HR approved" ? "HR approved" :
														data?.status === "approved" ? "LEAVE approved" :
															data?.status === "rejected" ? "LEAVE Rejected" : "IN Progress"}</Button>
										</li>
									</div>
								</ul>
								<div className="social-links"></div>
							</div>
						</section>
					</div>
				</div>
			)}
		</div>
	)
}

export default HRUpdateLeave
