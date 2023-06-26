/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap';
import { MdOutlineClose } from 'react-icons/md';
import moment from 'moment';
import { fireAlert } from '../../utils/Alert';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { hrApproveEmployees, reset } from '../../features/Employee/employeeSlice';


const ApproveEmployeeModal = ({ id, data }: any) => {
	const dispatch = useAppDispatch();
	const { approveisLoading, approveisSuccess } = useAppSelector((state: any) => state.employee)
	const [deleteShow, setDeleteShow] = useState(false);


	useEffect(() => {
		if (approveisSuccess) {
			fireAlert("Successful", "Employee Approved Successfully!", "success");
			dispatch(reset())
		}
	}, [approveisLoading, approveisSuccess, dispatch])


	const handleApprove = () => {

		// @ts-ignore
		dispatch(hrApproveEmployees(id));

	}

	return (
		<div>
			<Button className="table-link" onClick={() => setDeleteShow(true)} >
				Approve
			</Button>
			<Modal
				size="lg"
				show={deleteShow}
				centered
			>
				<Modal.Header id="displayTermination">
					<span>{/*  */}</span>
					<span className="span-center-title">Approve Employee</span>
					<Button style={{ color: "#fff" }} onClick={() => setDeleteShow(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<div className="container emp-profile">
						<form method="post">
							<div className="row">
								<div className="col-md-4">
									<div className="profile-img">
										{/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" /> */}
										<div className="file btn btn-lg btn-primary">
											Change Photo
											<input type="file" name="file" />
										</div>
									</div>
								</div>
								<div className="col-md-6">
									<div className="profile-head">
										<h5>
											{data?.full_name}
										</h5>
										<h6>
											{/* onClick={Employee} */}
											<Button className="table-link"  >
												{data?.status}
											</Button>
										</h6>
										<h6>
											{data?.employment_type}
										</h6>
										<p className="proile-rating">Employment Duration : <span>{data?.employment_duration}</span></p>
										<ul className="nav nav-tabs" id="myTab" role="tablist">
											<li className="nav-item">
												<a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true"> </a>
											</li>
											<li className="nav-item">
												<a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Details</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-4">
									<div className="profile-work">
										<p>Category</p>
										<a  >{!data?.category ? "n/a" : data?.category}</a>
										<br />
										<p>Employment Date</p>
										<a  >{moment(data?.employment_date).format("DD-MM-YYYY")}</a>
									</div>
								</div>
								<div className="col-md-8">
									<div className=" " >
										<div className="tab-pane"  >
											<div className="row">
												<div className="col-md-6">
													<label>Name</label>
												</div>
												<div className="col-md-6">
													<p>{data?.first_name} {data?.last_name}</p>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<label>Email</label>
												</div>
												<div className="col-md-6">
													<p>{data?.personal_email}</p>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<label>Phone</label>
												</div>
												<div className="col-md-6">
													<p>{data?.phone}</p>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<label>Course Studied</label>
												</div>
												<div className="col-md-6">
													<p>{!data?.course_studied ? "n/a" : data?.course_studied}</p>
												</div>
											</div>
										</div>
										<div  >
											<div className="row">
												<div className="col-md-6">
													<label>Institution Attended</label>
												</div>
												<div className="col-md-6">
													<p>{!data?.institution_attended ? "n/a" : data?.institution_attended}</p>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<label>Disability</label>
												</div>
												<div className="col-md-6">
													<p>{!data?.disability ? "n/a" : data?.disability}</p>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<label>Gender</label>
												</div>
												<div className="col-md-6">
													<p>{data?.gender}</p>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<label>Institution Attended</label>
												</div>
												<div className="col-md-6">
													<p>{data?.institution_attended}</p>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<label>Marital Status</label>
												</div>
												<div className="col-md-6">
													<p>{data?.marital_status}</p>
												</div>
											</div>
											<div className="row">
												<div className="col-md-12">
													<label>State of origin</label><br />
													<p>{data?.state_of_origin}</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button className="table-link" onClick={handleApprove}>
						{approveisLoading ? <Spinner animation="border" /> : "Approve"}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default ApproveEmployeeModal
