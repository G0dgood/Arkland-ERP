import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { Button } from '@material-ui/core'
import { MdOutlineClose } from 'react-icons/md'
import { fireAlert } from '../../utils/Alert'
import { completeProject, reset } from '../../features/Project/projectSlice'
import { useAppDispatch, useAppSelector } from '../../store/useStore'

const CompleteProjectModal = ({ id, title }: any) => {
	const dispatch = useAppDispatch();
	const { completeisLoading, completemessage, completeisSuccess } = useAppSelector((state: any) => state.project)
	const [Show, setShow] = useState(false);

	useEffect(() => {
		if (completeisSuccess) {
			setShow(false)
			fireAlert("Success", "Project completed successfully", "success");
			dispatch(reset());
		}
	}, [completeisSuccess, completemessage, dispatch]);

	const handleComplete = () => {
		// @ts-ignore
		dispatch(completeProject(id))
	}


	return (
		<div>
			<Button className="add-button" onClick={() => setShow(true)}>Complete</Button>
			<Modal
				size="lg"
				show={Show}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header>
					<span></span>
					<span className="span-center-title">Complete Project</span>
					<Button
						style={{ color: "#fff" }}
						onClick={() => setShow(false)} >
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<h5>Are you Sure?</h5>
					<h5>You want to complete ({title}) project?</h5>
					<h5 className="last-line">Ensure you've "Checked" before you hit "Complete"</h5>

					<div className='deleteKPIHandler'>
						<span className='deleteKPIHandler-mr'>
							<Button className="table-link-active">
								Close
							</Button>
						</span>
						<span >
							<Button className="table-link" onClick={handleComplete} >
								{completeisLoading ? <Spinner animation="border" /> : "Complete"}
							</Button>
						</span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default CompleteProjectModal
