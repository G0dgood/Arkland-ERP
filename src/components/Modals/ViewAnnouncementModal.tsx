import { Button } from '@material-ui/core';
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { MdOutlineClose } from 'react-icons/md'
import { BounceLoader, } from 'react-spinners';
import moment from 'moment';
import { FiEye } from 'react-icons/fi';
import { viewMeAnnouncement } from '../../features/Announcement/announcemetSlice';
import { useAppDispatch, useAppSelector } from '../../store/useStore';

const ViewAnnouncementModal = ({ id }: any) => {
	const dispatch = useAppDispatch();
	const { medata, meisLoading } = useAppSelector((state: any) => state.announcement)
	const [viewShow, setViewShow] = useState(false);

	const handleClick = (id: any) => {
		// @ts-ignore
		dispatch(viewMeAnnouncement(id));
	}

	return (
		<div>
			<FiEye
				style={{ marginRight: "10px" }}
				size={20}
				// @ts-ignore 
				onClick={() => { setViewShow(true); handleClick(id) }}
				cursor="pointer"
				title="VIEW ANNOUNCEMENT"
			/>
			<Modal
				size="lg"
				show={viewShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered  >
				<Modal.Header>
					<span></span>
					<span className="span-center-title">View Announcement</span>
					<Button style={{ color: "#fff" }} onClick={() => setViewShow(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					{meisLoading ? (
						<div className="table-loader-announcement1">
							<BounceLoader
								color={"#990000"}
								loading={meisLoading}
							/>
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


