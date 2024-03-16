import { useEffect, useState } from 'react'
import { IoArrowBackSharp } from 'react-icons/io5'
import profile from '../../../assets/images/Ellipse6.png'
import { Accordion } from 'react-bootstrap'
import { InputField2 } from '../../../components/TableOptions'
import { useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAppDispatch, useAppSelector } from '../../../store/useStore'
import { getEmployeePayrollDetails } from '../../../features/PayRoll/payrollSlice'


const EmployeePayrollView = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();



	const [activeKey, setActiveKey] = useState<any>(null);

	const handleAccordionClick = (eventKey: any) => {
		if (activeKey === eventKey) {
			setActiveKey(null);
		} else {
			setActiveKey(eventKey);
		}
	};

	const { viewdata, viewisLoading, viewisError, viewmessage }: any = useAppSelector((state: any) => state.payroll)


	console.log('viewdata', viewdata)

	const [input, setInput] = useState({
		first_name: "",
		last_name: "",
		middle_name: "",
		mothers_maiden_name: "",
		email: "",
		personal_email: "",
		gender: "",
		phone: "",
		date_of_birth: "",
		marital_status: "",
		has_disability: false,
		disability: "",
		nin: "",

		religion: "",
		institution_attended: "",
		course_studied: "",
		qualification: "",

		address: "",
		city: "",
		state_of_origin: "",
		country: "",
		lga: "",
		state_of_residence: "",
		street: "",

		role: "",
		department: "",
		location: "",
		category: "",
		is_office_staff: true,
		is_expatriate: true,
		visa_type: "",
		passport_number: "",
		visa_duration: 40,

		employment_type: "",
		employment_date: "",
		has_work_location_objection: true,
		work_location_objection: "",
		supervisor: "",

		salary: "",
		payment_method: "",
		bank_name: "",
		bank_account_number: "",
		bank_account_name: "",

		next_of_kin: "",
		next_of_kin_phone: "",
		next_of_kin_email: "",
		next_of_kin_address: "",
		relationship_to_next_of_kin: "",
		referee_name: "",
		referee_phone: "",
		emergency_contact_name: "",
		emergency_contact_phone: ""
	});




	useEffect(() => {
		setInput((prevState: any) => {
			return ({
				...prevState,
				first_name: viewdata?.employeeDetails?.first_name,
				last_name: viewdata?.employeeDetails?.last_name,
				middle_name: viewdata?.employeeDetails?.middle_name,
				mothers_maiden_name: viewdata?.employeeDetails?.mothers_maiden_name,
				email: viewdata?.employeeDetails?.email,
				personal_email: viewdata?.employeeDetails?.personal_email,
				gender: viewdata?.employeeDetails?.gender,
				phone: viewdata?.employeeDetails?.phone,
				date_of_birth: viewdata?.employeeDetails?.date_of_birth,
				marital_status: viewdata?.employeeDetails?.marital_status,
				has_disability: viewdata?.employeeDetails?.has_disability,
				disability: viewdata?.employeeDetails?.disability,
				nin: viewdata?.employeeDetails?.nin,

				religion: viewdata?.employeeDetails?.religion,
				institution_attended: viewdata?.employeeDetails?.institution_attended,
				course_studied: viewdata?.employeeDetails?.course_studied,
				qualification: viewdata?.employeeDetails?.qualification,

				address: viewdata?.address?.address,
				city: viewdata?.address?.city,
				state_of_origin: viewdata?.address?.middle_name,
				country: viewdata?.address?.country,
				lga: viewdata?.address?.lga,
				state_of_residence: viewdata?.address?.state_of_residence,
				street: viewdata?.address?.street,

				role: viewdata?.employementDetails?.role,
				department: viewdata?.employementDetails?.department,
				location: viewdata?.employementDetails?.location,
				category: viewdata?.employementDetails?.category,
				is_office_staff: true,
				is_expatriate: true,
				visa_type: viewdata?.employementDetails?.visa_type,
				passport_number: viewdata?.employementDetails?.passport_number,
				visa_duration: 40,

				employment_type: viewdata?.employementDetails?.employment_type,
				employment_date: viewdata?.employementDetails?.employment_date,
				has_work_location_objection: true,
				work_location_objection: viewdata?.employementDetails?.work_location_objection,
				supervisor: viewdata?.employementDetails?.supervisor,

				salary: viewdata?.salary?.salary,
				payment_method: viewdata?.financeDetails?.payment_method,
				bank_name: viewdata?.financeDetails?.bank_name,
				bank_account_number: viewdata?.financeDetails?.bank_account_number,
				bank_account_name: viewdata?.financeDetails?.bank_account_name,

				next_of_kin: viewdata?.reference?.next_of_kin,
				next_of_kin_phone: viewdata?.reference?.next_of_kin_phone,
				next_of_kin_email: viewdata?.reference?.next_of_kin_email,
				next_of_kin_address: viewdata?.reference?.next_of_kin_address,
				relationship_to_next_of_kin: viewdata?.reference?.relationship_to_next_of_kin,
				referee_name: viewdata?.reference?.referee_name,
				referee_phone: viewdata?.reference?.referee_phone,
				emergency_contact_name: viewdata?.reference?.emergency_contact_name,
				emergency_contact_phone: viewdata?.reference?.emergency_contact_phone
			});
		});
	}, [setInput, viewdata]);

	useEffect(() => {
		// @ts-ignore
		dispatch(getEmployeePayrollDetails(id));
	}, [dispatch, id])

	// console.log('viewdata', viewdata)


	const bold = { fontWeight: "bold", fontSize: "12px" }

	return (
		<>
			<Helmet>
				<title>Employee Payroll View | Arkland ERP</title>
			</Helmet>
			<div id="reports">
				<div className='roll-title'>
					<h5 className="page-title">Employee  Information / More Details</h5>
					<div className='roll-icon' onClick={() => navigate(-1)}>
						<IoArrowBackSharp size={22} />
					</div>
				</div>

				<div className='view-roll-header-card'>
					<span className='view-roll-Image'>
						<img src={profile} alt="ASL" />
					</span>
					<span>
						<h5>Full Name</h5>
						<p className='view-roll-header-text'>{viewdata?.employeeDetails?.first_name}</p>
					</span>
					<span>
						<h5>Address</h5>
						<p className='view-roll-header-text'>{viewdata?.address?.street}</p>
					</span>
					<span>
						<h5>Payment Method</h5>
						<p className='view-roll-header-text'>{viewdata?.employeeDetails?.first_name}</p>
					</span>
					<span >
						<h5>Status</h5>
						<button className='view-roll-status'>{viewdata?.employeeDetails?.status}</button>
					</span>
				</div>

				<div>

					<div className='half-background mt-4 ' style={{ borderRadius: "20px" }}>
						<span className="Employee-active-title-container" >
							<span className="Employee-active-title"  >Employee Details</span>
						</span>
						<div style={{ height: "10px", }} />
						<Accordion activeKey={activeKey} onSelect={handleAccordionClick}>
							<Accordion.Item eventKey="3">
								<div id='accordion-body-form'>
									<Accordion.Header>Finance </Accordion.Header>
									<Accordion.Body>
										<form >
											<div className="row-item">
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input?.bank_name}
															disable={true}
															label="Bank Name"
															name="bank_name"
															placeholder="Enter Bank Name"

														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input?.bank_account_name}
															disable={true}
															label="Account Name"
															name="bank_account_name"
															placeholder="Enter Account Name"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input?.bank_account_number}
															disable={true}
															label="Account Number"
															name="bank_account_number"
															placeholder="Enter Account Number"
														/>
													</div>
												</div>
											</div>
											<div className="row-item">
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input?.payment_method}
															disable={true}
															label="Payment Method"
															name="payment_method"
															placeholder="Enter Payment Method"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input?.salary}
															disable={true}
															label="Gross Salary"
															name="salary"
															placeholder="Enter Gross Salary"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Basic Salary "
															name="last_name"
															placeholder="Enter Basic Salary "
														/>
													</div>
												</div>
											</div>
											<div className="row-item">
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Medical Allowance"
															name="first_name"
															placeholder="Enter Medical Allowance"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Transport Allowance"
															name="middle_name"
															placeholder="Enter Transport Allowance"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input?.date_of_birth}
															disable={true}
															label="Meal Allowance"
															name="last_name"
															placeholder="ENTER Meal Allowance"
														/>
													</div>
												</div>
											</div>
											<div className="row-item">
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input?.marital_status}
															disable={true}
															label="Housing Allowance"
															name="first_name"
															placeholder="ENTER Housing Allowance"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Utility Allowance"
															name="middle_name"
															placeholder="ENTER Utility Allowance"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">

													</div>
												</div>
											</div>

										</form>
										<div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>

											<button id='view-status' onClick={() => navigate("/payroll/payroll/payrollemployeesedit", { state: { open: "3", id: id, data: viewdata } })}>Edit</button>
										</div>
									</Accordion.Body>
								</div>
							</Accordion.Item>
							<Accordion.Item eventKey="2">
								<div id='accordion-body-form' >
									<Accordion.Header>Employment </Accordion.Header>
									<Accordion.Body>
										<form >
											<div className="row-item">
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="First Name"
															name="first_name"
															placeholder="Enter First Name"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Middle Name"
															name="middle_name"
															placeholder="Enter Middle Name"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Middle Name"
															name="last_name"
															placeholder="Enter Middle Name"
														/>
													</div>
												</div>
											</div>
											<div className="row-item">
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Mother’s Maiden Name"
															name="first_name"
															placeholder="Enter Mother’s Maiden Name"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Official Email"
															name="middle_name"
															placeholder="Enter Official Email"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Personal Email"
															name="last_name"
															placeholder="Enter Personal Email"
														/>
													</div>
												</div>
											</div>
											<div className="row-item">
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Personal Email"
															name="first_name"
															placeholder="Enter Personal Email"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Phone"
															name="middle_name"
															placeholder="Enter Phone"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Date Of Birth"
															name="last_name"
															placeholder="ENTER Date Of Birth"
														/>
													</div>
												</div>
											</div>
											<div className="row-item">
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Marital Status"
															name="first_name"
															placeholder="ENTER Marital Status"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Has Disability"
															name="middle_name"
															placeholder="ENTER Has Disability"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="NIN"
															name="last_name"
															placeholder="ENTER NIN"
														/>
													</div>
												</div>
											</div>
											<div className="row-item">
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Religion"
															name="first_name"
															placeholder="Enter Religion"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Religion"
															name="first_name"
															placeholder="Enter Religion"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Religion"
															name="first_name"
															placeholder="Enter Religion"
														/>
													</div>
												</div>
											</div>
										</form>
										<div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }} onClick={() => navigate("/payroll/payroll/payrollemployeesedit", { state: { open: "2", id: id, data: viewdata } })}>
											<button id='view-status' >Edit</button>
										</div>
									</Accordion.Body>
								</div>
							</Accordion.Item>
							<Accordion.Item eventKey="0">
								<div id='accordion-body-form'>
									<Accordion.Header>Employee </Accordion.Header>
									<Accordion.Body>
										<form >
											<div className="row-item">
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="First Name"
															name="first_name"
															placeholder="Enter First Name"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Middle Name"
															name="middle_name"
															placeholder="Enter Middle Name"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Middle Name"
															name="last_name"
															placeholder="Enter Middle Name"
														/>
													</div>
												</div>
											</div>
											<div className="row-item">
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Mother’s Maiden Name"
															name="first_name"
															placeholder="Enter Mother’s Maiden Name"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Official Email"
															name="middle_name"
															placeholder="Enter Official Email"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Personal Email"
															name="last_name"
															placeholder="Enter Personal Email"
														/>
													</div>
												</div>
											</div>
											<div className="row-item">
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Personal Email"
															name="first_name"
															placeholder="Enter Personal Email"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Phone"
															name="middle_name"
															placeholder="Enter Phone"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Date Of Birth"
															name="last_name"
															placeholder="ENTER Date Of Birth"
														/>
													</div>
												</div>
											</div>
											<div className="row-item">
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Marital Status"
															name="first_name"
															placeholder="ENTER Marital Status"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Has Disability"
															name="middle_name"
															placeholder="ENTER Has Disability"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="NIN"
															name="last_name"
															placeholder="ENTER NIN"
														/>
													</div>
												</div>
											</div>
											<div className="row-item">
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Religion"
															name="first_name"
															placeholder="Enter Religion"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">

													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
													</div>
												</div>
											</div>
										</form>
										<div style={{ display: "flex", justifyContent: "flex-end" }} onClick={() => navigate("/payroll/payroll/payrollemployeesedit", { state: { open: "0", id: id, data: viewdata } })}>
											<button id='view-status' >Edit</button>
										</div>
									</Accordion.Body>
								</div>
							</Accordion.Item>
							<Accordion.Item eventKey="4">
								<div id='accordion-body-form'>
									<Accordion.Header>References</Accordion.Header>
									<Accordion.Body>
										<form >
											<div className="row-item">
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="First Name"
															name="first_name"
															placeholder="Enter First Name"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Middle Name"
															name="middle_name"
															placeholder="Enter Middle Name"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Middle Name"
															name="last_name"
															placeholder="Enter Middle Name"
														/>
													</div>
												</div>
											</div>
											<div className="row-item">
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Mother’s Maiden Name"
															name="first_name"
															placeholder="Enter Mother’s Maiden Name"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Official Email"
															name="middle_name"
															placeholder="Enter Official Email"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Personal Email"
															name="last_name"
															placeholder="Enter Personal Email"
														/>
													</div>
												</div>
											</div>
											<div className="row-item">
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Personal Email"
															name="first_name"
															placeholder="Enter Personal Email"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Phone"
															name="middle_name"
															placeholder="Enter Phone"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input}
															disable={true}
															label="Date Of Birth"
															name="last_name"
															placeholder="ENTER Date Of Birth"
															dis
														/>
													</div>
												</div>
											</div>


										</form>
										<div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }} onClick={() => navigate("/payroll/payroll/payrollemployeesedit", { state: { open: "4", id: id, data: viewdata } })}>
											<button id='view-status' >Edit</button>
										</div>
									</Accordion.Body>
								</div>
							</Accordion.Item>


							<Accordion.Item eventKey="1">
								<div id='accordion-body-form'>
									<Accordion.Header>Address</Accordion.Header>
									<Accordion.Body>
										<form >
											<div className="row-item">
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input?.street}
															disable={true}
															label="Street Name "
															name="first_name"
															placeholder="Enter Street Name "
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input?.city}
															disable={true}
															label="City"
															name="middle_name"
															placeholder="Enter City"
														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input?.state_of_residence}
															disable={true}
															label="State of residence"
															placeholder="state of residence"
														/>
													</div>
												</div>
											</div>
											<div className="row-item">
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input?.country}
															disable={true}
															label="Conuntry"
															name="first_name"
															placeholder="Enter Conuntry"

														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">
														<InputField2
															bold={bold}
															values={input?.lga}
															disable={true}
															label="Lga"
															placeholder="lga"

														/>
													</div>
												</div>
												<div className="imput-space" />
												<div className="col">
													<div className="form-group">

														<InputField2
															bold={bold}
															values={input?.state_of_origin}
															disable={true}
															label="State Of Origin"
															placeholder="state of origin"

														/>
													</div>
												</div>
											</div>
										</form>
										<div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }} >
											<button id='view-status' onClick={() => navigate("/payroll/payroll/payrollemployeesedit", { state: { open: "1" } })}>Edit</button>
										</div>
									</Accordion.Body>
								</div>
							</Accordion.Item>

						</Accordion>
					</div>
				</div>
			</div>
		</>
	)
}

export default EmployeePayrollView
