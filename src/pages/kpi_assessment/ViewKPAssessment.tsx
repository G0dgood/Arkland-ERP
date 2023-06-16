import React, { useEffect, useState } from 'react'
import { BiUser } from 'react-icons/bi'
import { useLocation, useParams } from 'react-router-dom'
import HodEvaluation from './HodEvaluate'
import TableLoader from '../../components/TableLoader'
import { Button } from '@material-ui/core'
import { viewAssessment } from '../../features/KPIAssessment/assessmentSlice'
import { useAppDispatch, useAppSelector } from '../../store/useStore'

const ViewKPAssessment = () => {
	const { id } = useParams()
	const dispatch = useAppDispatch();
	const location = useLocation();
	const { viewdata, viewisLoading } = useAppSelector((state: any) => state.assessment)
	const [hodscore, setHodscore] = useState<number>(0);
	const [broughtDownAverage, setBroughtDownAverage] = useState<any>(0);

	const gradeSystem = [
		{ rate: 5, definition: "Outstanding" },
		{ rate: 4, definition: "Very Good" },
		{ rate: 3, definition: "Good" },
		{ rate: 2, definition: "Average" },
		{ rate: 1, definition: "Below Average/Poor" },
	]






	useEffect(() => {
		// @ts-ignore
		dispatch(viewAssessment(id));
	}, [dispatch, id]);


	// Performance  Percentage Calculation
	React.useEffect(() => {
		const finalscore: any = (viewdata?.performance_percentage_employee + hodscore) / (hodscore === 0 ? 0 : 2)
		setBroughtDownAverage(finalscore)
	}, [viewdata?.performance_percentage_employee, hodscore]);

	return (
		<div>
			<div id="performance">
				<section className="area-grid">
					<div className="evaluation-area">
						<div id="edit-user">
							<div className="user-info">
								<BiUser size={80} />
								<div>
									<h3>{viewdata?.employee_name}</h3>
									{/* <p>john.adibe@outcess.com</p> */}
									<p>ALS/ADM/{viewdata?.employee_id}</p>
									<p>{location.state.name === "admin" ? "Employee Performance" : "HOD Update Performance "}   <Button className={viewdata?.status === 'active' ? "table-link-active" : "table-link"}>
										{viewdata?.status === 'active' ? 'Completed' : viewdata?.status}</Button></p>
								</div>
							</div>
						</div>
						{viewisLoading ? <TableLoader isLoading={viewisLoading} /> : ""}
						<HodEvaluation data={viewdata} setHodscore={setHodscore} hodscore={hodscore} id={id} />
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

						{viewdata?.status === 'active' ? <div className="kpi-summary">
							<div className="kpi-summary-title">
								<p>KPI Summary</p></div>
							<div className="kpi-summary-body final-rating-summary">
								<p>{viewdata?.employee_name}</p> <p>{viewdata?.performance_percentage_employee}%</p>
								<p>HOD Score</p>
								<p id="avg-rating">{viewdata?.performance_percentage_reviewer}{viewdata?.performance_percentage_reviewer === undefined ? '' : '%'}</p>
								<p>Average Score</p>
								<p id="avg-rating">{viewdata?.total_performance_percentage}{viewdata?.total_performance_percentage === undefined ? '' : '%'}</p>
							</div>
						</div> : <div className="kpi-summary">
							<div className="kpi-summary-title">
								<p>KPI Summary</p></div>
							<div className="kpi-summary-body final-rating-summary">
								<p>{viewdata?.employee_name}</p>
								<p>{viewdata?.performance_percentage_employee}%</p>
								<p>HOD Score</p>
								<p id="hod-avg-rating">{hodscore === undefined ? "0" : hodscore}</p>
								<p>Brought Down Average</p>
								<p id="final-avg">{!broughtDownAverage || broughtDownAverage ===
									Infinity ? "0" : broughtDownAverage}%</p>
							</div>
						</div>}
						{viewdata?.status === 'active' ? <div>
							<div className="kpi-summary">
								<div className="kpi-summary-title">
									<p>{viewdata?.employee_name}'s  comment</p>
								</div>
								{/* @ts-ignore */}
								<textarea rows="4" placeholder="Add an extended comment" required className='m-t-5' value={viewdata?.employee_comment} />
							</div>
							<div className="kpi-summary">
								<div className="kpi-summary-title">
									<p>HOD's comment</p>
								</div>
								{/* @ts-ignore */}
								<textarea rows="4" placeholder="Add an extended comment" required className='m-t-5' value={viewdata?.reviewer_comment} />
							</div>
						</div> :
							<div className="kpi-summary">
								<div className="kpi-summary-title">
									<p>{viewdata?.employee_name}'s  comment</p>
								</div>
								{/* @ts-ignore */}
								<textarea rows="4" placeholder="Add an extended comment" required className='m-t-5' value={viewdata?.employee_comment} />
							</div>
						}


					</div>
				</section>
			</div>
		</div>
	)
}

export default ViewKPAssessment
