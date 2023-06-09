import moment from 'moment';
import React, { useEffect } from 'react'
import {
	BounceLoader
} from 'react-spinners';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { useNavigate, useParams } from 'react-router-dom';
import { fireAlert } from '../../utils/Alert';
import { reset, viewAnnouncement } from '../../features/Announcement/announcemetSlice';
import { TfiAnnouncement } from 'react-icons/tfi';
import projectBack from "../../assets/vectors/project-back.svg";
import DeleteAnnouncementsModal from './DeleteAnnouncementsModal';

const AnnouncementsView = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();
	const { viewdata, viewisError, viewisLoading, viewmessage } = useAppSelector((state: any) => state.announcement)


	useEffect(() => {
		if (viewisError) {
			fireAlert("Annoucement View error", viewmessage, "error");
			dispatch(reset());
		}
	}, [viewisError, viewmessage, dispatch])


	useEffect(() => {
		// @ts-ignore
		dispatch(viewAnnouncement(id));
	}, [dispatch, id]);




	return (
		<div>
			{
				viewisLoading ? (
					<div className="isLoading-container-view" >
						<BounceLoader
							color={"#990000"} loading={viewisLoading} />
					</div>
				) : !viewdata || viewdata === undefined ? (
					<div className="table-loader-announcement">
						<div>
							{/* eslint-disable-next-line jsx-a11y/alt-text */}
							<TfiAnnouncement size={80} />
							<p className="mt-3">No Announcement details</p>
						</div>
					</div>
				) : (
					<div  >

						<div className="EssentialsContainer">
							<div className="employee-main-div-col">
								<div className="employee-main-div-col-header">
									<div>
										<img
											src={projectBack}
											alt="User"
											className="project-back-img"
											onClick={() => navigate(-1)}
											title="Return"
										/>
									</div>
									<div className="employee-main-div-col-header-buttons">
										<DeleteAnnouncementsModal id={viewdata?.id} />
									</div>
								</div>

								<h4 style={{ marginTop: "3rem" }}>
									Announcement Details
								</h4>

								<div className="viewprofile-container"
									style={{ marginTop: "2rem" }} 	>
									<div>
										<div className="getjob-application-details">
											<p>Audience Scope</p>
											<p style={{ cursor: "pointer", color: "blue", }}  >
												{viewdata?.audience_scope}
											</p>
											<p>Data Created</p>
											<p> {moment(viewdata?.created_at).format("DD-MM-YYYY")} </p>

											<p>Status</p>
											<p> {viewdata?.status} </p>
											<p>Message</p>
											<p> {viewdata?.message} </p>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				)
			}
		</div>
	);
}
export default AnnouncementsView