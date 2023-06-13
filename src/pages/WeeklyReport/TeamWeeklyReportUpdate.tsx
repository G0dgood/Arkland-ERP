
import { useEffect, useState } from 'react'
import { fireAlert } from '../../utils/Alert';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import TableLoader from '../../components/TableLoader';
import { MdOutlineClose } from 'react-icons/md';
import { BsChatLeftText } from 'react-icons/bs';
import WeeklyReportTable from './WeeklyReportTable';
import Cookies from 'js-cookie';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { viewWeeklyReport } from '../../features/WeeklyReport/WeeklyReportSlice';

const TeamWeeklyReportUpdate = () => {
	const dispatch = useAppDispatch();
	const { viewdata, viewisError, viewisLoading, viewmessage, viewisSuccess }: any = useAppSelector((state: any) => state.Weeklyreport)
	const { id } = useParams()
	const navigate = useNavigate();


	const [data, setData] = useState<any>([]);
	const [isLoading, setisLoading] = useState(false);
	const [isLoading1, setisLoading1] = useState(false);
	const [isSuccess, setisSuccess] = useState(false);
	const [isError, setisError] = useState(false)
	const [message, setMessage] = useState("");
	const [isError1, setisError1] = useState(false)
	const [message1, setMessage1] = useState("");

	const token = Cookies.get("token");


	const title2 = "Weekly Report Acknowledged";
	const html2 = "Acknowledged";
	const icon2 = "success";




	useEffect(() => {
		// @ts-ignore
		dispatch(viewWeeklyReport(id));
	}, [dispatch, id]);





	const handleacknowlage = () => {
		setisLoading1(true)
		fetch(`${process.env.REACT_APP_API}/hr/weekly-reports/${id}/acknowledge`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
		})
			.then((response) => response.json())
			.then((data) => {

				if (data?.success === false) {
					setisError1(true)
				} else {
					setData(data?.data)
					setisSuccess(true)
					setTimeout(() => {
						navigate("/teamweekly");
					}, 2000);
				}
				setisLoading1(false);
			})
			.catch((error) => {
				console.error("Error:", error);
				setisLoading1(false);
			});
	}




	useEffect(() => {
		if (isSuccess) {
			fireAlert(title2, html2, icon2);
			setTimeout(() => {
				setisSuccess(false)
			}, 5000);
		}
	}, [isError, isError1, isSuccess])



	return (
		<div  >
			<div className='weekly-top-container'>
				<div className='weeklyreporttop-container-card-1'>
					<div className='weekly-top-card-1-sub'>
						<p>EMPLOYEE NAME</p>
						<p className='weekly-top-card-1-sub-second-child'>{viewdata?.employee_name}</p>
						<p>EMPLOYEE TITLE</p>
						<p>{viewdata?.employee_title}</p>
						<p>DEPARTMENT</p>
						<p>I.T</p>
						<p>SUPERVISOR</p>
						<p>{viewdata?.employee_supervisor}</p>
						<p>SELF ASSESSMENT</p>
						<p>{viewdata?.self_assessment}</p>
						<p>DATE</p>
						<p>{moment().format("MM DD YYYY")}</p>
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
						<h4>Week {viewdata?.week}
						</h4>
					</div>
					<div>
						{viewdata?.status === "acknowledged" ? "" : <Button className="table-link-active" onClick={handleacknowlage}>	{isLoading1 ? <Spinner animation="border" /> : 'acknowledge'}</Button>}

					</div>
				</div>
			</div>
			<div>
				{isLoading1 ? <TableLoader isLoading={isLoading1} /> : ''}
				<WeeklyReportTable data={viewdata?.activities} isLoading={viewisLoading} />
			</div>
		</div>
	)
}

export default TeamWeeklyReportUpdate