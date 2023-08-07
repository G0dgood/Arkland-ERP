import { useEffect, useState } from 'react'
import { Button } from '@material-ui/core';
import { BsCalendarDate, BsCalendarDateFill, BsCheckCircleFill, BsFillBriefcaseFill, BsPatchCheckFill } from 'react-icons/bs';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { reset, viewLeave, viewdeleteLeave } from '../../features/Leave/leaveSlice';
import { fireAlert } from '../../utils/Alert';
import { Spinner } from 'react-bootstrap';

import { SlBriefcase } from 'react-icons/sl';
import { SVGLoader } from '../../components/SVGLoader';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { ImArrowRight2 } from 'react-icons/im';
import { FaUserCircle } from 'react-icons/fa';


const ViewLeave = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams()
	const navigate = useNavigate()

	const { viewdata: datas, viewisLoading, viewmessage } = useAppSelector((state: any) => state.leave)
	const { viewdeleteisLoading, viewdeleteisSuccess } = useAppSelector((state: any) => state.leave)
	const data = datas

	useEffect(() => {
		dispatch(viewLeave(id));
	}, [dispatch, id]);

	useEffect(() => {
		if (viewdeleteisSuccess) {
			fireAlert('leave', 'Leave Deleted Successfully', "success");
			dispatch(reset());
			navigate(-1)
		}
	}, [dispatch, id, viewmessage, viewdeleteisSuccess, navigate])


	const [count, setCount] = useState(0);
	const [inputs, setInputs] = useState({
		start_date: "",
		end_date: "",
		description: "",
		leave_type: ""
	})





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

	const handleSubmit = (e: any) => {
		e.preventDefault();
		dispatch(viewdeleteLeave(id));
	}

	return (
		<div>
			{viewisLoading ? (
				<div className="isLoading-container-view  " >
					<SVGLoader width={"60px"} height={"60px"} />
				</div>
			) : !data || data === undefined ? (
				<div className="table-loader-announcement ">
					<div>
						<SlBriefcase size={80} />
						<p className="mt-3">No Leave Application</p>
					</div>
				</div>
			) : (
				<div className='leave-con'>
					<h4>
						Review Request
					</h4>
					<div className='leave-appli-title'>
						<div className='leave-appli-title-span'>
							<span  ><FaUserCircle size={"50px"} color='#f0dada' /></span>
						</div>
						<div className='leave-appli-title-name'>
							{/* <h5>Okoro Godwin Chinedu</h5>
							<p>Softworks</p> */}
						</div>
						<div className='leave-appli-board'>
							<div>
								<div>Head of Depertment</div>
								<p>
									<div className={
										data?.hod_approved === true
											? "status   is-green " :
											data?.status === "rejected"
												? "status is-red  " :
												"status  is-pending" && "status is-wait  "}>
										{data?.hod_approved === true ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
											<path d="M20 6L9 17l-5-5" />
										</svg>
											: data?.status === "rejected" ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
												<path d="M18 6L6 18M6 6l12 12" />
											</svg>
												: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-loader">
													<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
												</svg>}
										{data?.hod_approved === true ? "HOD Approved" :
											"IN Progress"}
									</div>
								</p>
							</div>
							<div>
								<div>Human Resource</div>
								<p>
									<div className={
										data?.hr_approved === true
											? "status is-green   "
											: data?.status === "rejected"
												? "status is-red  " :
												"status  is-pending" && "status is-wait  "}>
										{data?.hr_approved === true
											? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
												<path d="M20 6L9 17l-5-5" />
											</svg>
											: data?.status === "rejected" ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
												<path d="M18 6L6 18M6 6l12 12" />
											</svg>
												: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-loader">
													<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
												</svg>}
										{data?.hr_approved === true ? "HR Approved" :
											data?.status === "rejected" ? "Leave Rejected" :
												"IN Progress"}
									</div>
								</p>
							</div>
							<div>
								<div>Admin</div>
								<p>
									<div className={
										data?.status === "approved"
											? "status is-green   " :
											data?.status === "rejected"
												? "status is-red  " :
												"status  is-pending" && "status is-wait  "}>
										{data?.status === "approved" ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
											<path d="M20 6L9 17l-5-5" />
										</svg>
											: data?.status === "rejected" ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
												<path d="M18 6L6 18M6 6l12 12" />
											</svg>
												: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-loader">
													<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
												</svg>}
										{
											data?.status === "approved" ? "Leave Approved" :
												data?.status === "rejected" ? "Leave Rejected" :
													"IN Progress"}
									</div>
								</p>
							</div>
						</div>
					</div>
					<div className='leave-details-view'>
						<div className='leave-details-view-one'>
							<div className='leave-details-status'>
								<div><h5>Leave Type : {data?.type}</h5></div>
								<div className='pending-incon-status'>
									<span className='pending-incon-status-styles'><BsCheckCircleFill /></span>
									<span>{count === 3 ? "complete" : "pending"}</span>
								</div>
							</div>
							<div className='leave-date-con-style'>
								<div className='leave-date-con-style-card'>
									<div className='leave-date-con-style-status'>
										<p>{moment(data?.start_date).format('dddd')}</p>
										<div className='leave-date-con-style-status-sup'>
											<span>
												{moment(data?.start_date).format('MMMM Do')}
											</span>
											<span> {moment(data?.start_date).format('YYYY ')}</span>
										</div>
									</div>
									<div><ImArrowRight2 size={"20px"} /></div>
									<div className='leave-date-con-style-status'>
										<p>{moment(data?.end_date).format('dddd')}</p>
										<div className='leave-date-con-style-status-sup'> <span>
											{moment(data?.end_date).format('MMMM Do')}</span>
											<span>{moment(data?.end_date).format('YYYY')}</span>
										</div>
									</div>
								</div>

								<div>
									<div className='propose-change-weeks'>4 Week Days Requested</div>
									<div className='propose-change'>
										<span>
											<MdOutlineModeEditOutline size={"15px"} /></span> <p>Propose Change</p></div> </div>
							</div>

							{/* note preview */}
							<div className='note-preview'>
								<p>
									{data?.description}
								</p>
							</div>

							<div className='leave-detailed-reason'>
								<h6>Note to Management</h6>
								<textarea rows={3} className='Modal-textarea' placeholder='Enter detailed reason for leave'
									value={inputs.description}
									onChange={(e) => handleOnChange("description", e.target.value)} />
							</div>

							<div>
								{data?.finally_approved === false &&
									<div className='deleteKPIHandler  mt-5'>
										{/* <span className='deleteKPIHandler-mr'>
											<Button className="table-link-off-active" >
												{false ? <Spinner animation="border" /> : "Reject Request"}</Button>
										</span> */}
										<span >
											{/* <Button className="table-link-btn-new"  >
												{false ? <Spinner animation="border" /> : "Approve Request"}
													</Button> */}
											<Button variant="contained"
												onClick={handleSubmit}
												disabled={viewdeleteisLoading}
												className="table-link-btn-new"
												type="submit">{viewdeleteisLoading ?
													<Spinner animation="border" /> : 'Delete Leave'}
											</Button>

										</span>
										{/* <span >
											<Button className="table-link-btn-new"  >
												{false ? <Spinner animation="border" /> : "Approve Request"}
											</Button></span> */}
									</div>
								}
							</div>
						</div>
						{/* onClick={handleReject} */}
						{/* onClick={handelupdate} */}
						<div className='leave-details-view-two'>
							<h6 className='History-styles'> History</h6>
							<div>
								<div className='History-styles-details'>
									<span className='History-styles-star'><BsPatchCheckFill color='#AC1B1B' /></span>
									<div>
										<p className='request_submitted-style'>Request Submitted</p>
										<p className='request_submitted-style-two'>{moment(data?.start_date).format('MMMM Do YYYY')} </p>
										{/* <p>okoro godwin chinedu</p> */}
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* <div className='contact-container-body'>
						<section className="contact-container">

							<form className="contact-form" onSubmit={handleSubmit}>
								<div className="heading">
									<h2>Leave Type : {data?.type}</h2>
									<p>Fill in information to update your Leave!</p>
								</div>
								<div>
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
									<div className='Modal-data-time pt-3'>
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
										<textarea rows={3} className='Modal-textarea' placeholder='Enter detailed reason for leave'
											value={inputs.description}
											onChange={(e) => handleOnChange("description", e.target.value)} />
									</div>
								</div>
								<Button variant="contained"
									disabled={viewdeleteisLoading}
									className="Add-btn-modal" type="submit">{viewdeleteisLoading ? <Spinner animation="border" /> : 'Delete Leave'} </Button>

							</form>
							<div className="contact-info">
								<h3 className="heading">Leave Details</h3>
								<ul className="contacts">
									<li>
										<span className='BsFillBriefcaseFill'><BsFillBriefcaseFill /></span>
										Leave Type : {data?.type}
									</li>
									<li>
										<span className='BsFillBriefcaseFill'><BsCalendarDateFill /></span>
										State date : {moment(data?.start_date).format("DD-MM-YYYY")}
									</li>
									<li>
										<span className='BsFillBriefcaseFill'><BsCalendarDate /></span>
										End date :  {moment(data?.end_date).format("DD-MM-YYYY")}
									</li> */}

					{/* <span  >
										Leave Progress
									</span>
									<div className='leave-type-progress'>
										<li className="  rounded mb-3">
											<div className="progress mb-3"  > */}


					{/* </div>
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
					</div> */}
				</div>
			)}
		</div >
	)
}

export default ViewLeave