import { useState } from 'react'
import { IoArrowBackSharp } from 'react-icons/io5'
import profile from '../../../assets/images/Ellipse6.png'
import { Accordion } from 'react-bootstrap'
import { InputField2 } from '../../../components/TableOptions'
import { useNavigate } from 'react-router-dom'


const EmployeePayrollView = () => {
	const navigate = useNavigate();

	const [activeKey, setActiveKey] = useState<any>(null);

	const handleAccordionClick = (eventKey: any) => {
		if (activeKey === eventKey) {
			setActiveKey(null);
		} else {
			setActiveKey(eventKey);
		}
	};

	return (
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
					<p className='view-roll-header-text'>Godwin Chinedu</p>
				</span>
				<span>
					<h5>Address</h5>
					<p className='view-roll-header-text'>8 Rasaki street</p>
				</span>
				<span>
					<h5>Payment Method</h5>
					<p className='view-roll-header-text'>bank</p>
				</span>
				<span >
					<h5>Status</h5>
					<button className='view-roll-status'>Status</button>
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

												</div>
											</div>
										</div>

									</form>
									<div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>

										<button id='view-status' onClick={() => navigate("/payroll/payroll/employeesonboarding", { state: { open: "3" } })}>Edit</button>
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
														disable={true}
														label="Religion"
														name="first_name"
														placeholder="Enter Religion"
													/>
												</div>
											</div>
										</div>
									</form>
									<div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }} onClick={() => navigate("/payroll/payroll/employeesonboarding", { state: { open: "2" } })}>
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
									<div style={{ display: "flex", justifyContent: "flex-end" }} onClick={() => navigate("/payroll/payroll/employeesonboarding", { state: { open: "0" } })}>
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
									<div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }} onClick={() => navigate("/payroll/payroll/employeesonboarding", { state: { open: "4" } })}>
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
														disable={true}
														label="Personal Email"
														name="last_name"
														placeholder="Enter Personal Email"
													/>
												</div>
											</div>
										</div>
									</form>
									<div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }} >
										<button id='view-status' onClick={() => navigate("/payroll/payroll/employeesonboarding", { state: { open: "1" } })}>View</button>
									</div>
								</Accordion.Body>
							</div>
						</Accordion.Item>

					</Accordion>
				</div>
			</div>
		</div>
	)
}

export default EmployeePayrollView
