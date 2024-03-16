import { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { Helmet } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "../../../store/useStore";
import { getEmployeePayrollDetails } from "../../../features/PayRoll/payrollSlice";
import { HiArrowSmRight } from "react-icons/hi";
import { HiArrowSmDown } from "react-icons/hi";



const PayRollEmployeeView = () => {
	// Access passed data from location.state
	const { paydata } = window?.history?.state?.usr || {};


	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [sectionStates, setSectionStates] = useState([true, true, true, true]);

	const toggleSection = (index: number) => {
		const newStates = sectionStates.map((state, i) => (i === index ? !state : state));
		setSectionStates(newStates);
	};



	return (
		<>
			<Helmet>
				<title>PayRoll Employee View | Arkland ERP</title>
			</Helmet>

			<div>
				<div className='roll-title mb-3'>
					<h5 className="page-title">Review Employee Details</h5>
					<div className='roll-icon' onClick={() => navigate(-1)}>
						<IoArrowBackSharp size={22} />
					</div>
				</div>

				<div className="employee-main-div-col">
					<div className="pay-DetailsOpen mt-4">
						<div>
							<span style={{ cursor: "pointer", fontWeight: "bold" }} onClick={() => toggleSection(0)}>
								Employee Essential Details
							</span>
						</div>
						<div>
							{sectionStates[0] ? <span className="icon-toggel" onClick={() => toggleSection(0)}><HiArrowSmDown /></span> : <span className="icon-toggel" onClick={() => toggleSection(0)}><HiArrowSmRight /></span>}
						</div>
					</div>

					{sectionStates[0] && (
						<div
							className="viewprofile-container"
							style={{ marginTop: "2rem" }}
						>
							<div>
								<div className="getjob-application-details">
									<p>Full Name</p>
									<p>{paydata?.full_name}</p>
									<p>Email</p>
									<p>{paydata?.personal_email}</p>
									<p>Phone</p>
									<p>{paydata?.phone} </p>
									<p>Date of Birth (DD-MM-YYYY)</p>
									<p>
										{moment("employee?.date_of_birth").format("DD-MM-YYYY")}
									</p>
									<p>Age</p>
									<p>
										{ }
										{
											moment("employee?.date_of_birth").fromNow().split(" ")[0]
										}{ }
										years old
									</p>
									<p>Gender</p>
									<p> {paydata?.gender}</p>
									<p>Marital Status</p>
									<p> {paydata?.marital_status}</p>
									<p>Country</p>
									<p>{paydata?.country}</p>
									<p>State</p>
									<p> {paydata?.state_of_origin} </p>
									<p>Address</p>
									<p>{paydata?.address}</p>
									<p>City</p>
									<p>{paydata?.city}</p>
								</div>
							</div>
							<div>
								<div className="getjob-application-details">
									<p>Expatriate</p>
									<p>
										{paydata?.is_expatriate ? "Yes" : "No"}
									</p>
									{paydata?.is_expatriate ? (
										<>
											<>
												<p>Passport Number</p>
												<p>{paydata?.passport_number}</p>
											</>
											<>
												<p>Visa Type</p>
												<p>{paydata?.visa_type}</p>
											</>
											<>
												<p>Visa Duration</p>
												<p>{paydata?.visa_duration} months </p>
											</>
										</>
									) : (
										<>
											<p>NIN</p>
											<p>{paydata?.nin}</p>
										</>
									)}

									<p>Instiution attended</p>
									<p>{paydata?.institution_attended}</p>
									<p>Course studied</p>
									<p>{paydata?.course_studied}</p>
									<p>Qualification</p>
									<p>{paydata?.qualification}</p>
								</div>
							</div>
						</div>
					)}
					<div className="pay-DetailsOpen mt-4">
						<div>
							<span style={{ cursor: "pointer", fontWeight: "bold" }} onClick={() => toggleSection(1)}>
								Employee Financial Details
							</span>
						</div>
						<div>
							{sectionStates[1] ? <span className="icon-toggel" onClick={() => toggleSection(1)}><HiArrowSmDown /></span> : <span className="icon-toggel" onClick={() => toggleSection(1)}><HiArrowSmRight /></span>}
						</div>
					</div>
					{sectionStates[1] && (
						<div
							className="viewprofile-container"
							style={{ marginTop: "2rem" }}
						>
							<div>
								<div className="getjob-application-details">
									<p>Bank Nameeeeeee</p>
									<p>{paydata?.bank_name}</p>
									<p>Bank Account Number</p>
									<p>{paydata?.bank_account_number}</p>
									<p>Bank Account Name</p>
									<p>{paydata?.bank_account_name} </p>
									<p>Gross Salary</p>
									<p>₦ {paydata?.basic_salary}</p>
									<p>Meal Allowance</p>
									<p>₦ {paydata?.meal_allowance}</p>
								</div>
							</div>
							<div>
								<div className="getjob-application-details">
									<p>Basic Salary</p>
									<p>₦ {paydata?.basic_salary}</p>
									<p> Medical Allowance</p>
									<p> ₦ {paydata?.medical_allowance}</p>
									<p> Housing Allowance</p>
									<p>₦ {paydata?.housing_allowance}</p>
									<p> Transportation Allowance</p>
									<p>₦ {paydata?.transportation_allowance} </p>
									<p> Utility Allowance</p>
									<p>₦ {paydata?.utility_allowance}</p>
								</div>
							</div>
						</div>
					)}
					<div className="pay-DetailsOpen mt-4">
						<div>
							<span style={{ cursor: "pointer", fontWeight: "bold" }} onClick={() => toggleSection(2)}>
								Employee References
							</span>
						</div>
						<div>
							{sectionStates[2] ? <span className="icon-toggel" onClick={() => toggleSection(2)}><HiArrowSmDown /></span> : <span className="icon-toggel" onClick={() => toggleSection(2)}><HiArrowSmRight /></span>}
						</div>
					</div>

					{sectionStates[2] && (
						<div className="viewprofile-container" style={{ marginTop: "2rem" }} >
							<div>
								<div className="getjob-application-details">
									<p>Next of Kin</p>
									<p>{paydata?.next_of_kin}</p>
									<p>Next of Kin Phone Number</p>
									<p>{paydata?.next_of_kin_phone}</p>
									<p>Next of Kin Email</p>
									<p>{paydata?.next_of_kin_email} </p>
									<p> Next of Kin Address</p>
									<p> ₦ {paydata?.next_of_kin_address}</p>
								</div>
							</div>
							<div>
								<div className="getjob-application-details">
									<p>Referee Name</p>
									<p>{paydata?.referee_name}</p>
									<p>Referee Phone Number</p>
									<p>{paydata?.referee_phone}</p>
									<p>Emergency Contact Name</p>
									<p>{paydata?.emergency_contact_name} </p>
									<p>Emergency Contact Phone</p>
									<p>{paydata?.emergency_contact_phone}</p>
								</div>
							</div>
						</div>
					)}


					<div className="pay-DetailsOpen mt-4">
						<div>
							<span style={{ cursor: "pointer", fontWeight: "bold" }} onClick={() => toggleSection(3)}>
								Details of employment
							</span>
						</div>
						<div>
							{sectionStates[3] ? <span className="icon-toggel" onClick={() => toggleSection(3)}><HiArrowSmDown /></span> : <span className="icon-toggel" onClick={() => toggleSection(3)}><HiArrowSmRight /></span>}
						</div>
					</div>
					{sectionStates[3] && (
						<div className="viewprofile-container" style={{ marginTop: "2rem" }} >
							<div>
								<div className="getjob-application-details">
									<p>Department</p>
									<p>{paydata?.department?.name}</p>
									<p>Role</p>
									<p>{paydata?.role?.name}</p>
									<p>Work Location Objection</p>
									<p> {paydata.has_work_location_objection ? "Yes" : "No"} </p>
									<p>Tally Number</p>
									<p>{paydata?.tally_number}</p>
								</div>
							</div>
							<div>
								<div className="getjob-application-details">
									<p>Employment ID</p>
									<p>{paydata?.employee_id} </p>
									<p>Employment Type</p>
									<p>{paydata?.employment_type}</p>
									<p>Employment Date (DD-MM-YYYY)</p>
									<p>{moment(paydata?.employment_date).format("DD-MM-YYYY")}</p>
									<p>Employment Duration (Months)</p>
									<p>{paydata?.employment_duration}</p>
								</div>
							</div>
						</div>
					)}
					<div className="mt-4" style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px", }}>
						<button id='view-status' >Create</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default PayRollEmployeeView;
