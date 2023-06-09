import { useEffect } from 'react'
import { BounceLoader } from 'react-spinners';
import { fireAlert } from '../../utils/Alert';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { reset, viewTeamLead } from '../../features/TeamLead/teamleadSlice';
import projectBack from "../../assets/vectors/project-back.svg";
import moment from 'moment';
import DeleteTeamLeadModal from './DeleteTeamLeadModal';
import { GiTeamIdea } from 'react-icons/gi';

const TeamLeadView = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();
	const { viewdata, viewisError, viewisLoading, viewmessage } = useAppSelector((state: any) => state.teamlead)


	useEffect(() => {
		if (viewisError) {
			fireAlert("TeamLead error", viewmessage, "error");
			dispatch(reset());
		}
	}, [viewisError, viewmessage, dispatch])


	useEffect(() => {
		// @ts-ignore
		dispatch(viewTeamLead(id));
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
							<GiTeamIdea size={80} />
							<p className="mt-3">No Tead Lead details</p>
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
										<DeleteTeamLeadModal name={viewdata?.name} id={viewdata?.id} />
									</div>
								</div>

								<h4 style={{ marginTop: "3rem" }}>
									Team Lead Details
								</h4>

								<div
									className="viewprofile-container"
									style={{ marginTop: "2rem" }}
								>
									<div>
										<div className="getjob-application-details">
											<p>Name</p>
											<p style={{ cursor: "pointer", color: "blue", }}  >
												{viewdata?.name}
											</p>
											<p>Data Created</p>
											<p> {moment(viewdata?.created_at).format("DD-MM-YYYY")} </p>

											<p>Status</p>
											<p> {viewdata?.status} </p>
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

export default TeamLeadView
