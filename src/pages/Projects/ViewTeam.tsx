import { useEffect } from 'react'
import projectBack from "../../assets/vectors/project-back.svg";
import { useNavigate, useParams } from 'react-router-dom'
import { BounceLoader, SyncLoader } from 'react-spinners'
import { useAppDispatch, useAppSelector } from '../../store/useStore'
import { viewTeam } from '../../features/Team/teamSlice';
import { RiTeamLine } from 'react-icons/ri';
import moment from 'moment';
import DeleteTeam from '../Team/DeleteTeam';
import CreateTeamMembers from '../Team/CreateTeamMembersModal';

const ViewTeam = () => {
	const { id } = useParams()
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { viewdata, viewisLoading } = useAppSelector((state: any) => state.team)
	const { membersdata, membersisLoading } = useAppSelector((state: any) => state.team)




	useEffect(() => {
		// @ts-ignore
		dispatch(viewTeam(id));
	}, [dispatch, id]);




	return (
		<div>
			<div>
				{
					viewisLoading ? (
						<div className="isLoading-container-view" >
							<BounceLoader
								color={"#990000"} loading={viewisLoading} />
						</div>
					) : !viewdata || viewdata === undefined ? (
						<div className="table-loader-image">
							<div>
								<RiTeamLine size={80} color="grey" className="loader-image" />
								<p className="mt-3">No team details</p>
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
											<DeleteTeam id={id} /> <span><CreateTeamMembers id={id} /></span>
										</div>


									</div>

									<h4 style={{ marginTop: "3rem" }}>
										Team Details
									</h4>

									<div
										className="viewprofile-container"
										style={{ marginTop: "2rem" }}
									>
										<div>
											<div className="getjob-application-details">
												<p>Employee</p>
												<p onClick={() => navigate(`/employees/${viewdata?.employee?.id}`)}
													style={{ cursor: "pointer", color: "blue", }}  >
													{viewdata?.name}
												</p>
												<p>Description</p>
												<p>{viewdata?.description} </p>

												<p>Status</p>
												<p>{viewdata?.status} </p>

												<p>Date Created</p>
												<p>{moment(viewdata?.updated_at).format("DD-MM-YYYY")}</p>
											</div>
										</div>
									</div>
									{membersisLoading ? (
										<div className="isLoading-container-view" >
											<SyncLoader color={"#990000"} loading={true} />
										</div>
									) : !membersdata || membersdata === undefined ? (
										<div className="table-loader-image">
											<div>
												<RiTeamLine size={80} color="grey" className="loader-image" />
												<p className="mt-3">No team members</p>
											</div>
										</div>
									) : (
										// <TeamMembers />
										""
									)}

								</div>
							</div>

						</div>
					)
				}
			</div>
		</div>
	)
}

export default ViewTeam