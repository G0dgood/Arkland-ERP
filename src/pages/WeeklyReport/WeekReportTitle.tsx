import { Button } from '@material-ui/core'
import { GoArrowLeft } from 'react-icons/go'
import { useNavigate } from 'react-router-dom';

const WeekReportTitle = () => {

	const navigate = useNavigate();

	return (
		<div className="addemployeecontainer-sup">
			<div className="back-to-employee-container  weeklyreportview">
				<Button
					onClick={() => navigate("/weeklyreportview")}
					variant="outlined"
					className="back-to-employee-button"
				>
					<GoArrowLeft className="back-to-employee-icon" size={20} />
				</Button>
				<h4
					className="addemployeecontainer-title"
				>
					Weekly Report
				</h4>
			</div>
		</div>
	)
}

export default WeekReportTitle
