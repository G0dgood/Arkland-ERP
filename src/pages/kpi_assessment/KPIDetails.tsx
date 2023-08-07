import { useEffect, useState } from 'react'
import { BiUser } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import KPIInfoDetails from './KPIInfoDetails';
import TableLoader from '../../components/TableLoader';
import { Button } from '@material-ui/core';
import { Spinner } from 'react-bootstrap';
import { fireAlert } from '../../utils/Alert';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { deleteAssessment, reset, viewAssessment } from '../../features/KPIAssessment/assessmentSlice';
import { gradeSystem } from '../../utils/ShareData';


const KPIDetails = () => {
	const { id } = useParams()
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { viewdata, viewisLoading, viewmessage } = useAppSelector((state: any) => state.assessment)
	const { deleteisLoading, deletemessage, deleteisSuccess } = useAppSelector((state: any) => state.assessment)



	useEffect(() => {
		// @ts-ignore
		dispatch(viewAssessment(id));
	}, [dispatch, id]);




	const [hodscore, setHodscore] = useState('')

	useEffect(() => {
		if (deleteisSuccess) {
			fireAlert("KPI Deleted", "KPI Deleted Successfully", "success");
			dispatch(reset());
			navigate(-1)
		}
	}, [viewmessage, deletemessage, deleteisSuccess, navigate, dispatch]);



	const handleDelete = () => {
		// @ts-ignore
		dispatch(deleteAssessment(id));
	}

	return (
		<div>
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
										{/* <span>My Assessment Performance</span> */}
										<Button className={viewdata?.status === 'active' ? "table-link-active  " : "table-link   "} style={{ marginRight: "2rem" }}>
											{viewdata?.status === 'active' ? 'Completed' : viewdata?.status}</Button>
										{/* @ts-ignore */}
										{viewdata?.status === 'active' ? '' :
											<Button className={"table-link"} onClick={handleDelete}>{deleteisLoading ? <Spinner animation="border" /> : 'Delete'}</Button>}
									</span>
								</div>

							</div>
						</div>
						{viewisLoading ? <TableLoader isLoading={viewisLoading} /> : ""}
						<KPIInfoDetails viewdata={viewdata} setHodscore={setHodscore} hodscore={hodscore} />
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
						{/* <div className="kpi-summary">
							<div className="kpi-summary-title">
								<p>KPI Summary</p>
							</div>
							<div className="kpi-summary-body m-t-10" >
								<p>Total</p>
								<p id="total-rating">{viewdata?.performance_percentage_employee} {viewdata?.performance_percentage_employee === undefined ? '' : '%'}</p>
								<p>HOD Score</p>
								<p id="avg-rating">{viewdata?.performance_percentage_reviewer}{viewdata?.performance_percentage_reviewer === undefined ? '' : '%'}</p>
								<p>Average Score</p>
								<p id="avg-rating">{viewdata?.total_performance_percentage}{viewdata?.total_performance_percentage === undefined ? '' : '%'}</p>
							</div>
						</div> */}

						<div className="kpi-summary">
							<div className="kpi-summary-title">
								<p>{viewdata?.employee_name}'s  comment</p>
							</div>
							{/* @ts-ignore */}
							<textarea rows="4" placeholder="Add an extended comment" required className='m-t-5' value={viewdata?.employee_comment} />
						</div>
						<div className="kpi-summary">
							<div className="kpi-summary-title">
								<p>HOD comment</p>
							</div>
							{/* @ts-ignore */}
							<textarea rows="4" placeholder="Add an extended comment" required className='m-t-5' value={viewdata?.reviewer_comment} />
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}

export default KPIDetails