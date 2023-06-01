import { Button } from '@material-ui/core';
import React from 'react'
import { Form, Modal, Spinner } from 'react-bootstrap';
import { MdOutlineClose } from 'react-icons/md';
import SelectField from '../Inputs/SelectField';
import { Formik } from 'formik';
import TextAreaField from '../Inputs/TextAreaField';

const RequestEmployeeTerminationModal = () => {
	const [deleteShow, setDeleteShow] = React.useState(false);

	const reasonOptions = [
		"Select reason",
		"misconduct",
		"resignation",
		"redundancy",
	];

	const handleEmployeeTermination = () => {

	}

	return (
		<div>
			<Button
				variant="contained"
				className="Add-btn"
				onClick={() => setDeleteShow(true)}
			>
				Request Employee Termination
			</Button>
			<Modal
				size="lg"
				show={deleteShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header id="displayTermination">
					<span></span>
					<Modal.Title>
						Request Employee Termination
					</Modal.Title>
					<Button
						style={{ color: "#fff" }}
						onClick={() => setDeleteShow(false)}
					>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					{/* <p>Are you sure you want to request termination?</p>
                           */}
					<Modal.Body>
						<Formik
							initialValues={{
								reason: "",
								description: "",
							}}
							onSubmit={handleEmployeeTermination}
						>
							{({ setFieldValue }) => {
								return (
									<Form>
										<div className="Modal-Body">
											<div className="col">
												<div className="form-group">
													<SelectField
														options={reasonOptions}
														label="Reason"
														name="reason"
														className="form-group__gender"
														onChange={(event: any) => {
															setFieldValue(
																"reason",
																event?.target.value
															);
														}}
													/>
												</div>
											</div>
											<div className="col">
												<div className="form-group">
													<TextAreaField
														style={{
															height: "12rem",
															lineHeight: "1",
														}}
														type="textarea"
														label="Description"
														placeholder="Enter description"
														name="description"
														className="form-group__gender"
														onChange={(event: any) => {
															setFieldValue(
																"description",
																event?.target.value
															);
														}}
													/>
												</div>
											</div>
											<div className="btn-modal-container">
												<Button
													variant="contained"
													className="Add-btn-modal"
													type="submit"
												>
													{false ? (
														<Spinner animation="border" />
													) : (
														"Request Termination"
													)}
												</Button>
											</div>
										</div>
									</Form>
								);
							}}
						</Formik>
					</Modal.Body>
				</Modal.Body>
				{/* <Modal.Footer>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              setShowDialog(false);
                            }}
                          >
                            {isTerminateLoading ? (
                              <Spinner animation="border" />
                            ) : (
                              "Yes"
                            )}
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={() => setShowDialog(false)}
                          >
                            Cancel
                          </button>
                        </Modal.Footer> */}
			</Modal>
		</div>
	)
}

export default RequestEmployeeTerminationModal