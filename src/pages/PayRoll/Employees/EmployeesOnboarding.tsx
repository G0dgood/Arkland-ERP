import React, { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { InputField2 } from '../../../components/TableOptions'
import { IoArrowBackSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const EmployeesOnboarding = () => {
	// Access passed data from location.state
	const { open } = window.history.state.usr || {};

	const navigate = useNavigate();
	const [activeKey, setActiveKey] = useState<any>(null);

	const handleAccordionClick = (eventKey: any) => {
		if (activeKey === eventKey) {
			setActiveKey(null);
		} else {
			setActiveKey(eventKey);
		}
	};

	useEffect(() => {
		setActiveKey(open?.toString())
	}, [open])

	const handleNextClick = () => {
		// Find the index of the currently active accordion item
		const currentIndex = parseInt(activeKey, 10);

		// Calculate the eventKey for the next accordion item
		const nextIndex = currentIndex < 4 ? currentIndex + 1 : 4; // Assuming you have 5 accordion items (0 to 4)

		// Open the next accordion item
		setActiveKey(nextIndex.toString());
	};

	return (
		<div id="reports">
			<div className='roll-title'>
				<h5 className="page-title">Employees Onboarding</h5>
				<div className='roll-icon' onClick={() => navigate(-1)}>
					<IoArrowBackSharp size={22} />
				</div>
			</div>
			<div className='half-background mt-4'>
				<Accordion activeKey={activeKey} onSelect={handleAccordionClick}>
					<Accordion.Item eventKey="0">
						<div id='accordion-body-form'>
							<Accordion.Header>Employee Details</Accordion.Header>
							<Accordion.Body>
								<form >
									<div className="row-item">
										<div className="col">
											<div className="form-group">
												<InputField2
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
								<div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
									<button id='view-status' onClick={handleNextClick}>Next</button>
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
													label="Personal Email"
													name="last_name"
													placeholder="Enter Personal Email"
												/>
											</div>
										</div>
									</div>
								</form>
								<div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
									<button id='view-status' onClick={handleNextClick}>Next</button>
								</div>
							</Accordion.Body>
						</div>
					</Accordion.Item>
					<Accordion.Item eventKey="2">
						<div id='accordion-body-form'>
							<Accordion.Header>Employment Details</Accordion.Header>
							<Accordion.Body>
								<form >
									<div className="row-item">
										<div className="col">
											<div className="form-group">
												<InputField2
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
													label="Religion"
													name="first_name"
													placeholder="Enter Religion"
												/>
											</div>
										</div>
									</div>
								</form>
								<div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
									<button id='view-status' onClick={handleNextClick}>Next</button>
								</div>
							</Accordion.Body>
						</div>
					</Accordion.Item>
					<Accordion.Item eventKey="3">
						<div id='accordion-body-form'>
							<Accordion.Header>Finance Details</Accordion.Header>
							<Accordion.Body>
								<form >
									<div className="row-item">
										<div className="col">
											<div className="form-group">
												<InputField2
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
									<button id='view-status' onClick={handleNextClick}>Next</button>
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
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
													disable={false}
													label="Date Of Birth"
													name="last_name"
													placeholder="ENTER Date Of Birth"
													dis
												/>
											</div>
										</div>
									</div>
									<div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }} onClick={() => navigate("/payroll/payroll/payrollemployeeview")}>
										<button id='view-status' onClick={handleNextClick}>Next</button>
									</div>
								</form>
							</Accordion.Body>
						</div>
					</Accordion.Item>
				</Accordion>
			</div>
		</div>
	)
}

export default EmployeesOnboarding
