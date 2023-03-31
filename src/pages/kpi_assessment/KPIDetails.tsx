import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { BiUser } from 'react-icons/bi';
import { BsChatLeftText } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import KPIInfoDetails from './KPIInfoDetails';
import TableLoader from '../../components/TableLoader';
import { Button } from '@material-ui/core';
import { Spinner } from 'react-bootstrap';
import { fireAlert } from '../../utils/Alert';
import Cookies from 'js-cookie';

const KPIDetails = () => {

	const { id } = useParams()
	const navigate = useNavigate();
	const token = Cookies.get("token");

	const gradeSystem = [
		{ rate: 5, definition: "Outstanding" },
		{ rate: 4, definition: "Very Good" },
		{ rate: 3, definition: "Good" },
		{ rate: 2, definition: "Average" },
		{ rate: 1, definition: "Below Average/Poor" },
	]

	const [isLoading2, setisLoading2] = useState(false);
	const [isSuccess1, setisSuccess1] = useState(false);
	const [message1, setMessage1] = useState('')
	const [datas1, setData1] = useState('')
	const [isError1, setisError1] = useState(false)


	const [data, setData] = useState<any>([]);
	const [isLoading, setisLoading] = useState(false);
	const [isLoading1, setisLoading1] = useState(false);
	const [isSuccess, setisSuccess] = useState(false);
	const [isError, seisError] = useState(false);

	const [isLoading3, setisLoading3] = useState(false);
	const [isSuccess3, setisSuccess3] = useState(false);
	const [isError3, setisError3] = useState(false);
	const [message3, setMessage3] = useState('')
	const [hodscore, setHodscore] = useState('')


	const [input, setinput] = useState<any>({
		"job_knowledge": 0,
		"efficiency": 0,
		"attendance": 0,
		"communication": 0,
		"reliability": 0,
		"collaboration": 0,
		"comment": ""
	})

	const title = "Successful";
	const html = "KPI Deleted";
	const icon = "success";

	const title1 = "Leave error";
	const html1 = message1;
	const icon1 = "error";

	const title3 = "Leave error";
	const html3 = message3;
	const icon3 = "error";

	useEffect(() => {
		if (isSuccess1) {
			fireAlert(title, html, icon);
			setTimeout(() => {
				setisSuccess1(false)
			}, 5000);
		} else if (isError1) {
			fireAlert(title1, html1, icon1);
			setTimeout(() => {
				setisError1(false);
			}, 10000);
		}

	}, [html, title, icon, isSuccess1, isError1, html1]);



	React.useEffect(() => {
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
	}, [id]);


	const handleDelete = () => {
		setisLoading1(true);
		axios
			.delete(`${process.env.REACT_APP_API}/hr/appraisals/${id}`)
			.then((res: AxiosResponse) => {
				setData(res?.data);
				setisLoading1(false);
				setTimeout(() => {
					navigate("/kpicontainer");
				}, 5000);
			})
			.catch((data) => {
				console.log(data);
				setisLoading1(false);
			});
	}

	return (
		<div>
			<header className="ChatProgressView-header"  >
				<div>
					<span className="app-chat--icon">
						<BsChatLeftText />	<span>My Assessment Performance</span> 		<Button className={data?.status === 'active' ? "table-link-active" : "table-link"}>
							{data?.status === 'active' ? 'Completed' : data?.status}</Button>
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
				<section className="area-grid">
					<div className="evaluation-area">
						<div id="edit-user">
							<div className="user-info">
								<BiUser size={80} />
								<div className='BiUser-user'>
									<h3>{data?.employee_name}</h3>
									{/* <p>john.adibe@outcess.com</p> */}
									<p>ALS/ADM/{data?.employee_id}</p>
								</div>
								{/* @ts-ignore */}
								{data?.status === 'active' ? '' :
									<Button className={"table-link"} onClick={handleDelete}>{isLoading1 ? <Spinner animation="border" /> : 'Delete'}</Button>}
							</div>
						</div>
						{isLoading ? <TableLoader isLoading={isLoading} /> : ""}
						<KPIInfoDetails data={data} setHodscore={setHodscore} hodscore={hodscore} />
					</div>
					<div className="info-area">
						{/* @ts-ignore */}
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
								<p id="total-rating">{data?.performance_percentage_employee}%</p>
								<p>HOD Score</p>
								<p id="avg-rating">{data?.performance_percentage_reviewer}{data?.performance_percentage_reviewer === undefined ? '' : '%'}</p>
								<p>Average Score</p>
								<p id="avg-rating">{data?.total_performance_percentage}{data?.total_performance_percentage === undefined ? '' : '%'}</p>
							</div>
						</div>
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



					</div>
				</section>
			</div>
		</div>
	)
}

export default KPIDetails