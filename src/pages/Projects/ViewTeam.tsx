import { useEffect, useState } from 'react'
import projectBack from "../../assets/vectors/project-back.svg";
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/useStore'
import { getTeammembers, viewTeam } from '../../features/Team/teamSlice';
import { RiTeamLine } from 'react-icons/ri';
import moment from 'moment';
import DeleteTeam from '../Team/DeleteTeam';
import CreateTeamMembers from '../Team/CreateTeamMembersModal';
import TeamMembers from '../Team/TeamMembers';
import { Button } from '@material-ui/core';
import RemoveTeamMember from '../Team/RemoveTeamMember';
import { SVGLoader } from '../../components/SVGLoader';

const ViewTeam = () => {
	const { id } = useParams()
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { viewdata, viewisLoading } = useAppSelector((state: any) => state.team)
	const { memberdata, memberisLoading } = useAppSelector((state: any) => state.team)

	useEffect(() => {
		// @ts-ignore
		dispatch(viewTeam(id));
	}, [dispatch, id]);


	const [show, setShow] = useState(false)

	const handleClick = () => {
		setShow(!show)
		if (show === false) {
			// @ts-ignore
			dispatch(getTeammembers(id));
		}

	}

	return (
		<div>
			{
				viewisLoading ? (
					<div className="isLoading-container-view" >
						<SVGLoader width={"60px"} height={"60px"} />
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
										<span><CreateTeamMembers id={id} /></span>
										<span><RemoveTeamMember id={id} /></span>
										<DeleteTeam id={id} />
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
											<p
												style={{ cursor: "pointer", color: "blue", }}  >
												{viewdata?.name}
											</p>
											<p>Description</p>
											<p>{viewdata?.description} </p>

											<p>Status</p>
											<p>{viewdata?.status} </p>

											<p>Date Created</p>
											<p>{moment(viewdata?.updated_at).format("DD-MM-YYYY")}</p>
											<p>Click To View Team Member</p>
											<p>
												<Button
													className={"table-link"}
													onClick={handleClick}>
													View Team Members
												</Button>
											</p>
										</div>
									</div>
								</div>
								{memberisLoading ? (
									<div className="team-container-view" >
										<SVGLoader width={"60px"} height={"60px"} />
									</div>
								) : show && memberdata?.length === 0 ? (
									<div className="team-container-view">
										<div>
											<RiTeamLine size={80} color="grey" className="loader-image" />
											<p className="mt-3">No team members</p>
										</div>
									</div>
								) : (
									show ? <TeamMembers memberdata={memberdata} /> : ""


								)}

							</div>
						</div>

					</div>
				)
			}
		</div>
	)
}

export default ViewTeam