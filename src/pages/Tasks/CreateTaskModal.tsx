import { useEffect, useState } from 'react'
import CustomInputField from '../../components/Inputs/CustomInputField';
import { Button } from '@material-ui/core';
import ReactSelectField from '../../components/Inputs/ReactSelectField';
import { Form, Formik } from "formik";
import { MdOutlineClose } from 'react-icons/md';
import { Modal, Spinner } from 'react-bootstrap';
import InputField from '../../components/Inputs/InputField';
import { formatDate } from '../../utils/formatDate';
import { difficultyOptions, priorityOptions } from '../../functions/helpers';
import { createTask, reset } from '../../features/Tasks/taskSlice';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { fireAlert } from '../../utils/Alert';
import { getTeammembers } from '../../features/Team/teamSlice';

const CreateTaskModal = ({ view, id }: any) => {
	const dispatch = useAppDispatch();
	const { createisError, createisLoading, createmessage, createisSuccess } = useAppSelector((state: any) => state.task)
	const { membersdata: teamMembers, membersisLoading } = useAppSelector((state: any) => state.team)
	const [Show, setShow] = useState(false);

	console.log('membersisLoading', membersisLoading, teamMembers)


	// useEffect(() => {
	// 	dispatch(getTeammembers());
	// }, [dispatch])



	useEffect(() => {
		if (createisError) {
			fireAlert("Create task failed", createmessage, "error");
			dispatch(reset());
		} else if (createisSuccess) {
			setShow(false)
			fireAlert("Success", "Task created successfully", "success");
			dispatch(reset());
		}
	}, [createisError, createisSuccess, createmessage, dispatch]);

	const handleSubmit = async (values: any) => {
		const input = { ...values };
		// @ts-ignore
		dispatch(createTask(input));
	}


	const availablleTeamMembers = [] as any;

	teamMembers &&
		teamMembers.forEach((teamMember: any) =>
			availablleTeamMembers.push({
				value: teamMember.assigned_to?.id,
				label: teamMember.assigned_to?.full_name,
			})
		);

	const handleShow = () => {
		setShow(true)
		// @ts-ignore
		dispatch(getTeammembers(id));
	}

	return (
		<div>
			{view === "team" ? <Button className="add-button" onClick={handleShow}>Add task</Button> : <Button
				variant="contained"
				className="Add-btn"
				onClick={() => setShow(true)}
			>
				Create Task
			</Button>}

			<Modal
				size="lg"
				show={Show}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header>
					<span></span>
					<span className="span-center-title"> Create Task</span>
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
							title: "",
							assigned_to: "",
							points: "",
							priority: "",
							expected_completion_date: "",
							note: "",
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
													placeholder="Enter task title"
													name="title"
													className="form-group__gender"
													onChange={(event: any) => {
														setFieldValue("title", event?.value);
													}}
												/>
											</div>
										</div>
										<div className="modal-input-sub-space">
											<div className="col">
												<div className="form-group">
													<ReactSelectField
														options={priorityOptions}
														label="How important is this task?"
														name="priority"
														className="form-group__gender"
														onChange={(event: any) => {
															setFieldValue(
																"priority",
																event?.value
															);
														}}
													/>
												</div>
											</div>
										</div>
										<div className="modal-input-sub-space">
											<div className="col">
												<div className="form-group">
													<ReactSelectField
														options={difficultyOptions}
														label="How difficult is this task?"
														name="points"
														className="form-group__gender"
														onChange={(event: any) => {
															setFieldValue(
																"points",
																event?.value
															);
														}}
													/>
												</div>
											</div>
										</div>
										<div className="modal-input-sub-space">
											<div className="col">
												<div className="form-group">
													<ReactSelectField
														options={availablleTeamMembers}
														label="Who is this task assigned to?"
														name="assigned_to"
														className="form-group__gender"
														onChange={(event: any) => {
															setFieldValue(
																"assigned_to",
																event?.value
															);
														}}
													/>
												</div>
											</div>
										</div>
										<div className="modal-input-sub-space">
											<div className="col">
												<div className="form-group">
													<CustomInputField
														style={{
															lineHeight: 1,
														}}
														type="date"
														label="Proposed Completion Date"
														name="expected_completion_date"
														onChange={(event: any) => {
															setFieldValue(
																"expected_completion_date",
																formatDate(event?.target.value)
															);
														}}
													/>
												</div>
											</div>
										</div>
										<div className="Modal-textarea-middle">
											<div className="col">
												<div className="form-group">
													<InputField
														label="Note"
														placeholder="Enter task note"
														name="note"
														className="form-group__gender"
														onChange={(event: any) => {
															setFieldValue("note", event?.value);
														}}
													/>
												</div>
											</div>
										</div>
										<div className="btn-modal-container">
											<Button
												disabled={createisLoading}
												variant="contained"
												className="Add-btn-modal"
												type="submit"
											>
												{createisLoading
													? <Spinner animation="border" />
													: "Create"}
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

export default CreateTaskModal