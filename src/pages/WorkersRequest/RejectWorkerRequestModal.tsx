
import { Button } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../store/useStore'
import { fireAlert } from '../../utils/Alert'
import { rejectRequest, reset } from '../../features/workerRequest/workerRequestSlice'
import { useNavigate } from 'react-router-dom'
import { ModalHeader } from '../../components/Modals/ModalOptions'
import { GrEject } from 'react-icons/gr'

const RejectWorkerRequestModal = ({ id }: any) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { rejectisLoading, rejectmessage, rejectisSuccess } = useAppSelector((state: any) => state.worker)

	const [Show, setLgShow] = useState(false);


	useEffect(() => {
		if (rejectisSuccess) {
			navigate(-1)
			setLgShow(false)
			fireAlert("Success", "Worker reject  successfully", "success");
			dispatch(reset());
		}
	}, [rejectisSuccess, rejectmessage, dispatch, navigate]);


	const handleReject = () => {
		// @ts-ignore 
		dispatch(rejectRequest(id))
	}



	return (
		<div>
			<ul className="nav-tabs-btn mb-3">
				<li className={"active"} onClick={() => setLgShow(true)}>Reject Request</li>
			</ul>
			<Modal
				size="lg"
				show={Show}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>

				<ModalHeader setLgShow={setLgShow} icon={<GrEject size={30} />} title={">Reject Worker Request"} subtitle={">Reject Worker Request"} />
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
