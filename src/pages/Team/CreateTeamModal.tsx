import { useEffect, useState } from 'react'
import { Button } from '@material-ui/core';
import { Form, Formik } from "formik";
import { Modal, Spinner } from 'react-bootstrap';
import InputField from '../../components/Inputs/InputField';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { fireAlert } from '../../utils/Alert';
import { createTeam, getTeam, reset } from '../../features/Team/teamSlice';
import { ModalHeader } from '../../components/Modals/ModalOptions';
import { AiOutlineTeam } from 'react-icons/ai';

const CreateTeamModal = () => {
	const dispatch = useAppDispatch();
	const { createisLoading, createisSuccess } = useAppSelector((state: any) => state.team)
	const [Show, setLgShow] = useState(false);

	useEffect(() => {
		if (createisSuccess) {
			setLgShow(false)
			fireAlert("Success", "Team created successfully", "success");
			dispatch(reset());
			dispatch(getTeam());
		}
	}, [createisSuccess, dispatch]);

	const handleSubmit = async (values: any) => {
		const input = { ...values };
		// @ts-ignore
		dispatch(createTeam(input));
	}

	return (
		<div>
			<ul className="nav-tabs-btn mb-3">
				<li className={"active"} onClick={() => setLgShow(true)}>Create Team</li>
			</ul>
			<Modal
				size="lg"
				show={Show}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<ModalHeader setLgShow={setLgShow} icon={<AiOutlineTeam size={30} />} title={"Create Team"} subtitle={" Create Team"} />
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
												className="add-experience"
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
