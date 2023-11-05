import { useEffect, useState } from 'react'
import { BiUser } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import TableLoader from '../../components/TableLoader';
import { Button } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { viewAssessment } from '../../features/KPIAssessment/assessmentSlice';
import KPIAdminDetails from './KPIAdminDetails';
import { gradeSystem } from '../../utils/ShareData';
import { KPISummary } from '../../utils/KpiFunctions';



const AdminKPAssessment = () => {
	const { id } = useParams()
	const dispatch = useAppDispatch();
	const [hodscore, setHodscore] = useState(null)
	const { viewdata, viewisLoading } = useAppSelector((state: any) => state.assessment)
	useEffect(() => {
		// @ts-ignore
		dispatch(viewAssessment(id));
	}, [dispatch, id]);









	return (
		<div id="performance">
			<section className="area-grid">
				<div className="evaluation-area">
					<div id="edit-user">
						<div className="user-info">
							<BiUser size={80} />
							<div className='BiUser-user'>
								<h3>{viewdata?.employee_name}</h3>
								{/* <p>john.adibe@outcess.com</p> */}
								<p>ALS/ADM/{viewdata?.employee_id}</p>
								<span className="app-chat--icon">
									<span>Assessment Performance</span> 		<Button className={viewdata?.status === 'active' ? "table-link-active" : "table-link"}>
										{viewdata?.status === 'active' ? 'Completed' : viewdata?.status}</Button>
								</span>
							</div>
						</div>
					</div>
					{viewisLoading ? <TableLoader isLoading={viewisLoading} /> : ""}
					<KPIAdminDetails data={viewdata} setHodscore={setHodscore} hodscore={hodscore} />
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

					{/* KPISummary */}
					{KPISummary(viewdata)}
					{/* KPISummary  END*/}
					<div className="kpi-summary">
						<div className="kpi-summary-title">
							<p>{viewdata?.employee_name}'s  comment</p>
						</div>
						{/* @ts-ignore */}
						<textarea rows="4" placeholder="Add an extended comment"
							className='m-t-5' value={viewdata?.employee_comment} />
						KPISummary</div>
					<div className="kpi-summary">
						<div className="kpi-summary-title">
							<p>HOD comment</p>
						</div>
						{/* @ts-ignore */}
						<textarea rows="4" placeholder="Add an extended comment"
							className='m-t-5' value={viewdata?.reviewer_comment} />
					</div>
				</div>
			</section>
		</div>
	)
}

export default AdminKPAssessment
