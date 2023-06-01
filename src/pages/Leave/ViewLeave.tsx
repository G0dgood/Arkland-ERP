import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core';
import { BsCalendarDate, BsCalendarDateFill, BsFillBriefcaseFill } from 'react-icons/bs';
import TableLoader from '../../components/TableLoader';
import moment from 'moment';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { reset, viewLeave, viewdeleteLeave } from '../../features/Leave/leaveSlice';
import { fireAlert } from '../../utils/Alert';
import { Spinner } from 'react-bootstrap';


const ViewLeave = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams()
	const navigate = useNavigate()

	const { viewdata: datas, viewisError, viewisLoading, viewmessage } = useAppSelector((state: any) => state.leave)
	const { viewdeleteisError, viewdeleteisLoading, viewdeletemessage, viewdeleteisSuccess } = useAppSelector((state: any) => state.leave)

	const data = datas[0]

	useEffect(() => {
		dispatch((viewLeave(id)));
	}, [dispatch, id]);

	useEffect(() => {
		if (viewisError) {
			fireAlert('leave', viewmessage, "error");
			dispatch(reset());
		} else if (viewdeleteisError) {
			fireAlert('leave', viewdeletemessage, "error");
			dispatch(reset());
		} else if (viewdeleteisSuccess) {
			fireAlert('leave', 'Leave Deleted Successfully', "success");
			navigate(-1)
			dispatch(reset());
		}
	}, [dispatch, id, viewdeleteisError, viewmessage, viewisError, viewdeletemessage, viewdeleteisSuccess, navigate])


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


			{viewisLoading ? <TableLoader isLoading={viewisLoading} /> : ""}
			<div className='contact-container-body'>
				<section className="contact-container">

					<form className="contact-form" onSubmit={handleSubmit}>
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
	)
}

export default ViewLeave