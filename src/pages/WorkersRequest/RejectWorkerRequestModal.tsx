
import { Button } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { MdOutlineClose } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../../store/useStore'
import { fireAlert } from '../../utils/Alert'
import { rejectRequest, reset } from '../../features/workerRequest/workerRequestSlice'
import { useNavigate } from 'react-router-dom'

const RejectWorkerRequestModal = ({ id }: any) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { rejectisError, rejectisLoading, rejectmessage, rejectisSuccess } = useAppSelector((state: any) => state.worker)

	const [Show, setShow] = useState(false);


	useEffect(() => {
		if (rejectisError) {
			fireAlert("Worker Request rejection  failed", rejectmessage, "error");
			dispatch(reset());
		} else if (rejectisSuccess) {
			navigate(-1)
			setShow(false)
			fireAlert("Success", "Worker reject  successfully", "success");
			dispatch(reset());
		}
	}, [rejectisSuccess, rejectmessage, rejectisError, dispatch, navigate]);


	const handleReject = () => {
		// @ts-ignore 
		dispatch(rejectRequest(id))
	}



	return (
		<div>
			<Button className="Add-btn" onClick={() => setShow(true)}>Reject Request</Button>

			<Modal
				size="lg"
				show={Show}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header>
					<span></span>
					<span className="span-center-title">Reject Worker Request</span>
					<Button
						style={{ color: "#fff" }}
						onClick={() => setShow(false)} >
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<h5>Are you Sure?</h5>
					<h5>You want to Reject this Request?</h5>
					<h5 className="last-line">Ensure you've "Checked" before you hit "Reject"</h5>

					<div className='deleteKPIHandler'>
						<span className='deleteKPIHandler-mr'>
						</span>
						<span >
							<Button className="table-link" onClick={handleReject} >
								{rejectisLoading ? <Spinner animation="border" /> : "Reject"}
							</Button>
						</span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default RejectWorkerRequestModal
