import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

const KPIAssessment = () => {

	// @ts-ignore
	const userInfo: any = JSON.parse(localStorage.getItem("user"))
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
	};
	//

	const [inputs, setInputs] = useState({
		month: 10,
		employee: "632941e5b20c61595d0a6208",
		reviewer: "632882a46cdfa02ee0ddbe28",
		job_knowledge: 15,
		efficiency: 15,
		attendance: 15,
		communication: 15,
		reliability: 15,
		collaboration: 20,
		comment: "I try sha"

	})

	const kpiData: any = [

		{
			Performance: 'Job Knowledge',
			IndicatorDescription: "Measures employee's relevant knowledge and essential skills, such as work practices, policies and procedures needed to do a particular job",
			Weight: 20,
		},
		{
			Performance: 'Efficiency',
			IndicatorDescription: "Maintaining the same standards and behaviors that lead to producing a high quality of work",
			Weight: 20,
		},
		{
			Performance: ' Attendance',
			IndicatorDescription: "Frequency of times at work",
			Weight: 20,
		},
		{
			Performance: 'Software Development',
			IndicatorDescription: "Completes clearly defined tasks and works and also learn the relevant technologies to improve the company sales mobile application solutions.",
			Weight: 20,
		},
		{
			Performance: 'Team work',
			IndicatorDescription: "Collaborate with other team members and  communicates when something is blocking.",
			Weight: 20,
		},
		{
			Performance: 'Debugging',
			IndicatorDescription: "Helps debug technical problems. Submits issues so that we can document and improve our service.",
			Weight: 20,
		},
		{
			Performance: 'Interpersonal Skill',
			IndicatorDescription: "Delivering features, refactoring existing code, and updating company software solutions. ",
			Weight: 20,
		},

	];

	console.log('Performance', kpiData[0].Performance)





	const handleOnChange = (input: string, value: any) => {
		setInputs((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};
	return (

		<div>
			<div>
				<div className='grading-system-contain'>
					<div> </div>
					<h4 className='grading-system-title'>Grading System</h4>
				</div>
				<div className='kpi-top-container'>
					<div className='kpi-top-container-card-1'>
						<div className='kpi-top-card-1'>Employee Appraisal </div>
						<div className='kpi-top-card-1-sub'>
							<p>Employee Name</p>
							<p className='kpi-top-card-1-sub-second-child'>{userInfo.full_name}</p>
							<p>Employee Role</p>
							<p> </p>
							<p>Employee ID</p>
							<p>{userInfo.employee.employee_id} </p>
							<p>Review Date</p>
							<p> </p>
						</div>
					</div>
					<div className='kpi-top-container-card-2'>
						<div className='grading-system'>
							<p>Rating Score</p>
							<p className='grading-system-second-child'>Description</p>
							<p>5</p>
							<p>Outstanding</p>
							<p>4</p>
							<p>Very Good</p>
							<p>3</p>
							<p>Good</p>
							<p>3</p>
							<p>Average</p>
							<p>1</p>
							<p>Below Average/Poor</p>
						</div>
					</div>
				</div>
			</div>
			<div className='table-datacell-button-bottom'>
				<div className='table-datacell-button-bottom-color1'>KPI SCORE:</div>
				<div className='table-datacell-button-bottom-color2'>100</div>
			</div>
			<div className='kpi-top-container-card-3'>
				<section className="md-ui component-data-table">
					<div className="main-table-wrapper">
						<table className="main-table-content">
							<thead className="data-table-header">
								<tr className="data-table-row"  >
									<td className="table-datacell datatype-numeric">Key Performance Indicator</td>
									<td className="table-datacell datatype-numeric">Indicator Description</td>
									<td className="table-datacell datatype-numeric">Weight</td>
									<td className="table-datacell datatype-numeric">Employee Grade</td>
									<td className="table-datacell datatype-numeric">Employee Score</td>
									{/* <td className="table-datacell datatype-numeric">Supervisor Grade</td>
										<td className="table-datacell datatype-numeric">Supervisor Score</td> */}

								</tr>
							</thead>
							{kpiData?.map((item: any, i: any) => (

								<tbody className="data-table-content">
									<tr className="data-table-row">
										<td className="table-datacell datatype-string">
											<input className='Performance-Indicator-input'
												value={item.Performance}
												onChange={(e) => handleOnChange("userId", e.target.value)} />  </td>
										<td className="table-datacell datatype-numeric">
											<textarea
												id='kpi-textarea'
												className='Performance-Indicator-input2'
												value={item.IndicatorDescription}
												onChange={(e) => handleOnChange("userId", e.target.value)} rows={5} />  </td>
										<td className="table-datacell datatype-numeric">
											<input className='Performance-Indicator-input1'
												value={item.Weight}
												onChange={(e) => handleOnChange("userId", e.target.value)} /> </td>
										<td className="table-datacell datatype-numeric">
											<select className='performance-field' name="score"  >
												<option>
												</option>
												<option value="1">1</option>
												<option value="2">2</option>
												<option value="3">3</option>
												<option value="4">4</option>
											</select>
										</td>
										<td className="table-datacell datatype-numeric">
											<input className='Performance-Indicator-input1'
												value={item.Weight}
											/> </td>
									</tr>
								</tbody>
							))}
						</table>
					</div>
				</section>


				{/* <div className='emp-reconmentdetion'>
						<div className='emp-reconmentdetion-sub'>
							<div className='reconmentdetion-sub-title'>
								Comments & Recommandations - Employee
							</div>
							<textarea rows={12} />
						</div>
						<div className='emp-reconmentdetion-sub-space' />
						<div className='emp-reconmentdetion-sub'>
							<div className='reconmentdetion-sub-title'>
								Comments & Recommandations - Appraradir
							</div>
							<textarea rows={12} />
						</div>
					</div> */}
			</div>
		</div>
	)
}



export default KPIAssessment