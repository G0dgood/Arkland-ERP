import { useEffect, useState } from 'react'
import { BsCheckCircleFill, BsPatchCheckFill } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@material-ui/core';
import moment from 'moment'
import { Spinner } from 'react-bootstrap'
import { fireAlert } from '../../utils/Alert'
import { finalApproveLeave, rejectLeave, reset, viewTeamLeave } from '../../features/Leave/leaveSlice'
import { useAppDispatch, useAppSelector } from '../../store/useStore'
import { SlBriefcase } from 'react-icons/sl';
import { SVGLoader } from '../../components/SVGLoader';
import { ImArrowRight2 } from 'react-icons/im';
import { capitalizeFirstLetters } from '../../components/CapitalizeFirstLetters';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';




const FinalLeaveUpdate = () => {
	const { teamviewdata: data, teamviewisLoading: viewisLoading } = useAppSelector((state: any) => state.leave)
	const { finalApproveisSuccess, finalApproveisLoading } = useAppSelector((state: any) => state.leave)
	const { rejectisLoading, rejectisSuccess } = useAppSelector((state: any) => state.leave)
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { id } = useParams()

	useEffect(() => {
		dispatch(viewTeamLeave(id));
	}, [dispatch, id])




	const [count, setCount] = useState(0);
	const [inputs, setInputs] = useState({
		start_date: "",
		end_date: "",
		description: "",
		leave_type: ""
	})


	const handelupdate = () => {
		dispatch((finalApproveLeave(id)));
	}

	const title = "Successful";
	const html = "Leave Approved!";
	const icon = "success";




	useEffect(() => {
		if (finalApproveisSuccess) {
			fireAlert(title, html, icon);
			navigate(-1)
			dispatch(reset());
		} else if (rejectisSuccess) {
			fireAlert(title, "Leave Rejected!", icon);
			navigate(-1)
			dispatch(reset());
		}
	}, [dispatch, finalApproveisSuccess, html, navigate, rejectisSuccess])

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
		// @ts-ignore 
	}, [data?.finally_approved, data?.hod_approved, data?.hr_approved])


	const handleReject = () => {
		dispatch(rejectLeave(id));
	}



	return (
		<div>
			{viewisLoading ? (
				<div className="isLoading-container-view" >
					<SVGLoader width={"60px"} height={"60px"} />
				</div>
			) : !data || data === undefined ? (
				<div className="table-loader-announcement">
					<div>
						{/* eslint-disable-next-line jsx-a11y/alt-text */}
						<SlBriefcase size={80} />
						<p className="mt-3">No Tead Lead details</p>
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
							<h5>{data?.employee?.full_name}</h5>
							{/* <p>Softworks</p> */}
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
								<div><h5>Leave Type : {capitalizeFirstLetters(data?.type)} </h5></div>
								<div className='pending-incon-status'>
									<span className='pending-incon-status-styles'>
										<BsCheckCircleFill />
									</span>
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
								<span >
									{data?.hr_approved === false &&
										<div className='deleteKPIHandler  mt-5'>
											<span className='deleteKPIHandler-mr'>
												<Button className="table-link-off-active" onClick={handleReject}>
													{rejectisLoading ? <Spinner animation="border" size='sm' /> : "Reject"}</Button>
											</span>
											<span >
												<Button className="table-link-btn-new" onClick={handelupdate} >
													{finalApproveisLoading ? <Spinner animation="border" /> : "Approve"}
												</Button>

												{/* <Button className="table-link-btn-new"  >
												{false ? <Spinner animation="border" /> : "Approve Request"}
													</Button> */}
												{/* <Button variant="contained"
												  onClick={handleSubmit}
											  disabled={viewdeleteisLoading}
													className="table-link-btn-new"
													type="submit">{false ?
														<Spinner animation="border" /> : 'Delete Leave'}
												</Button> */}
											</span>
										</div>
									}
								</span>
								{/* <span >
											<Button className="table-link-btn-new"  >
												{false ? <Spinner animation="border" /> : "Approve Request"}
											</Button>
											</span> */}
							</div>
						</div>
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

				</div>

			)}
		</div>
	)
}

export default FinalLeaveUpdate
