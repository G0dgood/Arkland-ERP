import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { BounceLoader } from 'react-spinners';
import { useNavigate, useParams } from 'react-router-dom';
import projectBack from "../../assets/vectors/project-back.svg";
import moment from 'moment';
import { viewRole } from '../../features/Employee/employeeSlice';
import DeleteModals from '../../components/DeleteModals';
import CreateRoleModal from '../../components/Modals/CreateRoleModal';


const ViewRole = () => {
	const dispatch = useAppDispatch();
	const { viewroledata, viewroleisLoading }: any = useAppSelector((state: any) => state.employee)


	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		// @ts-ignore
		dispatch(viewRole(id));
	}, [dispatch, id]);


	return (
		<div  >
			{viewroleisLoading ? (
				<div className="isLoading-container-view" >
					<BounceLoader
						color={"#990000"}
						loading={viewroleisLoading}
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
								<CreateRoleModal id={id} viewroledata={viewroledata} />
								<DeleteModals id={id} />
							</div>
						</div>

						<h4 style={{ marginTop: "3rem" }}>
							Employee Role
						</h4>

						<div
							className="viewprofile-container"
							style={{ marginTop: "2rem" }}
						>
							<div>
								<div className="getjob-application-details">
									<p>Name</p>
									<p style={{ cursor: "pointer", color: "blue" }} >
										{viewroledata?.name}
									</p>
									<p>Description</p>
									<p style={{ cursor: "pointer", color: "blue" }} >
										{viewroledata?.description}
									</p>
									<p>Date Created</p>
									<p> {moment(viewroledata?.created_at).format("DD-MM-YYYY")} </p>

									<p>Status</p>
									<p> {viewroledata?.status} </p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default ViewRole