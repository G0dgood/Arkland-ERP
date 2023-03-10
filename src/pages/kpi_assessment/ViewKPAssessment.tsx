import React, { useState } from 'react'
import { BiUser } from 'react-icons/bi'
import { Link, useParams } from 'react-router-dom'
import HodEvaluation from './HodEvaluate'
import axios, { AxiosResponse } from 'axios'
import { BsChatLeftText } from 'react-icons/bs'
import { MdOutlineClose } from 'react-icons/md'
import { SkeletonLoader } from '../../components/SkeletonLoader'

const ViewKPAssessment = () => {

	const { id } = useParams()

	const [fullscreen, setFullscreen] = useState(true);
	const [show, setShow] = useState(false);

	const handleShow = () => {
		setShow(true);
	}

	const gradeSystem = [
		{ rate: 4, definition: "Exceptional" },
		{ rate: 3, definition: "Meets Expected" },
		{ rate: 2, definition: "Marginal" },
		{ rate: 1, definition: "Unsatisfactory" },
	]


	const [data, setData] = useState<any>([]);
	const [sortData, setSortData] = useState([]);
	const [searchItem, setSearchItem] = useState("");
	const [isLoading, setisLoading] = useState(false);


	React.useEffect(() => {
		const source = axios.CancelToken.source();
		setisLoading(true);
		axios
			.get(`${process.env.REACT_APP_API}/hr/appraisals/${id}`)
			.then((res: AxiosResponse) => {
				setData(res?.data?.data);
				setisLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setisLoading(false);
			});
		return () => {
			source.cancel();
		};
	}, [id]);

	return (
		<div>
			<header className="ChatProgressView-header"  >
				<div>
					<span className="app-chat--icon">
						<BsChatLeftText />
					</span>
				</div>
				<div className="ChatProgressView-close">
					<Link
						to={"/kpicontainer"}>
						<MdOutlineClose
							size={25}
							style={{ color: "white", backgroundColor: "" }}
							className="ChatProgressView-close-icon"
						/>
					</Link>
				</div>
			</header>
			<div id="performance">

				<h3 className="page-title">
					{/* @ts-ignore */}
					<div >
						<h5>	HOD Evaluations | Update Performance</h5>
					</div>
				</h3>
				<section className="area-grid">
					<div className="evaluation-area">
						<div id="edit-user">
							<div className="user-info">
								<BiUser size={80} />
								<div>
									<h3> {data?.employee_name}</h3>
									<p>john.adibe@outcess.com</p>
									<p>ALS/ADM/269</p>
								</div>
							</div>
						</div>
						<HodEvaluation data={data} />
					</div>
					<div className="info-area">
						{/* @ts-ignore */}
						{/* {isLoading ? <SkeletonLoader /> : */}
						<div className="grade-system">
							<h4>Grading System</h4>
							{gradeSystem.map(item =>
								<div key={item.rate} className="grade_item">
									<p>{item.rate}</p>
									<p>{item.definition}</p>
								</div>
							)}
						</div>
						{/* } */}
						<div className="kpi-summary">
							<div className="kpi-summary-title">
								<p>KPI Summary</p>
							</div>
							<div className="kpi-summary-body m-t-10" >
								<p>Total</p>
								<p id="total-rating">totalRating</p>
								<p>Average Score</p>
								<p id="avg-rating">employeePerformanceAverage%</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}

export default ViewKPAssessment
