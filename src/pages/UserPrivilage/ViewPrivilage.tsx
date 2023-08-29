import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import projectBack from "../../assets/vectors/project-back.svg";
import moment from 'moment';
import { viewPrevilage } from '../../features/Employee/employeeSlice';
import { RiLockPasswordLine } from 'react-icons/ri';
import DeletePrivileges from './DeletePrivileges';
import { SVGLoader } from '../../components/SVGLoader';



const ViewPrivilage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const { viewPrevilagedata, viewPrevilageisLoading } = useAppSelector((state: any) => state.employee)


	useEffect(() => {
		dispatch(viewPrevilage(id));
	}, [dispatch, id])





	return (
		<div>
			{viewPrevilageisLoading ? (
				<div className="isLoading-container-view" >
					<SVGLoader width={"60px"} height={"60px"} />
				</div>
			) : !viewPrevilagedata || viewPrevilagedata === undefined ? (
				<div className="table-loader-announcement">
					<div>
						{/* eslint-disable-next-line jsx-a11y/alt-text */}
						<RiLockPasswordLine size={80} />
						<p className="mt-3">No Privilege details</p>
					</div>
				</div>
			) : (
				<div>
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
									<DeletePrivileges name={viewPrevilagedata?.name} id={viewPrevilagedata?.id} />
								</div>
							</div>
							<h4 style={{ marginTop: "3rem" }}>
								Privilege  Details
							</h4>
							<h4 style={{ marginTop: "3rem" }}>
								Privilege
							</h4>
							<div className="viewPrevilageprofile-container" style={{ marginTop: "2rem" }} 	>
								<div>
									<div className="getjob-application-details">
										<p>User</p>
										<p style={{ cursor: "pointer", color: "blue", }}  >
											{viewPrevilagedata?.user?.full_name} </p>
										<p>Role</p>
										<p>{viewPrevilagedata?.role} </p>
										<p>Data Created</p>
										<p>{moment(viewPrevilagedata?.created_at).format("DD-MM-YYYY")} </p>
										<p>Status</p>
										<p>{viewPrevilagedata?.status} </p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>)}
		</div>
	);
}

export default ViewPrivilage
