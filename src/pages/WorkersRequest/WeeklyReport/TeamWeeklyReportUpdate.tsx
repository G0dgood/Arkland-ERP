import { useEffect } from 'react'
import { fireAlert } from '../../../utils/Alert';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import TableLoader from '../../../components/TableLoader';
import WeeklyReportTable from './WeeklyReportTable';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../../../store/useStore';
import { acknowledgeReport, reset, viewWeeklyReport } from '../../../features/WeeklyReport/WeeklyReportSlice';



const TeamWeeklyReportUpdate = () => {
	const dispatch = useAppDispatch();
	const { viewdata, viewisLoading }: any = useAppSelector((state: any) => state.Weeklyreport)
	const { acknowledgeisLoading, acknowledgeisSuccess }: any = useAppSelector((state: any) => state.Weeklyreport)
	const { id } = useParams()
	const navigate = useNavigate();


	const title2 = "Weekly Report Acknowledged";
	const html2 = "Acknowledged";
	const icon2 = "success";




	useEffect(() => {
		// @ts-ignore
		dispatch(viewWeeklyReport(id));
	}, [dispatch, id]);

	const handleacknowlage = () => {
		// @ts-ignore
		dispatch(acknowledgeReport(id));
	}


	useEffect(() => {
		if (acknowledgeisSuccess) {
			fireAlert(title2, html2, icon2);
			navigate(-1)
			dispatch(reset());
		}
	}, [acknowledgeisSuccess, dispatch, id, navigate])





	return (
		<div  >
			<div className='weekly-top-container'>
				<div className='weeklyreporttop-container-card-1'>
					<div className='weekly-top-card-1-sub'>
						<p>EMPLOYEE NAME</p>
						<p className='weekly-top-card-1-sub-second-child'>{viewdata?.employee_name}</p>
						<p>DEPARTMENT</p>
						<p>--</p>
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
					<div style={{ marginRight: "2rem" }}>
						<h4>Week {viewdata?.week}
						</h4>
					</div>
					<div>
						{viewdata?.status === "acknowledged" ? "" : <Button className="table-link-active" onClick={handleacknowlage}>	{acknowledgeisLoading ? <Spinner animation="border" /> : 'acknowledge'}</Button>}

					</div>
				</div>
			</div>
			<div>
				{acknowledgeisLoading ? <TableLoader isLoading={acknowledgeisLoading} /> : ''}
				<WeeklyReportTable data={viewdata?.activities} isLoading={viewisLoading} />
			</div>
		</div>
	)
}

export default TeamWeeklyReportUpdate