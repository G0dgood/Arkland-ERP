import React, { useEffect } from 'react'
import { GiTeamIdea } from 'react-icons/gi';
import { useNavigate, useParams } from 'react-router-dom';
import { BounceLoader, SyncLoader } from 'react-spinners';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { fireAlert } from '../../utils/Alert';
import { reset, viewTask } from '../../features/Tasks/taskSlice';
import projectBack from "../../assets/vectors/project-back.svg";
import moment from 'moment';
import DeleteTaskModal from './DeleteTaskModal';
import UpdateTaskModal from './UpdateTaskModal';
import UpdateNoteModal from './UpdateNoteModal';

const TaskView = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();
	const { viewdata, viewisError, viewisLoading, viewmessage } = useAppSelector((state: any) => state.task)
	const { deleteisSuccess } = useAppSelector((state: any) => state.task)
	const { updateisSuccess } = useAppSelector((state: any) => state.task)
	const { noteisSuccess } = useAppSelector((state: any) => state.task)


	useEffect(() => {
		if (updateisSuccess) {
			// @ts-ignore
			dispatch(viewTask(id));
		}
	}, [dispatch, id, updateisSuccess])


	useEffect(() => {
		if (viewisError) {
			fireAlert("View Task error", viewmessage, "error");
			dispatch(reset());
		}
	}, [viewisError, viewmessage, dispatch])


	useEffect(() => {
		// @ts-ignore
		dispatch(viewTask(id));
		if (deleteisSuccess || noteisSuccess) {
			// @ts-ignore
			dispatch(viewTask(id));
		}
	}, [deleteisSuccess, dispatch, id, noteisSuccess]);




	return (
		<div>
			{
				viewisLoading ? (
					<div className="isLoading-container-view" >
						<BounceLoader color={"#990000"} loading={viewisLoading} />
					</div>
				) : !viewdata || viewdata === undefined ? (
					<div className="table-loader-announcement">
						<div>
							{/* eslint-disable-next-line jsx-a11y/alt-text */}
							<GiTeamIdea size={80} />
							<p className="mt-3">No Task details</p>
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
										<UpdateNoteModal name={viewdata?.name} id={viewdata?.id} />
										<UpdateTaskModal name={viewdata?.name} id={viewdata?.id} />
										<DeleteTaskModal name={viewdata?.name} id={viewdata?.id} />
									</div>
								</div>

								<h4 style={{ marginTop: "3rem" }}>
									Task  Details
								</h4>

								<div className="viewprofile-container" style={{ marginTop: "2rem" }} 	>
									<div>
										<div className="getjob-application-details">
											<p>Task title</p>
											<p style={{ cursor: "pointer", color: "blue", }}  >
												{viewdata?.title}
											</p>
											<p>Data Created</p>
											<p> {moment(viewdata?.created_at).format("DD-MM-YYYY")} </p>

											<p>Status</p>
											<p> {viewdata?.status} </p>
										</div>

									</div>
								</div>
								<h4 style={{ marginTop: "3rem" }}>
									ProJect
								</h4>
								<div className="viewprofile-container" style={{ marginTop: "2rem" }} 	>
									<div>
										<div className="getjob-application-details">
											<p>Project title</p>
											<p style={{ cursor: "pointer", color: "blue", }}  >
												{viewdata?.project?.name}
											</p>
											<p>State</p>
											<p>{viewdata?.project?.state} </p>
											<p>Location</p>
											<p>{viewdata?.project?.location} </p>
											<p>LGA</p>
											<p> {viewdata?.project?.lga}  </p>
											<p>Data Created</p>
											<p>{moment(viewdata?.created_at).format("DD-MM-YYYY")} </p>
											<p>points</p>
											<p> {viewdata?.points} </p>
											<p>Status</p>
											<p> {viewdata?.priority} </p>
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

export default TaskView