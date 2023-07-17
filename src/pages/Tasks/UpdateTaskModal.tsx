import { useEffect, useState } from 'react'
import { InputField } from '../../components/TableOptions'
import { Modal, Spinner } from 'react-bootstrap'
import { Button } from '@material-ui/core'
import { MdOutlineClose } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../../store/useStore'
import { fireAlert } from '../../utils/Alert'
import { formatDate } from '../../utils/formatDate'
import CustomInputField from '../../components/Inputs/CustomInputField'
import ReactSelectField from '../../components/Inputs/ReactSelectField'
import { difficultyOptions, priorityOptions } from '../../functions/helpers'
import { Form, Formik } from 'formik'
import { getTeamLead } from '../../features/TeamLead/teamleadSlice'
import { reset, updateTask } from '../../features/Tasks/taskSlice'

const UpdateTaskModal = ({ id, title }: any) => {
	const dispatch = useAppDispatch();
	const { updateisLoading, updatemessage, updateisSuccess } = useAppSelector((state: any) => state.task)
	const { data: teamMembers } = useAppSelector((state: any) => state.task)
	const [Show, setShow] = useState(false);
	const [inputs, setInputs] = useState<any>({
		title: " ",
		points: 0,
		priority: 0,
		assigned_to: " ",
		project: " ",
		expected_completion_date: " ",
		note: " "
	})

	useEffect(() => {
		if (!teamMembers) {
			dispatch(getTeamLead());
		}
	}, [dispatch, teamMembers])

	useEffect(() => {
		if (updateisSuccess) {
			setShow(false)
			fireAlert("Success", "Task updated successfully", "success");
			dispatch(reset());
		}
	}, [updateisSuccess, updatemessage, dispatch, id]);



	const handleSubmit = (value: any) => {
		const input = { ...value, id }
		// @ts-ignore
		dispatch(updateTask(input));
	}

	useEffect(() => {
		setInputs((prevState: any) => {
			return ({
				...prevState,
				name: title
			});
		});
	}, [id, setInputs, title]);

	const availablleTeamMembers = [] as any;

	teamMembers &&
		teamMembers.forEach((teamMember: any) =>
			availablleTeamMembers.push({
				value: teamMember.assigned_to?.id,
				label: teamMember.assigned_to?.full_name,
			})
		);


	return (
		<div>
			<Button
				variant="contained"
				className="add-experience"
				onClick={() => setShow(true)}
			>
				Update Task
			</Button>
			<Modal
				size="lg"
				show={Show}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header>
					<span></span>
					<span className="span-center-title">Update Task </span>
					<Button
						style={{ color: "#fff" }}
						onClick={() => setShow(false)} >
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<Formik
						initialValues={{
							title: "",
							points: "",
							priority: "",
							assigned_to: "",
							expected_completion_date: "",
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
										{/* <div className="Modal-textarea-middle">
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
										</div> */}
										<div className="btn-modal-container">
											<Button
												variant="contained"
												className="add-experience"
												type="submit"
											>
												{updateisLoading
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

export default UpdateTaskModal
