import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap';
import { MdOutlineClose } from 'react-icons/md';
import { fireAlert } from '../../utils/Alert';
import { deleteAnnouncement, reset } from '../../features/Announcement/announcemetSlice';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { useNavigate } from 'react-router-dom';

const DeleteAnnouncementsModal = ({ id }: any) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [deleteShow, setDeleteShow] = useState(false);
	const { deleteisError, deleteisLoading, deletemessage, deleteisSuccess } = useAppSelector((state: any) => state.announcement)



	useEffect(() => {
		if (deleteisSuccess) {
			fireAlert("Successful", "Announcement Deleted Successfully", "success");
			setDeleteShow(false)
			navigate(-1)
			dispatch(reset());
		} else if (deleteisError) {
			fireAlert("Announcement Deletion error", deletemessage, "error");
			dispatch(reset());
		}
	}, [deleteisError, deleteisSuccess, deletemessage, dispatch, navigate])

	const handleDeletion = () => {
		// @ts-ignore
		dispatch(deleteAnnouncement(id));
	}

	return (
		<div>
			<Button
				variant="contained"
				className="Add-btn"
				onClick={() => setDeleteShow(true)}
			>
				Delete Announcement
			</Button>
			<Modal
				size="lg"
				show={deleteShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header  >
					<span>{/*  */}</span>
					<span className="span-center-title">Delete Tead Lead</span>
					<Button style={{ color: "#fff" }} onClick={() => setDeleteShow(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<h5 className="last-line m-5">Are you sure you want to delete this Announcement ?</h5>
					<div className='deleteKPIHandler'>
						<span className='deleteKPIHandler-mr'>
							<Button className="table-link-active" onClick={() => setDeleteShow(false)}>
								Close
							</Button>
						</span>
						<span >
							<Button className="table-link" onClick={handleDeletion} >
								{deleteisLoading ? <Spinner animation="border" /> : "Yes"}
							</Button>
						</span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default DeleteAnnouncementsModal
