import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import moment from 'moment';
import { FiEye } from 'react-icons/fi';
import { viewMeAnnouncement } from '../../features/Announcement/announcemetSlice';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { SVGLoader } from '../SVGLoader';
import { ModalHeader } from './ModalOptions';
import { BsViewList } from 'react-icons/bs';


const ViewAnnouncementModal = ({ id }: any) => {
	const dispatch = useAppDispatch();
	const { medata, meisLoading } = useAppSelector((state: any) => state.announcement)
	const [viewShow, setLgShow] = useState(false);

	const handleClick = (id: any) => {
		// @ts-ignore
		dispatch(viewMeAnnouncement(id));
	}

	return (
		<div>
			<FiEye
				style={{ marginRight: "10px" }}
				size={20}
				onClick={() => { setLgShow(true); handleClick(id) }}
				cursor="pointer"
				title="VIEW ANNOUNCEMENT"
				color='#gray'
			/>
			<Modal
				size="lg"
				show={viewShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered  >

				<ModalHeader setLgShow={setLgShow} icon={<BsViewList size={30} />} title={"View Announcement"} subtitle={"		View Announcement List"} />
				<Modal.Body>
					{meisLoading ? (
						<div className="table-loader-announcement1">
							<SVGLoader width={"40px"} height={"40px"} />
						</div>
					) : (
						<div className="getjob-application-details">
							<p>MESSAGE</p>
							<p>{medata?.message}</p>
							<p>AUDIENCE</p>
							<p>{medata?.audience_scope}</p>
							<p>STATUS</p>
							<p>{medata?.status}</p>
							<p>DATE OF CREATION</p>
							<p>
								{moment(medata?.created_at).format("DD-MMMM-YYYY")}
							</p>
						</div>
					)}
				</Modal.Body>
			</Modal>


		</div>
	)
}

export default ViewAnnouncementModal


