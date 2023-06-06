import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { MdOutlineClose } from 'react-icons/md'
import { BounceLoader, SyncLoader } from 'react-spinners';
import moment from 'moment';
import { FiEye } from 'react-icons/fi';
import { viewAnnouncement } from '../../features/Announcement/announcemetSlice';
import { useAppDispatch, useAppSelector } from '../../store/useStore';

const ViewAnnouncementModal = ({ id }: any) => {
	const dispatch = useAppDispatch();
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { viewdata, viewisLoading } = useAppSelector((state: any) => state.announcement)
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [viewShow, setViewShow] = useState(false);








	const handleClick = (id: any) => {
		// @ts-ignore
		dispatch(viewAnnouncement(id));

	}

	return (

		<div>
			<FiEye
				style={{ marginRight: "10px" }}
				size={25}
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
					{viewisLoading ? (
						<div className="table-loader-announcement1">
							<BounceLoader
								color={"#990000"}
								loading={viewisLoading}
							/>
						</div>
					) : (
						<div className="getjob-application-details">
							<p>MESSAGE</p>
							<p>{viewdata?.message}</p>
							<p>AUDIENCE</p>
							<p>{viewdata?.audience_scope}</p>
							<p>STATUS</p>
							<p>{viewdata?.status}</p>
							<p>DATE OF CREATION</p>
							<p>
								{moment(viewdata?.created_at).format("DD-MMMM-YYYY")}
							</p>
						</div>
					)}
				</Modal.Body>
				<Modal.Footer>
				</Modal.Footer>
			</Modal>


		</div>
	)
}

export default ViewAnnouncementModal


