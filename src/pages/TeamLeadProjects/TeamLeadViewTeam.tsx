import { useEffect, useState } from 'react'
import projectBack from "../../assets/vectors/project-back.svg";
import { useNavigate, useParams } from 'react-router-dom'
import { RiTeamLine } from 'react-icons/ri';
import moment from 'moment';
import { Button } from '@material-ui/core';
import HttpService from '../../components/HttpService';
import TeamLeadTeamMembers from './TeamLeadTeamMembers';
import { SVGLoader } from '../../components/SVGLoader';
import createHttpService from '../../components/HttpService';

const TeamLeadViewTeam = () => {
	const { id } = useParams()
	const navigate = useNavigate();


	const [viewdata, setViewdata] = useState<any>([])
	const [viewisLoading, setViewisLoading] = useState<any>([])
	useEffect(() => {
		getData()
	}, [])


	const getData = async () => {
		const HttpService = createHttpService();
		setViewisLoading(true)
		try {
			const teamViewUrl = `teams/${id}/view`
			const teamView: any = await HttpService.get(teamViewUrl)
			setViewdata(teamView?.data?.data)
			setViewisLoading(false)

		} catch (error) {
			setViewisLoading(false)
		}
	}

	const [memberdata, setMemberdata] = useState<any>([])
	const [memberisLoading, setMemberisLoading] = useState(false)



	const getDataMembers = async () => {
		const HttpService = createHttpService();
		setMemberisLoading(true)
		try {
			const teamViewUrl = `teams/${id}/members`
			const teamView: any = await HttpService.get(teamViewUrl)
			setMemberdata(teamView?.data?.data)
			setMemberisLoading(false)

		} catch (error) {
			setMemberisLoading(false)
		}
	}


	const [show, setShow] = useState(false)

	const handleClick = () => {
		setShow(!show)
		if (show === false) {
			// @ts-ignore
			getDataMembers()
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
									show ? <TeamLeadTeamMembers memberdata={memberdata} /> : ""


								)}

							</div>
						</div>

					</div>
				)
			}
		</div>
	)
}

export default TeamLeadViewTeam