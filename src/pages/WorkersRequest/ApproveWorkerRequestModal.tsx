import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { MdOutlineClose } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../../store/useStore'
import { fireAlert } from '../../utils/Alert'
import { approveRequest, reset } from '../../features/workerRequest/workerRequestSlice'

const ApproveWorkerRequestModal = ({ id }: any) => {

	const dispatch = useAppDispatch();
	const { approveisError, approveisLoading, approvemessage, approveisSuccess } = useAppSelector((state: any) => state.worker)
	const [Show, setShow] = useState(false);

	useEffect(() => {
		if (approveisError) {
			fireAlert("Worker Request approval  failed", approvemessage, "error");
			dispatch(reset());
		} else if (approveisSuccess) {
			setShow(false)
			fireAlert("Success", "Worker Request  successfully", "success");
			dispatch(reset());
		}
	}, [approveisSuccess, approvemessage, approveisError, dispatch]);

	const handleComplete = () => {
		// @ts-ignore
		dispatch(approveRequest(id))
	}



	return (
		<div>
			<Button className="Add-btn" onClick={() => setShow(true)}>Approve Request</Button>

			<Modal
				size="lg"
				show={Show}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header>
					<span></span>
					<span className="span-center-title">Approve Worker Request</span>
					<Button
						style={{ color: "#fff" }}
						onClick={() => setShow(false)} >
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<h5>Are you Sure?</h5>
					<h5>You want to Approve this Request?</h5>
					<h5 className="last-line">Ensure you've "Checked" before you hit "Approve"</h5>

					<div className='deleteKPIHandler'>
						<span className='deleteKPIHandler-mr'>
							<Button className="table-link-active">
								Close
							</Button>
						</span>
						<span >
							<Button className="table-link" onClick={handleComplete} >
								{approveisLoading ? <Spinner animation="border" /> : "Approve"}
							</Button>
						</span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default ApproveWorkerRequestModal
