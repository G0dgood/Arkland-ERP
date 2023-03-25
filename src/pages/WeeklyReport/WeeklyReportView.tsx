import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import WeekReportTitle from './WeekReportTitle'
import WeeklyReportTable5 from '../../components/table_component/WeeklyReportTable5'
import storage from '../../utils/storage'
import Cookies from 'js-cookie'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fireAlert } from '../../utils/Alert'
import TableLoader from '../../components/TableLoader'
import { BsChatLeftText } from 'react-icons/bs'
import { Button } from '@material-ui/core'
import { MdOutlineClose } from 'react-icons/md'
import axios, { AxiosResponse } from 'axios'
import { Spinner } from 'react-bootstrap'

const WeeklyReportView = () => {
	const { id } = useParams()
	// @ts-ignore
	const userInfo: any = JSON.parse(storage?.get("user"));
	const navigate = useNavigate();

	const token = Cookies.get("token");
	const [data, setData] = useState<any>([]);
	const [sortData, setSortData] = useState([]);
	const [searchItem, setSearchItem] = useState("");
	const [isLoading, setisLoading] = useState(false);
	const [isSuccess, setisSuccess] = useState(false);
	const [isError, setisError] = useState(false)
	const [message, setMessage] = useState("");

	const [isLoading1, setisLoading1] = useState(false);



	const title = "Weekly Reports error";
	const html = message;
	const icon = "error";
	const title1 = "Weekly Reports error";
	const html1 = "Weekly Reports delected";
	const icon1 = "success";


	React.useEffect(() => {
		setisLoading(true);
		axios
			.get(`${process.env.REACT_APP_API}/hr/weekly-reports/${id}`)
			.then((res: AxiosResponse) => {
				setData(res?.data?.data);
				setisLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setMessage(err?.message)
				setisLoading(false);
			});
	}, [id, navigate]);
	console.log('data', data)


	const handleDelete = () => {
		setisLoading1(true);
		axios
			.delete(`${process.env.REACT_APP_API}/hr/weekly-reports/${id}`)
			.then((res: AxiosResponse) => {
				setisLoading1(false);
				fireAlert(title1, html1, icon1);
				setTimeout(() => {
					navigate("/weeklycontainer");
				}, 2000);
			})
			.catch((data) => {
				console.log(data);
				setisLoading1(false);
			});
	}

	// useEffect(() => {
	// 	setisLoading(true);
	// 	fetch(`https://arkland-erp.herokuapp.com/api/v1/hr/weekly-reports/63fa250608cb4db9b125ffd3`, {
	// 		method: "GET",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			Authorization: `Bearer ${token}`
	// 		},
	// 	})
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			if (data?.success === false) {
	// 				setMessage(data?.message)
	// 				setisError(true)
	// 				console.log('data', data)
	// 			} else {
	// 				setisSuccess(true)
	// 				setData(data)
	// 			}
	// 			setisLoading(false);
	// 		})
	// 		.catch((error) => {
	// 			console.error("Error:", error);
	// 			setisLoading(false);
	// 		});

	// }, [id, token])



	useEffect(() => {
		if (isSuccess) {
			fireAlert(title, html, icon);
			setTimeout(() => {
				setisSuccess(false)
			}, 5000);
		} else if (isError) {
			fireAlert(title, html, icon);
			setTimeout(() => {
				setisError(false);
			}, 1000);
		}

	}, [html, isError, isSuccess]);

	return (
		<div  >

			<header className="ChatProgressView-header"  >
				<div>
					<span className="app-chat--icon">
						<BsChatLeftText />
					</span>
					<span> Weekly Report</span>
				</div>
				<div className="ChatProgressView-close">
					<Link
						to={"/weeklycontainer"}>
						<MdOutlineClose
							size={25}
							style={{ color: "white", backgroundColor: "" }}
							className="ChatProgressView-close-icon"
						/>
					</Link>
				</div>
			</header>
			<main>
				{/* <WeekReportTitle /> */}

				<div className='weekly-top-container'>
					<div className='weeklyreporttop-container-card-1'>
						<div className='weekly-top-card-1-sub'>
							<p>EMPLOYEE NAME</p>
							<p className='weekly-top-card-1-sub-second-child'>{data?.employee_name}</p>
							<p>EMPLOYEE TITLE</p>
							<p>{data?.employee_title}</p>
							<p>DEPARTMENT</p>
							<p>I.T</p>
							<p>SUPERVISOR</p>
							<p>{data?.employee_supervisor}</p>
							<p>SELF ASSESSMENT</p>
							<p>{data?.self_assessment}</p>
							<p>DATE</p>
							<p>30/11/2022</p>
						</div>
					</div>
					<div className='weekly-top-container-card-2'>
						<div className='weekly-grading-system'>
							<p>SELF ASSESSMENT OPTIONS</p>
							<p>Execellent</p>
							<p>Above Average</p>
							<p>Average</p>
							<p>Above Average</p>
						</div>
					</div>
				</div>
				<div className='weekly-report-title'>
					<div className='weekly-delete'>
						<div>
							<h4>Week {data?.week}
							</h4>
						</div>
						<div>
							{data?.status === "acknowledged" ? "" : <Button className={"table-link"} onClick={handleDelete}>{isLoading1 ? <Spinner animation="border" /> : 'Delete'}</Button>}

						</div>
					</div>
				</div>
				<div>
					{isLoading1 ? <TableLoader isLoading={isLoading1} /> : ''}
					<WeeklyReportTable5 data={data?.activities} isLoading={isLoading} />
				</div>
			</main>
		</div>
	)
}

export default WeeklyReportView