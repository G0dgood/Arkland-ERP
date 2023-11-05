import React, { useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { InputField } from '../../../components/TableOptions'

const EmployeesOnboarding = () => {

	const [activeKey, setActiveKey] = useState<any>(null);

	const handleAccordionClick = (eventKey: any) => {
		if (activeKey === eventKey) {
			setActiveKey(null);
		} else {
			setActiveKey(eventKey);
		}
	};

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
			<h5 className="page-title">Employees Onboarding</h5>
			<div className='half-background mt-4'>
				<Accordion activeKey={activeKey} onSelect={handleAccordionClick}>
					<Accordion.Item eventKey="0">
						<Accordion.Header>Employee Details</Accordion.Header>
						<Accordion.Body>
							<form>
								<div className="row-item">
									<div className="col">
										<div className="form-group">
											<InputField
												label="First Name"
												name="first_name"
												placeholder="Enter First Name"
											/>
										</div>
									</div>
									<div className="imput-space" />
									<div className="col">
										<div className="form-group">
											<InputField
												label="Middle Name"
												name="middle_name"
												placeholder="Enter Middle Name"
											/>
										</div>
									</div>
									<div className="imput-space" />
									<div className="col">
										<div className="form-group">
											<InputField
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
											<InputField
												label="Mother’s Maiden Name"
												name="first_name"
												placeholder="Enter Mother’s Maiden Name"
											/>
										</div>
									</div>
									<div className="imput-space" />
									<div className="col">
										<div className="form-group">
											<InputField
												label="Official Email"
												name="middle_name"
												placeholder="Enter Official Email"
											/>
										</div>
									</div>
									<div className="imput-space" />
									<div className="col">
										<div className="form-group">
											<InputField
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
											<InputField
												label="Personal Email"
												name="first_name"
												placeholder="Enter Personal Email"
											/>
										</div>
									</div>
									<div className="imput-space" />
									<div className="col">
										<div className="form-group">
											<InputField
												label="Phone"
												name="middle_name"
												placeholder="Enter Phone"
											/>
										</div>
									</div>
									<div className="imput-space" />
									<div className="col">
										<div className="form-group">
											<InputField
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
											<InputField
												label="Marital Status"
												name="first_name"
												placeholder="ENTER Marital Status"
											/>
										</div>
									</div>
									<div className="imput-space" />
									<div className="col">
										<div className="form-group">
											<InputField
												label="Has Disability"
												name="middle_name"
												placeholder="ENTER Has Disability"
											/>
										</div>
									</div>
									<div className="imput-space" />
									<div className="col">
										<div className="form-group">
											<InputField
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
											<InputField
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
							<button onClick={handleNextClick}>Next</button>
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="1">
						<Accordion.Header>Address</Accordion.Header>
						<Accordion.Body>
							<button onClick={handleNextClick}>Next</button>
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="2">
						<Accordion.Header>Employment Details</Accordion.Header>
						<Accordion.Body>
							<button onClick={handleNextClick}>Next</button>
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="3">
						<Accordion.Header>Finance Details</Accordion.Header>
						<Accordion.Body>
							<button onClick={handleNextClick}>Next</button>
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="4">
						<Accordion.Header>References</Accordion.Header>
						<Accordion.Body>
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			</div>
		</div>
	)
}

export default EmployeesOnboarding
