import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { BounceLoader } from 'react-spinners';
import { useNavigate, useParams } from 'react-router-dom';
import projectBack from "../../assets/vectors/project-back.svg";
import { viewHOD } from '../../features/HOD/hodSlice';
import moment from 'moment';
import DeleteHOD from './DeleteHOD';

const ViewHOD = () => {
	const dispatch = useAppDispatch();
	const { viewdata, viewisLoading }: any = useAppSelector((state: any) => state.hod)


	console.log('viewdata', viewdata)

	const navigate = useNavigate();
	const { id } = useParams<{ id: any }>();

	useEffect(() => {
		// @ts-ignore
		dispatch(viewHOD(id));
	}, [dispatch, id]);


	return (
		<div  >
			{viewisLoading ? (
				<div className="isLoading-container-view" >
					<BounceLoader
						color={"#990000"}
						loading={viewisLoading}
					/>
				</div>
			) : (
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
								<DeleteHOD id={id} />
							</div>
						</div>

						<h4 style={{ marginTop: "3rem" }}>
							HOD Preview
						</h4>

						<div
							className="viewprofile-container"
							style={{ marginTop: "2rem" }}
						>
							<div>
								<div className="getjob-application-details">
									<p>Name</p>
									<p style={{ cursor: "pointer", color: "blue" }} >
										{viewdata?.name}
									</p>
									<p>Date Created</p>
									<p> {moment(viewdata?.created_at).format("DD-MM-YYYY")} </p>

									<p>Status</p>
									<p> {viewdata?.status} </p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default ViewHOD