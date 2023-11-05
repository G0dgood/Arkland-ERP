import { Button } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../store/useStore'
import { fireAlert } from '../../utils/Alert'
import { approveRequest, reset } from '../../features/workerRequest/workerRequestSlice'
import { GrCheckmark } from 'react-icons/gr'
import { ModalHeader } from '../../components/Modals/ModalOptions'

const ApproveWorkerRequestModal = ({ id }: any) => {

	const dispatch = useAppDispatch();
	const { approveisLoading, approvemessage, approveisSuccess } = useAppSelector((state: any) => state.worker)
	const [Show, setLgShow] = useState(false);

	useEffect(() => {
		if (approveisSuccess) {
			setLgShow(false)
			fireAlert("Success", "Worker Request  successfully", "success");
			dispatch(reset());
		}
	}, [approveisSuccess, approvemessage, dispatch]);

	const handleComplete = () => {
		// @ts-ignore
		dispatch(approveRequest(id))
	}



	return (
		<div>

			<ul className="nav-tabs-btn mb-3">
				<li className={"active"} onClick={() => setLgShow(true)}>Approve Request</li>
			</ul>
			<Modal
				size="lg"
				show={Show}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<ModalHeader setLgShow={setLgShow} icon={<GrCheckmark size={30} />} title={"Approve Worker Request"} subtitle={"Approve Worker Request"} />
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
