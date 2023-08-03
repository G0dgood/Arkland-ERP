/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap';
import { MdOutlineClose } from 'react-icons/md';
import moment from 'moment';
import { fireAlert } from '../../utils/Alert';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { hrApproveEmployees, reset } from '../../features/Employee/employeeSlice';
import { BiUser } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';


const ApproveEmployeeModal = ({ id, data }: any) => {
	const dispatch = useAppDispatch();
	const { approveisLoading, approveisSuccess } = useAppSelector((state: any) => state.employee)
	const [deleteShow, setDeleteShow] = useState(false);
	const navigate = useNavigate();

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
			<Button className={data?.status === "in review" ? "table-link" : "table-link-active"} onClick={() => setDeleteShow(true)} >
				{data?.status === "in review" ? data?.status : "Approved"}
			</Button>
			<Modal
				size="lg"
				show={deleteShow}
				centered
			>
				<Modal.Header id="displayTermination">
					<span className="span-center-title">
						{data?.status === "in review" ? "Approve Employee" : "Employee Preview"}</span>
					<Button onClick={() => setDeleteShow(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<div className="  ">
						<form method="post">
							<div className="row">
								<div className="col-md-4">
									<div className="profile-img">
										<BiUser size={80} />
										{/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" /> */}
										{/* <div className="file btn btn-lg btn-primary">
											Change Photo
											<input type="file" name="file" />
										</div> */}
									</div>
								</div>
								<div className="col-md-6">
									<div className="profile-head">
										<h5>
											{data?.full_name}
										</h5>
										<h6>
											{data?.status === "in review" ?
												<Button className="table-link"  >
													{data?.status}
												</Button> :
												<Button className="table-link-active"  >
													{data?.status}
												</Button>}

										</h6>
										<h6>
											{/* <capitalizeFirstLetters str={data?.employment_type} /> */}
											{data?.employment_type}
										</h6>
										<p className="proile-rating">Employment Duration : <span>{data?.employment_duration}</span></p>
										<ul className="nav nav-tabs" id="myTab" role="tablist">

											<li className="nav-item">
												<a id="profile-tab "> <h5>Details</h5> </a>
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
											<div className="row m-b-1">
												<div className="col-md-6">
													<label>Marital Status</label>
												</div>
												<div className="col-md-6">
													<p>{data?.marital_status}</p>
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<label>State of origin</label>
												</div>
												<div className="col-md-6">
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
					{data?.status === "in review" ?
						<Button className="table-link" onClick={handleApprove}>
							{approveisLoading ? <Spinner animation="border" /> : "Approve"}
						</Button> :
						<Button className="table-link-active" onClick={() => navigate(`/employees/employees/${data?.id}`)} >
							View More
						</Button>}
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default ApproveEmployeeModal
