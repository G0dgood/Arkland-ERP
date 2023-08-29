import React, { useEffect, useState } from 'react'
import { BiUser } from 'react-icons/bi'
import { useLocation, useParams } from 'react-router-dom'
import HodEvaluation from './HodEvaluate'
import TableLoader from '../../components/TableLoader'
import { Button } from '@material-ui/core'
import { viewAssessment } from '../../features/KPIAssessment/assessmentSlice'
import { useAppDispatch, useAppSelector } from '../../store/useStore'
import { gradeSystem } from '../../utils/ShareData'
import { KPISummary } from '../../utils/KpiFunctions'


const ViewKPAssessment = () => {
	const { id } = useParams()
	const dispatch = useAppDispatch();
	const location = useLocation();
	const { viewdata, viewisLoading } = useAppSelector((state: any) => state.assessment)
	const [hodscore, setHodscore] = useState<number>(0);


	useEffect(() => {
		// @ts-ignore
		dispatch(viewAssessment(id));
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
								<p>{location?.state?.name === "admin" ? "Employee Performance" : "HOD Update Performance "}
									<Button className={viewdata?.status === 'active' ? "table-link-active" : "table-link"}>
										{viewdata?.status === 'active' ? 'Completed' : viewdata?.status}</Button>
								</p>
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

					{/* KPISummary */}
					{KPISummary(viewdata)}
					{/* KPISummary  END*/}
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
	)
}

export default ViewKPAssessment
