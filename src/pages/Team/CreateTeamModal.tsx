import { useEffect, useState } from 'react'
import { Button } from '@material-ui/core';
import { Form, Formik } from "formik";
import { MdOutlineClose } from 'react-icons/md';
import { Modal, Spinner } from 'react-bootstrap';
import InputField from '../../components/Inputs/InputField';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { fireAlert } from '../../utils/Alert';
import { createTeam, getTeam, reset } from '../../features/Team/teamSlice';

const CreateTeamModal = () => {
	const dispatch = useAppDispatch();
	const { createisError, createisLoading, createmessage, createisSuccess } = useAppSelector((state: any) => state.team)
	const [Show, setShow] = useState(false);

	useEffect(() => {
		if (createisError) {
			fireAlert("Create team failed", createmessage, "error");
			dispatch(reset());
		} else if (createisSuccess) {
			setShow(false)
			fireAlert("Success", "Team created successfully", "success");
			dispatch(getTeam());
			dispatch(reset());
		}
	}, [createisError, createisSuccess, createmessage, dispatch]);

	const handleSubmit = async (values: any) => {
		const input = { ...values };
		// @ts-ignore
		dispatch(createTeam(input));
	}

	return (
		<div>
			<Button
				variant="contained"
				className="Add-btn"
				onClick={() => setShow(true)}
			>
				Create Team
			</Button>
			<Modal
				size="lg"
				show={Show}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header>
					<span></span>
					<span className="span-center-title"> Create Team</span>
					<Button
						style={{ color: "#fff" }}
						onClick={() => setShow(false)}
					>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<Formik
						initialValues={{
							name: "",
							description: ""
						}}
						onSubmit={handleSubmit}
					>
						{({ setFieldValue }) => {
							return (
								<Form>
									<div className="Modal-Body">
										<div className="col">
											<div className="form-group">
												<InputField
													label="Title"
													placeholder="Enter team name"
													name="name"
													className="form-group__gender"
													onChange={(event: any) => {
														setFieldValue("name", event?.value);
													}}
												/>
											</div>
										</div>

										<div className="Modal-textarea-middle">
											<div className="col">
												<div className="form-group">
													<InputField
														label="Description"
														placeholder="Enter team description"
														name="description"
														className="form-group__gender"
														onChange={(event: any) => {
															setFieldValue("description", event?.value);
														}}
													/>
												</div>
											</div>
										</div>
										<div className="btn-modal-container">
											<Button
												variant="contained"
												className="Add-btn-modal"
												type="submit" >
												{createisLoading ? <Spinner animation="border" /> : "Create Team"}
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
	)
}

export default CreateTeamModal
