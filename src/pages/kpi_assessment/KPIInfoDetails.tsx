
import { useEffect } from 'react'


const KPIInfoDetails = ({ viewdata, setHodscore }: any) => {

 
	const kpiData = [
		{
			'Performance': 'Job Knowledge',
			'num': viewdata?.job_knowledge_employee,
			'reviewer': viewdata?.job_knowledge_reviewer
		},
		{
			'Performance': 'Efficiency',
			'num': viewdata?.efficiency_employee,
			'reviewer': viewdata?.efficiency_reviewer
		},
		{
			'Performance': ' Attendance',
			'num': viewdata?.attendance_employee,
			'reviewer': viewdata?.attendance_reviewer
		},
	];

	const kpiData3: any = ({
		Weight1: 20,
		Weight2: 15,
		Weight3: 15,
		Weight4: 15,
		Weight5: 15,
		Weight6: 20,
	});
	const employeegrade: any = ({
		employeegrade1: 0,
		employeegrade2: 0,
		employeegrade3: 0,
		employeegrade4: 0,
		employeegrade5: 0,
		employeegrade6: 0,
	})


	const Weight = kpiData3.Weight1 +
		kpiData3.Weight2 +
		kpiData3.Weight3 +
		kpiData3.Weight4 +
		kpiData3.Weight5 +
		kpiData3.Weight6


	const totalScore1 = (kpiData3.Weight1 / 5) * employeegrade.employeegrade1
	const totalScore2 = (kpiData3.Weight2 / 5) * employeegrade.employeegrade2
	const totalScore3 = (kpiData3.Weight3 / 5) * employeegrade.employeegrade3
	const totalScore4 = (kpiData3.Weight4 / 5) * employeegrade.employeegrade4
	const totalScore5 = (kpiData3.Weight5 / 5) * employeegrade.employeegrade5
	const totalScore6 = (kpiData3.Weight6 / 5) * employeegrade.employeegrade6


	useEffect(() => {
		const kpi: any = totalScore1 + totalScore2 + totalScore3 + totalScore4 + totalScore5 + totalScore6
		setHodscore(kpi)
	}, [setHodscore, totalScore1, totalScore2, totalScore3, totalScore4, totalScore5, totalScore6])

	// @ts-ignore
	const Amount: any = Object.values(kpiData).reduce((a, v) => (a = a + v?.num), 0);


	const reviews = [
		{ 'reviewer': viewdata?.job_knowledge_employee },
		{ 'reviewer': viewdata?.efficiency_reviewer },
		{ 'reviewer': viewdata?.attendance_reviewer },
		{ 'reviewer': viewdata?.communication_reviewer },
		{ 'reviewer': viewdata?.reliability_reviewer },
		{ 'reviewer': viewdata?.collaboration_reviewer },
	];

	//  @ts-ignore  
	const hod: any = Object.values(reviews).reduce((a, v) => (a = a + v?.reviewer), 0);


	return (
		<form>
			<div className="evaluation-area_cont">
				<div>
					<div className="added-fields_cont">
						<div className="added-field">
							<div className="factor_area">
								<p> </p>
								<div className='Grade-title'>
									<p>Weight</p>
								</div>
							</div>
							<div className="Grade-title">
								<p>Staff Score</p>
							</div>
							<div className="Grade-title">
								<p>HOD Grade</p>
							</div>
						</div>
						<div className="added-field">
							<div className="factor_area">
								<p>Job Knowledge</p>
								<div>
									<p>{kpiData3?.Weight1}</p>
								</div>
							</div>
							<div className="rate_area">
								<p>{viewdata?.job_knowledge_employee}</p>
							</div>
							<div className="btn_area">
								{viewdata?.job_knowledge_reviewer}
							</div>
						</div>
						<div className="added-field">
							<div className="factor_area">
								<p>Efficiency</p>
								<div>
									<p>{kpiData3.Weight2}</p>
								</div>
							</div>
							<div className="rate_area">
								<p>{viewdata?.efficiency_employee}</p>
							</div>
							<div className="btn_area">
								{viewdata?.efficiency_reviewer}
							</div>
						</div>
						<div className="added-field">
							<div className="factor_area">
								<p>Attendance</p>
								<div>
									<p>{kpiData3.Weight3}</p>
								</div>
							</div>
							<div className="rate_area">
								<p>{viewdata?.attendance_employee}</p>
							</div>
							<div className="btn_area">
								{viewdata?.attendance_reviewer}
							</div>
						</div>


						{/* <div className="added-field">
							<div className="factor_area">
								<p>Debugging</p>
								<div>
									<p>{kpiData3.Weight6}</p>
								</div>
							</div>
							<div className="rate_area">
								<p>{viewdata?.collaboration_employee}</p>
							</div>
							<div className="btn_area">
								<p>{viewdata?.collaboration_reviewer}</p>
							</div>
						</div> */}

						<div className="added-field">
							<div className="factor_area Grade-title">
								<p>Total </p>
								<div>
									<p>{Weight}</p>
								</div>
							</div>
							<div className="rate_area Grade-title">
								<p>{!Amount ? "0" : Amount}</p>
							</div>
							<div className="btn_area Grade-title">
								<p>{!hod ? "0" : hod}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	)
}

export default KPIInfoDetails
