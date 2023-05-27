import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { FiTrash2 } from 'react-icons/fi'
import { MdOutlineClose } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../../hooks/useDispatch'
import { fireAlert } from '../../utils/Alert'
import { deleteAnnouncement, reset } from '../../features/Announcement/announcemetSlice'

const DeleteAnnouncementModal = ({ id }: any) => {
	const dispatch = useAppDispatch();
	const [Show, setShow] = useState(false);
	const { deleteisError, deleteisLoading, deletemessage, deleteisSuccess } = useAppSelector((state: any) => state.announcement)




	const title = "Successful";
	const html = "Announcement Deleted Successfully!";
	const icon = "success";
	const title1 = "Announcement Deletion Failed";
	const html1 = deletemessage;
	const icon1 = "error";


	// useEffect(() => {
	// 	if (deleteisSuccess) {
	// 		fireAlert(title, html, icon);
	// 		setShow(false)
	// 		dispatch(reset());
	// 	} else if (deleteisError) {
	// 		fireAlert(title1, html1, icon1);
	// 		dispatch(reset());
	// 	}
	// }, [deleteisError, deleteisSuccess, dispatch, html, html1])

	const handleDelete = () => {
		// @ts-ignore
		dispatch(deleteAnnouncement(id));
	}

	return (
		<div>
			<FiTrash2
				size={25}
				onClick={() => setShow(true)}
				cursor="pointer"
				title="DELETE ANNOUNCEMENT"
			/>
			<Modal
				show={Show}
				onHide={() => setShow(false)}
				backdrop="static"
				keyboard={false}
				className="kpi-modal"
			>
				<Modal.Header>
					<span>{/*  */}</span>
					<span className="span-center-title">Delete Announcement</span>
					<Button style={{ color: "#fff" }} onClick={() => setShow(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<p>Are you Sure?</p>
					<p>This action cannot be reversed</p>
					<p className="last-line">Ensure you've "Checked" before you hit "Yes"</p>

					<div className='deleteKPIHandler'>
						<span className='deleteKPIHandler-mr'>
							<Button className="table-link-active" onClick={() => setShow(false)}>
								Close
							</Button>
						</span>
						<span >
							<Button className="table-link" onClick={handleDelete} >
								{deleteisLoading ? <Spinner animation="border" /> : "Yes"}
							</Button>
						</span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default DeleteAnnouncementModal
