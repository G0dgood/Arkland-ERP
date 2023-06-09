import { useEffect, useState } from 'react'
import { InputField } from '../../components/TableOptions'
import { Modal, Spinner } from 'react-bootstrap'
import { Button } from '@material-ui/core'
import { MdOutlineClose } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../../store/useStore'
import { reset, updateProject } from '../../features/Project/projectSlice'
import { fireAlert } from '../../utils/Alert'

const UpdateProjectModal = ({ id, title }: any) => {
	const dispatch = useAppDispatch();
	const { updateisError, updateisLoading, updatemessage, updateisSuccess } = useAppSelector((state: any) => state.project)
	const [Show, setShow] = useState(false);
	const [inputs, setInputs] = useState<any>({
		name: "",
		description: "",
		progress_percentage: 0,
	})

	useEffect(() => {
		if (updateisError) {
			fireAlert("Project update  failed", updatemessage, "error");
			dispatch(reset());
		} else if (updateisSuccess) {
			setShow(false)
			fireAlert("Success", "Project updated successfully", "success");
			dispatch(reset());
		}
	}, [updateisSuccess, updatemessage, dispatch, updateisError, id]);

	const handleOnChange = (input: any, value: any) => {
		setInputs((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};

	const handleSubmit = () => {
		const input = { inputs, id }
		// @ts-ignore
		dispatch(updateProject(input));
	}

	useEffect(() => {
		setInputs((prevState: any) => {
			return ({
				...prevState,
				name: title
			});
		});
	}, [id, setInputs, title]);

	return (
		<div>
			<Button className="add-button" onClick={() => setShow(true)}>Update</Button>
			<Modal
				size="lg"
				show={Show}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header>
					<span></span>
					<span className="span-center-title">Update Project </span>
					<Button
						style={{ color: "#fff" }}
						onClick={() => setShow(false)} >
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<div>
						<div className="Modal-Body">
							<div className="col">
								<div className="form-group">
									<InputField
										label="Name"
										name="Name"
										placeholder="Name"
										value={inputs.name}
										onChange={(e: any) => handleOnChange("name", e.target.value)}
									/>
								</div>
							</div>
							<div className="col">
								<div className="form-group">
									<InputField
										label="Description"
										name="Description"
										placeholder="Description"
										value={inputs.description}
										onChange={(e: any) => handleOnChange("description", e.target.value)}
									/>
								</div>
							</div>
							<div className="Modal-textarea-middle">
								<div className="col">
									<div className="form-group">
										<InputField
											type="number"
											label="Progress Percentage"
											name="Progress_percentage"
											placeholder="Progress percentage"
											max={100}
											value={inputs.progress_percentage}
											onChange={(e: any) => handleOnChange("progress_percentage", e.target.value)}
										/>
									</div>
								</div>
							</div>

							<div className="btn-modal-container">
								<Button
									variant="contained"
									className="Add-btn-modal"
									type="submit"
									onClick={handleSubmit}
								>
									{updateisLoading ? <Spinner animation="border" /> : "Create Team"}
								</Button>
							</div>
						</div>
					</div>

				</Modal.Body>
			</Modal>
		</div>
	)
}

export default UpdateProjectModal
