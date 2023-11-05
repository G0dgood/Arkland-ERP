import moment from 'moment';
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { useNavigate, useParams } from 'react-router-dom';
import { TfiAnnouncement } from 'react-icons/tfi';
import projectBack from "../../assets/vectors/project-back.svg";
import DeleteAnnouncementsModal from './DeleteAnnouncementsModal';
import { viewAnnouncement } from '../../features/Announcement/announcemetSlice';
import { SVGLoader } from '../../components/SVGLoader';


const AnnouncementsView = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const { viewdata, viewisLoading } = useAppSelector((state: any) => state.announcement)

	useEffect(() => {
		// @ts-ignore
		dispatch(viewAnnouncement(id));
	}, [dispatch, id]);






	return (
		<div>
			{
				viewisLoading ? (
					<div className="isLoading-container-view" >
						<SVGLoader width={"60px"} height={"60px"} />
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