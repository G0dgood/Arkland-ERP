import React, { useEffect, useState } from 'react'
import { InputField } from '../../components/TableOptions'
import { Modal, Spinner } from 'react-bootstrap'
import { Button } from '@material-ui/core'
import { MdOutlineClose } from 'react-icons/md'
import { fireAlert } from '../../utils/Alert'
import { reset, suspendProject } from '../../features/Project/projectSlice'
import { useAppDispatch, useAppSelector } from '../../store/useStore'




const SuspendProjectModal = ({ id, title }: any) => {
	const dispatch = useAppDispatch();
	const { suspendisError, suspendisLoading, suspendmessage, suspendisSuccess } = useAppSelector((state: any) => state.project)
	const [Show, setShow] = useState(false);
	const [inputs, setInputs] = useState<any>({
		status: "",
	})

	useEffect(() => {
		if (suspendisError) {
			fireAlert("Project suspend  failed", suspendmessage, "error");
			dispatch(reset());
		} else if (suspendisSuccess) {
			setShow(false)
			fireAlert("Success", "Project suspended successfully", "success");
			dispatch(reset());
		}
	}, [suspendisSuccess, suspendmessage, suspendisError, dispatch]);

	const handleOnChange = (input: any, value: any) => {
		setInputs((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};

	const handleSubmit = () => {
		const input = { inputs, id }
		// @ts-ignore
		dispatch(suspendProject(input))
	}

	return (
		<div>
			<Button className="add-button" onClick={() => setShow(true)}>Suspend</Button>
			<Modal
				size="lg"
				show={Show}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header>
					<span></span>
					<span className="span-center-title">Suspend {title} Project</span>
					<Button
						style={{ color: "#fff" }}
						onClick={() => setShow(false)} >
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<div>
						<div className="Modal-Body">
							<div className="Modal-textarea-middle">
								<div className="col">
									<div className="form-group">
										<InputField
											type="text"
											label="Status"
											name="status"
											placeholder="Status"
											onChange={(e: any) => handleOnChange("status", e.target.value)}
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
									{suspendisLoading ? <Spinner animation="border" /> : "Suspend"}
								</Button>
							</div>
						</div>
					</div>

				</Modal.Body>
			</Modal>
		</div>
	)
}

export default SuspendProjectModal

