/* eslint-disable jsx-a11y/anchor-is-valid */
import moment from 'moment';
import DataService from '../../utils/dataService';
import { FiUser } from "react-icons/fi";

const dataService = new DataService()
const Profile = () => {

	// @ts-ignore
	const userInfo: any = dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`)
	const { privileges } = userInfo






	return (
		<div>
			<div className="container-fluid px-6 py-4">
				<div className="row">
					<div className="col-xl-3 col-lg-4 col-md-12 col-12">
						<div className="fixed-sidebar">
							<div className="card white-bg">
								<div className="card-body">

									{/* <!-- Features --> */}
									<div className="card card-sm">
										<div className="card-header">
											<h4 className="card-header-title">
												Employee Contact Details
											</h4>
										</div>
										<div className="card-body">

											<ul className="list-group list-group-flush">
												<li className="list-group-item d-flex align-items-center justify-content-between px-0">
													<small>Email Address</small> <small>122334567</small><i className="fe fe-check-circle text-success"></i>
												</li>
												<li className="list-group-item d-flex align-items-center justify-content-between px-0">
													<small>Phone Number</small> <small>rob.lwoe;qdwd</small><i className="fe fe-check-circle text-success"></i>
												</li>
											</ul>
										</div>
									</div>

									<div className="card card-sm">
										<div className="card-body card-sm row align-items-center">
											<div className="col">

												{/* <!-- Title --> */}
												<h6 className="text-uppercase text-muted mb-2">
													Budget
												</h6>

												{/* <!-- Heading --> */}
												<span className="h2 mb-0">
													$24,500
												</span>

												{/* <!-- Badge --> */}
												<span className="badge bg-success-soft mt-n1">
													+3.5%
												</span>

											</div>
											<div className="col-auto">

												{/* <!-- Icon --> */}
												<span className="h2 fe fe-dollar-sign text-muted mb-0"></span>

											</div>
										</div>
									</div>

									<div className="card card-sm">
										<div className="card-body">
											<p className="semi-bold">Reporting Chain</p>
											<div className="curved-card mb20">
												<span className="no-data">No Reporting Manager</span>
											</div>
											<div className="text-center">
												<div className="size-12 semi-bold">Robert Low</div>
												{/* <!----> */}
											</div>
											<div className="to-arrow"><i className="icon-front"></i></div>
											<a href="/employees/org_chart/25000055622" id="ember939" className="curved-card in-gray-bg btn-link ember-view"> <i className="vertical-align-middle size-16 icon-org-chart text-muted"></i>
												<span className="pl10">2 Direct Reports</span>
											</a>
										</div>
									</div>

								</div>
							</div>

						</div>

					</div>
					<div className="col-xl-9 col-lg-8 col-md-12 col-12">
						<div className="card">
							<div className="card-body">
								<div className="header">

									{/* <!-- Image --> */}
									{/* <!--<img src="../../assets/img/covers/profile-cover-1.jpg" className="header-img-top" alt="...">--> */}
									<div className="bg-gray py-7"></div>

									{/* <!-- Body --> */}
									<div className="">
										<div className="header-body mt-n5 mt-md-n6">
											<div className="row align-items-end">
												<div className="col-auto">

													{/* <!-- Avatar --> */}
													<div className="avatar avatar-xxl header-avatar-top">
														<img src="https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg" alt="..." className="avatar-img rounded-circle border border-4 border-card" />
													</div>

												</div>
												<div className="col mb-3 ms-n3 ms-md-n2">

													{/* <!-- Pretitle --> */}
													<h6 className="header-pretitle">
														Employee
													</h6>

													{/* <!-- Title --> */}
													<h1 className="header-title">
														Dianna Smiley
													</h1>

													<h5 className="mt-3 text-muted">
														<span className="fw-bold">Department: </span>Technical
														<span className="vertical-divider"> | </span>
														<span className="fw-bold">Designation: </span>Quality Manager
													</h5>

												</div>
												<div className="col-12 col-md-auto mt-2 mt-md-0 mb-md-3">

													{/* <!-- Button --> */}
													<a href="#!" className="btn btn-primary d-none d-block d-md-inline-block">
														Subscribe
													</a>

												</div>
											</div>
											<div className="row align-items-center">
												<div className="col">

													{/* <!-- Nav --> */}
													<ul className="nav nav-tabs nav-overflow header-tabs">
														<li className="nav-item">
															<a href="profile-posts.html" className="nav-link">
																Overview
															</a>
														</li>
														<li className="nav-item">
															<a href="profile-groups.html" className="nav-link active">
																Personal
															</a>
														</li>
														<li className="nav-item">
															<a href="profile-projects.html" className="nav-link">
																Employment
															</a>
														</li>
														<li className="nav-item">
															<a href="profile-files.html" className="nav-link">
																Training
															</a>
														</li>
														<li className="nav-item">
															<a href="profile-subscribers.html" className="nav-link">
																Files
															</a>
														</li>
													</ul>

												</div>
											</div>
										</div>
									</div>
								</div>

								{/* <!-- content --> */}
								<div className="py-2">
									{/* <!-- row --> */}
									<div className="row">
										<div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-6">
											{/* <!-- card --> */}
											<div className="card-inner col-12">
												<div className="card-inner-header">
													<span className="card-inner-title vertical-align-middle">Work Information</span>
												</div>
												<div className="card-inner-body emp-fields-wrap multi-column-form-groups row">
													{/* <div className="emp-field col-6">
														<div className="text-muted">
															<div className="vertical-align">Employee Id</div>
														</div>
														<div data-test-id="employee_id" id="ember1180" className="semi-bold card-group-body-entry form-group "> E001
														</div>
													</div>
													<div className="emp-field col-6">
														<div className="text-muted">
															<div className="vertical-align">Employee Status</div>
														</div>
														<div data-test-id="status" id="ember1181" className="semi-bold ember-view"><span></span>
															<div id="ember1182" className="form-group dirty required ember-view"> Active
															</div>
														</div>
													</div>
													<div className="emp-field col-6">
														<div className="text-muted">
															<div className="vertical-align">Date Of Joining</div>
														</div>
														<div data-test-id="joining_date" id="ember1183" className="semi-bold form-group input-date dirty ember-view"> Oct-21-2021
														</div>
													</div>
													<div className="emp-field col-6">
														<div className="text-muted">
															<div className="vertical-align">Employee Type</div>
														</div>
														<div data-test-id="user_type" id="ember1184" className="semi-bold ember-view"><span></span>
															<div id="ember1185" className="form-group dirty required ember-view"> Full Time
															</div>
														</div>
													</div>
													<div className="emp-field col-6">
														<div className="text-muted">
															<div className="vertical-align">Department</div>
														</div>
														<div data-test-id="job_role_id" id="ember1186" className="semi-bold ember-view"><span></span>
															<div id="ember1187" className="form-group dirty required ember-view"> Administration
															</div>
														</div>
													</div>
													<div className="emp-field col-6">
														<div className="text-muted">
															<div className="vertical-align">Designation or Title</div>
														</div>
														<div data-test-id="designation" id="ember1188" className="semi-bold form-group required ember-view"> -
														</div>
													</div>
													<div className="emp-field col-6">
														<div className="text-muted">
															<div className="vertical-align">Business Unit</div>
														</div>
														<div data-test-id="department_id" id="ember1189" className="semi-bold ember-view"><span></span>
															<div id="ember1190" className="card-group-body-entry form-group "> -
															</div>
														</div>
													</div>
													<div className="emp-field col-6">
														<div className="text-muted">
															<div className="vertical-align">Office Location</div>
														</div>
														<div data-test-id="branch_id" id="ember1191" className="semi-bold ember-view"><span></span>
															<div id="ember1192" className="form-group dirty required ember-view"> Default - Head office
															</div>
														</div>
													</div>
													<div className="emp-field col-6">
														<div className="text-muted">
															<div className="vertical-align">Sub Department</div>
														</div>
														<div data-test-id="sub_department_id" id="ember1193" className="semi-bold ember-view"><span></span>
															<div id="ember1194" className="card-group-body-entry form-group "> -
															</div>
														</div>
													</div>
													<div className="emp-field col-6">
														<div className="text-muted">
															<div className="vertical-align">Primary Team</div>
														</div>
														<div data-test-id="team_id" id="ember1195" className="semi-bold ember-view"><span></span>
															<div id="ember1196" className="form-group dirty required ember-view"> Business
															</div>
														</div>
													</div>
													<div className="emp-field col-6">
														<div className="text-muted">
															<div className="vertical-align">Additional Teams</div>
														</div>
														<div data-test-id="user_teams" id="ember1197" className="semi-bold ember-view"><span></span>
															<div id="ember1198" className="card-group-body-entry form-group "> -
															</div>
														</div>
													</div>
													<div className="emp-field col-6">
														<div className="text-muted">
															<div className="vertical-align">Level</div>
														</div>
														<div data-test-id="level_id" id="ember1199" className="semi-bold ember-view"><span></span>
															<div id="ember1200" className="card-group-body-entry form-group "> -
															</div>
														</div>
													</div> */}
													{/* <div className="emp-field col-6">
														<div className="text-muted">
															<div className="vertical-align">Cost Center</div>
														</div>
														<div data-test-id="cost_center_id" id="ember1201" className="semi-bold ember-view"><span></span>
															<div id="ember1202" className="card-group-body-entry form-group "> -
															</div>
														</div>
													</div> */}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>


		</div>
		// <div className='main-profile'>
		// 	<div id='profile-details'>
		// 		<div className='employee-passport'>
		// 			<FiUser size={80} />
		// 		</div>
		// 		<div className='employee-details'>
		// 			<h5>{userInfo?.employee?.full_name}</h5>
		// 			<h6>{userInfo?.employee?.email}</h6>

		// 		</div>
		// 		<div className='profile-edit'>
		// 		</div>
		// 	</div>

		// 	<div id='Employee-info'>
		// 		<div className='all-info'>
		// 			<div className='information1'>
		// 				<div className='Personal-Information'>
		// 					<h6>Personal Information</h6>
		// 					<p><span className='title'>Full Name: </span>{userInfo?.employee?.full_name}</p>
		// 					<p><span className='title'>Email Address: </span>{userInfo?.employee?.email}</p>
		// 					<p><span className='title'>Adress: </span>{userInfo?.employee?.address}</p>
		// 					<p><span className='title'>Date Of Birth: </span>{moment(userInfo?.date_of_birth).format("DD-MM-YYYY")}</p>
		// 					<p><span className='title'>City: </span>{userInfo?.employee?.city}</p>
		// 				</div>

		// 				<div className='Profile-Information'>
		// 					<h6>Profile Information</h6>
		// 					<p><span className='title'>Employee ID: </span><span className="id">als-{userInfo?.employee?.employee_id}</span></p>
		// 					<p><span className='title'>Gender: </span>{userInfo?.employee?.gender}</p>
		// 					<p><span className='title'>Contact Number: </span>{userInfo?.employee?.phone}</p>
		// 					<p><span className='title'>Role: </span>{userInfo?.role?.name}</p>
		// 					<p><span className='title'>Department: </span>{userInfo?.department?.name}</p>
		// 				</div>
		// 			</div>
		// 		</div>

		// 		<div className='information2'>
		// 			<div className='Education-information'>
		// 				<h6>Privileges</h6>
		// 				{privileges?.map((item: any, i: any) => (
		// 					<p key={i}><span className='title'>Role: </span>{item?.role}</p>
		// 				))}
		// 			</div>

		// 			<div className="Next-of-kin">
		// 				<h6>OThers</h6>
		// 				<p><span className='title'>Date of Joining: </span>{moment(userInfo?.employee?.employment_date).format("DD-MM-YYYY")}</p>
		// 				<p><span className='title'>Address: </span>{userInfo?.employee?.address}</p>
		// 				<p><span className='title'>Email Address: </span>{userInfo?.employee?.email}</p>
		// 				<p><span className='title'>Institution_Attended: </span>{userInfo?.employee?.institution_attended} </p>
		// 				<p><span className='title'>Qualification: </span> {userInfo?.employee?.qualification}</p>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
	)
}

export default Profile
