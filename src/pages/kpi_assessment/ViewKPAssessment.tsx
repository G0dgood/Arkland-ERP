import React, { useEffect, useState } from 'react'
import { BiUser } from 'react-icons/bi'
import { Link, useParams } from 'react-router-dom'
import HodEvaluation from './HodEvaluate'
// import axios, { AxiosResponse } from 'axios'
import { BsChatLeftText } from 'react-icons/bs'
import { MdOutlineClose } from 'react-icons/md'
import TableLoader from '../../components/TableLoader'
import { Button } from '@material-ui/core'
import { fireAlert } from '../../utils/Alert'
import Cookies from 'js-cookie'

const ViewKPAssessment = () => {

	const { id } = useParams()
	const token = Cookies.get("token");

	const [hodscore, setHodscore] = useState<number>(0);
	const [broughtDownAverage, setBroughtDownAverage] = useState<any>(0);


	const gradeSystem = [
		{ rate: 5, definition: "Outstanding" },
		{ rate: 4, definition: "Very Good" },
		{ rate: 3, definition: "Good" },
		{ rate: 2, definition: "Average" },
		{ rate: 1, definition: "Below Average/Poor" },
	]


	const [data, setData] = useState<any>([]);
	const [isError, setisError] = useState(false)
	const [message, setMessage] = useState("");
	const [isLoading, setisLoading] = useState(false);


	// const title = "Successful";
	// const html = "KPI Updated!";
	// const icon = "success";
	const title1 = "KPI error";
	const html1 = message;
	const icon1 = "error";

	useEffect(() => {
		if (isError) {
			fireAlert(title1, html1, icon1);
			setTimeout(() => {
				setisError(false)
			}, 10000);
		}
	}, [isError, html1]);

	React.useEffect(() => {
		setisLoading(true);
		fetch(`${process.env.REACT_APP_API}/hr/appraisals/${id}`, {
			method: "GET", // or 'PUT'
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data?.success === false) {
					setMessage(data?.message)
					setisError(true)
				} else {
					setData(data?.data)
				}
				setisLoading(false);
			})
			.catch((error) => {
				console.error("Error:", error);
				setisLoading(false);
			});
	}, [id, token]);


	// React.useEffect(() => {
	// 	setisLoading(true);
	// 	axios
	// 		.get(`${process.env.REACT_APP_API}/hr/appraisals/${id}`)
	// 		.then((res: AxiosResponse) => {
	// 			setData(res?.data?.data);
	// 			setisLoading(false);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 			setisLoading(false);
	// 		});
	// }, [id]);



	React.useEffect(() => {
		const finalscore: any = (data?.performance_percentage_employee + hodscore) / (hodscore === 0 ? 0 : 2)
		setBroughtDownAverage(finalscore)
	}, [data?.performance_percentage_employee, hodscore]);



	return (
		<div>
			<header className="ChatProgressView-header"  >
				<div>
					<span className="app-chat--icon">
						<BsChatLeftText />
					</span>
					<span> HOD Evaluations | Update Performance </span>
					<Button className={data?.status === 'active' ? "table-link-active" : "table-link"}>
						{data?.status === 'active' ? 'Completed' : data?.status}</Button>
				</div>
				<div className="ChatProgressView-close">
					<Link
						to={"/teamkpi"}>
						<MdOutlineClose
							size={25}
							style={{ color: "white", backgroundColor: "" }}
							className="ChatProgressView-close-icon"
						/>
					</Link>
				</div>
			</header>
			<div id="performance">

				<section className="area-grid">
					<div className="evaluation-area">
						<div id="edit-user">
							<div className="user-info">
								<BiUser size={80} />
								<div>
									<h3>{data?.employee_name}</h3>
									{/* <p>john.adibe@outcess.com</p> */}
									<p>ALS/ADM/{data?.employee_id}</p>
								</div>
							</div>
						</div>
						{isLoading ? <TableLoader isLoading={isLoading} /> : ""}
						<HodEvaluation data={data} setHodscore={setHodscore} hodscore={hodscore} id={id} />
					</div>
					<div className="info-area">
						{/* @ts-ignore */}
						<div className="grade-system">
							<h4>Grading System</h4>
							{gradeSystem.map(item =>
								<div key={item?.rate} className="grade_item">
									<p>{item?.rate}</p>
									<p>{item?.definition}</p>
								</div>
							)}
						</div>

						{data?.status === 'active' ? <div className="kpi-summary">
							<div className="kpi-summary-title">
								<p>KPI Summary</p></div>
							<div className="kpi-summary-body final-rating-summary">
								<p>{data?.employee_name}</p> <p>{data?.performance_percentage_employee}%</p>
								<p>HOD Score</p>
								<p id="avg-rating">{data?.performance_percentage_reviewer}{data?.performance_percentage_reviewer === undefined ? '' : '%'}</p>
								<p>Average Score</p>
								<p id="avg-rating">{data?.total_performance_percentage}{data?.total_performance_percentage === undefined ? '' : '%'}</p>
							</div>
						</div> : <div className="kpi-summary">
							<div className="kpi-summary-title">
								<p>KPI Summary</p></div>
							<div className="kpi-summary-body final-rating-summary">
								<p>{data?.employee_name}</p><p>{data?.performance_percentage_employee}%</p>
								<p>HOD Score</p>
								<p id="hod-avg-rating">{hodscore === undefined ? "0" : hodscore}</p>
								<p>Brought Down Average</p>
								<p id="final-avg">{!broughtDownAverage || broughtDownAverage ===
									Infinity ? "0" : broughtDownAverage}%</p>
							</div>
						</div>}
						{data?.status === 'active' ? <div>
							<div className="kpi-summary">
								<div className="kpi-summary-title">
									<p>MY comment</p>
								</div>
								{/* @ts-ignore */}
								<textarea rows="4" placeholder="Add an extended comment" required className='m-t-5' value={data?.employee_comment} />
							</div>
							<div className="kpi-summary">
								<div className="kpi-summary-title">
									<p>HOD comment</p>
								</div>
								{/* @ts-ignore */}
								<textarea rows="4" placeholder="Add an extended comment" required className='m-t-5' value={data?.reviewer_comment} />
							</div>
						</div> :
							<div>
								<p className="hod-comment review">{data?.employee_name}'s Comment</p>
								{/* @ts-ignore */}
								<textarea class="inputField" rows="3" disabled="true" value={data?.employee_comment}></textarea>
							</div>}


					</div>
				</section>
			</div>
		</div>
	)
}

export default ViewKPAssessment
