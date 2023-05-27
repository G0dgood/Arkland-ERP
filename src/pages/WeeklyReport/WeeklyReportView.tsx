import { useEffect, useState } from 'react'
import WeeklyReportTable5 from '../../components/table_component/WeeklyReportTable5'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fireAlert } from '../../utils/Alert'
import TableLoader from '../../components/TableLoader'
import { BsChatLeftText } from 'react-icons/bs'
import { Button } from '@material-ui/core'
import { MdOutlineClose } from 'react-icons/md'
import { Spinner } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../hooks/useDispatch'
import { deleteWeeklyReport, reset, updateWeeklyReport, viewWeeklyReport } from '../../features/WeeklyReport/WeeklyReportSlice'
import moment from 'moment'

const WeeklyReportView = () => {
	const { viewdata, viewisError, viewisLoading } = useAppSelector((state: any) => state.Weeklyreport)
	const { deleteisError, deleteisLoading, deletemessage, deleteisSuccess } = useAppSelector((state: any) => state.Weeklyreport)
	const { updateisError, updateisLoading, updatemessage, updateisSuccess } = useAppSelector((state: any) => state.Weeklyreport)


	const dispatch = useAppDispatch();
	const { id } = useParams()
	const navigate = useNavigate();



	const [isError, setisError] = useState(false)
	const [inputs, setInputs] = useState([]);


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



	// useEffect(() => {
	// 	if (isError) {
	// 		fireAlert("Weekly Reports error", viewisError, "error");
	// 		setTimeout(() => {
	// 			setisError(false);
	// 		}, 1000);
	// 	} else if (deleteisSuccess) {
	// 		fireAlert("Delete Weekly Reports success", deleteisSuccess, 'success');
	// 		setTimeout(() => {
	// 			navigate("/weeklycontainer");
	// 			dispatch(reset());
	// 		}, 2000);
	// 	} else if (deleteisError) {
	// 		fireAlert("Delete Weekly Reports error", deletemessage, "error");
	// 		setTimeout(() => {
	// 			dispatch(reset());
	// 		}, 2000);
	// 	} else if (updateisError) {
	// 		fireAlert("Update Weekly Reports error", updatemessage, "error");
	// 		setTimeout(() => {
	// 			dispatch(reset());
	// 		}, 2000);
	// 	} else if (updateisSuccess) {
	// 		fireAlert("Weekly Reports Updated", updatemessage, "success");
	// 		setTimeout(() => {
	// 			navigate("/weeklycontainer");
	// 			dispatch(reset());
	// 		}, 2000);
	// 	} else if (viewisError) {
	// 		fireAlert("View Weekly Reports error", viewdata, "error");
	// 		setTimeout(() => {
	// 			dispatch(reset());
	// 		}, 2000);
	// 	}
	// }, [deleteisError, deleteisSuccess, deletemessage, dispatch, isError, navigate, updateisError, updateisSuccess, updatemessage, viewdata, viewisError]);

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
			<div>

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
						<div className='weekly-number'>
							<h4>Week {viewdata?.week}
							</h4>
						</div>
						<div className='weekly-delete-btn'>
							{viewdata?.status === "acknowledged" ? "" : <Button className={"table-link"} onClick={handleDelete}>{deleteisLoading ? <Spinner animation="border" /> : 'Delete'}</Button>}

						</div>
						<div>
							{viewdata?.status === "acknowledged" ? "" : <Button className="table-link-active" onClick={handleUpate}>	{updateisLoading ? <Spinner animation="border" /> : 'Update'}</Button>}

						</div>
					</div>
				</div>
				<div>
					{viewisLoading ? <TableLoader isLoading={viewisLoading} /> : ''}
					<WeeklyReportTable5 data={viewdata?.activities} isLoading={viewisLoading} setInputs={setInputs} />
				</div>
			</div>
		</div>
	)
}

export default WeeklyReportView