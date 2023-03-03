// import { useState } from 'react'
// import { Modal } from 'react-bootstrap'
// import { Button } from '@material-ui/core';
// import { MdOutlineClose } from 'react-icons/md';
// import { BsPlusLg } from 'react-icons/bs';

// const CreateProjectModal = (props: any) => {

// 	const [lgShow, setLgShow] = useState(false);

// 	return (
// 		<div>
// 			<Button className='subone-header-flex-btn' onClick={() => setLgShow(true)}>
// 				<BsPlusLg size={10} color='#fff' className='Create-plue-account' /> Create Project</Button>
// 			<Modal
// 				size="lg"
// 				show={lgShow}
// 				aria-labelledby="contained-modal-title-vcenter"
// 				centered
// 			>
// 				<Modal.Header  >
// 					<span>

// 					</span>
// 					<span className='span-center-title'>Create Project</span>
// 					<Button style={{ color: '#fff' }} onClick={() => setLgShow(false)}>
// 						<MdOutlineClose size={28} />
// 					</Button>
// 				</Modal.Header>
// 				<Modal.Body>
// 					<div className='Modal-Body'>
// 						<h6>Name</h6>
// 						<select id="Modal-textarea-input-sub" >
// 							<option value=" ">Select Name...</option>
// 							<option value="AL">Alabama</option>
// 							<option value="AK">Alaska</option>
// 						</select >
// 						<div className='Modal-data-time'>
// 							<div className='Modal-two-input'>
// 								<h6>Department</h6>
// 								<select id="Modal-textarea-input-sub" >
// 									<option value=" ">Select Department</option>
// 									<option value="AL">Software</option>
// 									<option value="AK">Sales</option>
// 								</select >
// 							</div>
// 							<div className='div-space' />
// 							<div className='Modal-two-input'>
// 								<h6>Team Lead</h6>
// 								<select id="Modal-textarea-input-sub" >
// 									<option value=" ">Select Team Lead</option>
// 									<option value="AL">Sam</option>
// 									<option value="AK">John</option>
// 								</select >
// 							</div>
// 						</div>
// 						<div className='Modal-textarea-middle'>
// 							<h6>Description</h6>
// 							<textarea rows={6} className='Modal-textarea' placeholder='Enter detailed description' />
// 						</div>
// 						<div className='Modal-data-time'>
// 							<div className='Modal-two-input'>
// 								<h6>L G A</h6>
// 								<select id="Modal-textarea-input-sub" >
// 									<option value=" ">Select LGA</option>
// 									<option value="AL">Sam</option>
// 									<option value="AK">John</option>
// 								</select >
// 							</div>
// 							<div className='div-space' />
// 							<div className='Modal-two-input'>
// 								<h6>Country</h6>
// 								<select id="Modal-textarea-input-sub" >
// 									<option value=" ">Select Country</option>
// 									<option value="AL">Sam</option>
// 									<option value="AK">John</option>
// 								</select >
// 							</div>
// 						</div>
// 						<div className='Modal-textarea-middle'>
// 							<h6>Proposed Completion Date</h6>
// 							<input id='Modal-textarea-input-sub' placeholder='Select proposed completion date' type={'date'} />
// 						</div>
// 						<div className='btn-modal-container'>
// 							<Button variant="contained" className="Add-btn-modal">
// 								Create
// 							</Button>
// 						</div>
// 					</div>

// 				</Modal.Body>
// 			</Modal>
// 		</div>
// 	)
// }

// export default CreateProjectModal

import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import axios, { AxiosResponse } from "axios";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { Form, Formik } from "formik";
import { fireAlert } from "../../utils/Alert";
import InputField from "../Inputs/InputField";
import TextAreaField from "../Inputs/TextAreaField";
import { BsPlusLg } from "react-icons/bs";

const CreateDepartmentModal = (props: any) => {
	const [isLoading, setLoading] = React.useState(false);
	const navigate = useNavigate();

	const [lgShow, setLgShow] = useState(false);
	const handleSubmit = async (values: any, { resetForm }: any) => {
		setLoading(true);
		console.log("values", values);
		const createDepartmentValues = { ...values };
		await axios
			.post(
				`${process.env.REACT_APP_API}/hr/departments`,
				createDepartmentValues
			)
			.then((res: AxiosResponse) => {
				setLoading(false);
				if (res.data.success === true || res.status === 200) {
					const title = "Department created successfully";
					const html = `Department created `;
					const icon = "success";
					fireAlert(title, html, icon);
					resetForm(values);
					setLgShow(false);
					navigate(`/departments`);
				}
			})
			.catch((err) => {
				setLoading(false);
				const html = err.response.data.message;
				const icon = "error";
				const title = "Department creation failed";
				fireAlert(title, html, icon);
			});
	};

	return (
		<div>
			<Button variant="contained" className='subone-header-flex-btn' onClick={() => setLgShow(true)}>
				<GoPlus className="icon-space" />  Create Department</Button>
			<Modal
				size="lg"
				show={lgShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header>
					<span></span>
					<span className="span-center-title">Create Department</span>
					<Button style={{ color: "#fff" }} onClick={() => setLgShow(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<Formik
						initialValues={{
							name: "",
							description: "",
						}}
						onSubmit={handleSubmit}
					>
						{({ values, handleChange, setFieldValue, submitForm }) => {
							return (
								<Form>
									<div className="Modal-Body">
										<div className="col">
											<div className="form-group">
												<InputField
													label="Name of department"
													name="name"
													placeholder="Enter name of department"
												/>
											</div>
										</div>
										<div className="Modal-textarea-middle">
											<div className="col">
												<div className="form-group">
													<TextAreaField
														style={{
															height: "12rem",
															lineHeight: "1",
														}}
														type="textarea"
														label="Description of department"
														name="description"
														placeholder="Enter description of department"
														onChange={(event: any) => {
															setFieldValue("description", event?.target.value);
														}}
													/>
												</div>
											</div>
										</div>

										<div className="btn-modal-container">
											<Button
												variant="contained"
												className="Add-btn-modal"
												type="submit"
											>
												{isLoading ? "Please wait..." : "Create"}
											</Button>
										</div>
									</div>
								</Form>
							);
						}}
					</Formik>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default CreateDepartmentModal;



