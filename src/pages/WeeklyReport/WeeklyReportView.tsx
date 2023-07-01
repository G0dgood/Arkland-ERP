import { useEffect, useState } from 'react'
import WeeklyReportTable5 from '../../components/table_component/WeeklyReportTable5'
import { useNavigate, useParams } from 'react-router-dom'
import { fireAlert } from '../../utils/Alert'
import TableLoader from '../../components/TableLoader'
import { Button } from '@material-ui/core'
import { Spinner } from 'react-bootstrap'
import { deleteWeeklyReport, reset, updateWeeklyReport, viewWeeklyReport } from '../../features/WeeklyReport/WeeklyReportSlice'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '../../store/useStore'

const WeeklyReportView = () => {
	const { viewdata, viewisLoading } = useAppSelector((state: any) => state.Weeklyreport)
	const { deleteisLoading, deletemessage, deleteisSuccess } = useAppSelector((state: any) => state.Weeklyreport)
	const { updateisLoading, updatemessage, updateisSuccess } = useAppSelector((state: any) => state.Weeklyreport)


	const dispatch = useAppDispatch();
	const { id } = useParams()
	const navigate = useNavigate();
	const [activities, setactivities] = useState<any>();
	const [inputs, setInput] = useState<any>({
		assessment: "",
		week: "0",
		activities: [],
	})

	useEffect(() => {
		setInput((prevState: any) => {
			return ({
				...prevState,
				assessment: viewdata?.self_assessment,
				week: viewdata?.week,
				activities: activities
			});
		});
	}, [activities, viewdata?.self_assessment, viewdata?.week]);

	useEffect(() => {
		// @ts-ignore
		dispatch(viewWeeklyReport(id));
	}, [dispatch, id])


	const handleDelete = () => {
		// @ts-ignore
		dispatch(deleteWeeklyReport(id));
	}

	const handleUpate = () => {
		// @ts-ignore
		dispatch(updateWeeklyReport({ id, inputs }));
	}










	useEffect(() => {
		if (deleteisSuccess) {
			fireAlert("Delete successful", "Delete Weekly Reports success", 'success');
			setTimeout(() => {
				navigate(-1);
				dispatch(reset());
			}, 2000);
		} else if (updateisSuccess) {
			fireAlert("  Updated successful", "Weekly Reports Updated ", "success");
			setTimeout(() => {
				navigate(-1);
				dispatch(reset());
			}, 2000);
		}
	}, [deleteisSuccess, deletemessage, dispatch, navigate, updateisSuccess, updatemessage, viewdata]);

	return (
		<div  >
			<div>
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
				<div className='weekly-report-title' >
					<div className='weekly-delete' >
						<div className='weekly-number'>
							<h4>Week {viewdata?.week}
							</h4>
						</div>
						<div className='weekly-delete-btn' style={{ display: "flex", alignItems: "center", color: "#e2522e", }}> <h5 style={{ marginRight: "1rem", }}> Delete </h5>
							{viewdata?.status === "acknowledged" ? "" : <Button className={"table-link"} onClick={handleDelete}>{deleteisLoading ? <Spinner animation="border" /> : 'Delete'}</Button>}
						</div>

						<div style={{ display: "flex", alignItems: "center", color: "#29CC97" }} >
							<h5 style={{ marginRight: "1rem" }}  > Update </h5>
							{viewdata?.status === "acknowledged" ? "" : <Button className="table-link-active" onClick={handleUpate}>
								{updateisLoading ? <Spinner animation="border" /> : 'Update'}</Button>}

						</div>
					</div>
				</div>
				<div>
					{viewisLoading ? <TableLoader isLoading={viewisLoading} /> : ''}
					<WeeklyReportTable5 data={viewdata?.activities} isLoading={viewisLoading} setactivities={setactivities} activities={activities} />
				</div>
			</div>
		</div>
	)
}

export default WeeklyReportView