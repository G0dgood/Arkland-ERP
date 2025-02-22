import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { FiTrash2 } from 'react-icons/fi'
import { fireAlert } from '../../utils/Alert'
import { deleteAnnouncement, reset } from '../../features/Announcement/announcemetSlice'
import { useAppDispatch, useAppSelector } from '../../store/useStore'
import { ModalHeader } from './ModalOptions'
import { TfiAnnouncement } from 'react-icons/tfi'

const DeleteAnnouncementModal = ({ id }: any) => {
	const dispatch = useAppDispatch();
	const [Show, setLgShow] = useState(false);
	const { deleteisLoading, deleteisSuccess } = useAppSelector((state: any) => state.announcement)




	const title = "Successful";
	const html = "Announcement Deleted Successfully!";
	const icon = "success";


	useEffect(() => {
		if (deleteisSuccess) {
			fireAlert(title, html, icon);
			setLgShow(false)
			dispatch(reset());
			// @ts-ignore
			dispatch(deleteAnnouncement(id));
		}
	}, [deleteisSuccess, dispatch, html, id])

	const handleDelete = () => {
		// @ts-ignore
		dispatch(deleteAnnouncement(id));
	}

	return (
		<div>
			<FiTrash2
				size={25}
				onClick={() => setLgShow(true)}
				cursor="pointer"
				title="DELETE ANNOUNCEMENT"
			/>
			<Modal
				show={Show}
				onHide={() => setLgShow(false)}
				backdrop="static"
				keyboard={false}
				className="kpi-modal"
			>
				<ModalHeader setLgShow={setLgShow} icon={<TfiAnnouncement size={30} />} title={"Delete Announcement"} subtitle={"Delete Announcement Below"} />

				<Modal.Body>
					<p>Are you Sure?</p>
					<p>This action cannot be reversed</p>
					<p className="last-line">Ensure you've "Checked" before you hit "Yes"</p>

					<div className='deleteKPIHandler'>
						<span className='deleteKPIHandler-mr'>
							<Button className="table-link-active" onClick={() => setLgShow(false)}>
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
