
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import projectBack from "../../../assets/vectors/project-back.svg";
import RespondToWarning from "../all_employees/warnings/RespondToWarning";
import { useEffect, useState } from "react";
import HttpService from "../../components/HttpService";



const ViewWarning = () => {

	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();



	const [viewwarningdata, setData] = useState<any>([])
	const [viewwarningisLoading, setisLoading] = useState(false)

	console.log('warningdata', viewwarningdata)


	useEffect(() => {
		getData()
	}, [])
	const getData = async () => {
		setisLoading(true)
		try {
			const warningsUrl = "me/warnings"
			const warnings: any = await HttpService.get(warningsUrl)
			setData(warnings?.data?.data)
			setisLoading(false)

		} catch (error) {
			setisLoading(false)
		}
	}


	return (
		<div  >
			{viewwarningisLoading ? (
				<div className="isLoading-container-view" >
					<BounceLoader
						color={"#990000"}
						loading={viewwarningisLoading}
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
									onClick={() => navigate("/warning")}
									title="Return"
								/>
							</div>

							<div className="employee-main-div-col-header-buttons">
								<RespondToWarning id={id} />
							</div>

						</div>

						<h4 style={{ marginTop: "3rem" }}>Review Warning</h4>

						<div className="viewprofile-container">
							<div>
								<div className="getjob-application-details">
									<p>Employee</p>
									<p
										onClick={() =>
											navigate(`/employees/employees/${viewwarningdata?.employee?._id}`)
										}
										style={{
											cursor: "pointer",
											color: "blue",
										}}
									>
										{viewwarningdata?.employee?.full_name}
									</p>
									<p>Misconduct</p>
									<p>{viewwarningdata?.misconduct}</p>

									<p>Message</p>
									<p>{viewwarningdata?.message} </p>

									{viewwarningdata?.as_response ? (
										<>
											<p>Response</p>
											<p> {viewwarningdata?.response}</p>
										</>
									) : (
										""
									)}

									<p>Count</p>
									<p>{viewwarningdata?.count}</p>
									<p>Status</p>
									<p> {viewwarningdata?.status} </p>
									<p>Created by</p>
									<p>{viewwarningdata?.created_by?.full_name}</p>
									<p>Created at</p>
									<p>
										{moment(viewwarningdata?.created_at).format("DD-MM-YYYY")}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ViewWarning;
