import { useEffect, useState } from 'react'
import CustomInputField from '../../components/Inputs/CustomInputField';
import { Button } from '@material-ui/core';
import ReactSelectField from '../../components/Inputs/ReactSelectField';
import { Form, Formik } from "formik";
import { Modal, Spinner } from 'react-bootstrap';
import InputField from '../../components/Inputs/InputField';
import { formatDate } from '../../utils/formatDate';
import { difficultyOptions, priorityOptions } from '../../functions/helpers';
import { createTask, reset } from '../../features/Tasks/taskSlice';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { fireAlert } from '../../utils/Alert';
import createHttpService from '../../components/HttpService';
import { ModalHeader } from '../../components/Modals/ModalOptions';
import { BsListTask } from 'react-icons/bs';
// import DataService from '../../utils/dataService';

// const dataService = new DataService()
const CreateTaskModal = ({ view }: any) => {
	const dispatch = useAppDispatch();
	const { createisError, createisLoading, createmessage, createisSuccess } = useAppSelector((state: any) => state.task)

	const [Show, setLgShow] = useState(false);


	// const userInfo = dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`)
	// const id = userInfo?.employee?._id

	useEffect(() => {
		if (createisSuccess) {
			setLgShow(false)
			fireAlert("Success", "Task created successfully", "success");
			dispatch(reset());
		}
	}, [createisError, createisSuccess, createmessage, dispatch]);

	const handleSubmit = async (values: any) => {
		const input = { ...values };
		// @ts-ignore
		dispatch(createTask(input));
	}
	const [teamMembers, setTeamsLead] = useState([]);



	const getData = async () => {
		const HttpService = createHttpService();
		// setisLoading(true)
		try {
			const teamsUrl = `employees/users`
			const teams: any = await HttpService.get(teamsUrl)
			setTeamsLead(teams?.data?.data)

			// setisLoading(false)

		} catch (error) {
			// setisLoading(false)
		}
	}

	const availablleTeamMembers = [] as any;

	teamMembers &&
		teamMembers.forEach((teamMember: any) =>
			availablleTeamMembers.push({
				value: teamMember?.id,
				label: teamMember?.full_name,
			})
		);




	return (
		<div>
			<ul className="nav-tabs-btn mb-3">
				{view === "team" ? <li className={"active"} onClick={() => { setLgShow(true); getData() }}>Add task</li> : <li className={"active"} onClick={() => { setLgShow(true); getData() }}>	Create Task </li>}
			</ul>


			<Modal
				size="lg"
				show={Show}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>

				<ModalHeader setLgShow={setLgShow} icon={<BsListTask size={30} />} title={"Create Task"} subtitle={" Create A New Task"} />
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
												className="add-experience"
												type="submit"
											>
												{createisLoading
													? <Spinner animation="border" size='sm' />
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