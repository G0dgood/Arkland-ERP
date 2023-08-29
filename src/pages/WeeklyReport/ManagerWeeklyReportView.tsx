import { useEffect, useState } from 'react'
import WeeklyReportTable from './WeeklyReportTable';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { viewWeeklyReport } from '../../features/WeeklyReport/WeeklyReportSlice';
import { useParams } from 'react-router-dom';


const ManagerWeeklyReportView = () => {
	const dispatch = useAppDispatch();
	const { viewdata, viewisLoading }: any = useAppSelector((state: any) => state.Weeklyreport)
	const { id } = useParams()


	useEffect(() => {
		// @ts-ignore
		dispatch(viewWeeklyReport(id));
	}, [dispatch, id]);




	const [collapseNav, setCollapseNav] = useState(() => {
		// @ts-ignore
		return JSON.parse(localStorage.getItem("collapse")) || false;
	});

	useEffect(() => {
		// --- Set state of collapseNav to localStorage on pageLoad --- //
		localStorage.setItem("collapse", JSON.stringify(collapseNav));
		// --- Set state of collapseNav to localStorage on pageLoad --- //
	}, [collapseNav]);

	const toggleSideNav = () => {
		setCollapseNav(!collapseNav);
	}

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
					<div>
						<h4>Week {viewdata?.week}
						</h4>
					</div>
					<div>
					</div>
				</div>
			</div>
			<div>
				<WeeklyReportTable data={viewdata?.activities} isLoading={viewisLoading} />
			</div>
		</div>
	)
}

export default ManagerWeeklyReportView