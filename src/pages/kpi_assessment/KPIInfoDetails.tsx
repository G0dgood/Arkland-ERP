import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';

const KPIInfoDetails = ({ data, setHodscore, hodscore }: any) => {
	const year = new Date().getFullYear().toString();

	// const [isLoading, setisLoading] = useState(false);
	// const [isSuccess, setisSuccess] = useState(false);
	// const [message, setMessage] = useState('')
	// const [datas, setData] = useState('')
	// const [isError, setisError] = useState(false)

	const [input, setinput] = useState<any>({
		"job_knowledge": 0,
		"efficiency": 0,
		"attendance": 0,
		"communication": 0,
		"reliability": 0,
		"collaboration": 0,
		"comment": ""
	})

	const kpiData = [
		{
			'Performance': 'Job Knowledge',
			'num': data?.job_knowledge_employee,
			'reviewer': data?.job_knowledge_reviewer
		},
		{
			'Performance': 'Efficiency',
			'num': data?.efficiency_employee,
			'reviewer': data?.efficiency_reviewer
		},
		{
			'Performance': ' Attendance',
			'num': data?.attendance_employee,
			'reviewer': data?.attendance_reviewer
		},
		{
			'Performance': 'Software Development',
			'num': data?.communication_employee,
			'reviewer': data?.communication_reviewer
		},
		{
			'Performance': 'Team work',
			'num': data?.reliability_employee,
			'reviewer': data?.reliability_reviewer
		},
		{
			'Performance': 'Debugging',
			'num': data?.collaboration_employee,
			'reviewer': data?.collaboration_reviewer
		},
	];

	const kpiData3: any = ({
		Weight1: 20,
		Weight2: 15,
		Weight3: 20,
		Weight4: 20,
		Weight5: 15,
		Weight6: 10,
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


	useEffect(() => {
		setinput((prevState: any) => {
			return ({
				...prevState,
				job_knowledge: totalScore1,
				efficiency: totalScore2,
				attendance: totalScore3,
				communication: totalScore4,
				reliability: totalScore5,
				collaboration: totalScore6
			});
		});
	}, [setinput, totalScore1, totalScore2, totalScore3, totalScore4, totalScore5, totalScore6]);


	const reviews = [
		{ 'reviewer': data?.job_knowledge_employee },
		{ 'reviewer': data?.efficiency_reviewer },
		{ 'reviewer': data?.attendance_reviewer },
		{ 'reviewer': data?.communication_reviewer },
		{ 'reviewer': data?.reliability_reviewer },
		{ 'reviewer': data?.collaboration_reviewer },
	];

	//  @ts-ignore  
	const hod: any = Object.values(reviews).reduce((a, v) => (a = a + v?.reviewer), 0);


	return (
		<form>
			{/* // <form>
		// 	<div className="top-fields">
		// 		<p>{data?.month} | {year} </p>
		// 	</div>
		// 	<div className="evaluation-area_cont">
		// 		<div>
		// 			<div className="added-fields_cont">
		// 				{kpiData.map((item, i) => */}
			{/* // 					<div key={i} className="added-field">
		// 						<div className="factor_area">
		// 							<p>{item.Performance}</p>
		// 						</div>
		// 						<div className="rate_area">
		// 							<p>{item.num}</p>
		// 						</div>
		// 						<div className="btn_area">
		// 							<p>{item.reviewer}</p>
		// 						</div>
		// 					</div>
		// 				)}
		// 			</div> */}
			{/* // 		</div> */}
			{/* // 	</div> */}

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
									<p>{kpiData3.Weight1}</p>
								</div>
							</div>
							<div className="rate_area">
								<p>{data?.job_knowledge_employee}</p>
							</div>
							<div className="btn_area">
								{data?.job_knowledge_reviewer}
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
								<p>{data?.efficiency_employee}</p>
							</div>
							<div className="btn_area">
								{data?.efficiency_reviewer}
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
								<p>{data?.attendance_employee}</p>
							</div>
							<div className="btn_area">
								{data?.attendance_reviewer}
							</div>
						</div>
						<div className="added-field">
							<div className="factor_area">
								<p>Software Development</p>
								<div>
									<p>{kpiData3.Weight4}</p>
								</div>
							</div>
							<div className="rate_area">
								<p>{data?.communication_employee}</p>
							</div>
							<div className="btn_area">
								{data?.communication_reviewer}
							</div>
						</div>
						<div className="added-field">
							<div className="factor_area">
								<p>Team work</p>
								<div>
									<p>{kpiData3.Weight5}</p>
								</div>
							</div>
							<div className="rate_area">
								<p>{data?.reliability_employee}</p>
							</div>
							<div className="btn_area">
								{data?.reliability_reviewer}
							</div>
						</div>
						<div className="added-field">
							<div className="factor_area">
								<p>Debugging</p>
								<div>
									<p>{kpiData3.Weight5}</p>
								</div>
							</div>
							<div className="rate_area">
								<p>{data?.collaboration_employee}</p>
							</div>
							<div className="btn_area">
								<p>{data?.collaboration_reviewer}</p>
							</div>
						</div>
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
					{/* {data?.status === 'active' ? "" :
						<div> */}
					{/* @ts-ignore    */}
					{/* <textarea rows="4" placeholder="Add an extended comment" required
								value={input.comment}
								onChange={(e) => handleOnChange('comment', e.target.value)} />
							<Button variant="contained"
								className="Add-btn-modal" type="submit">{isLoading ? <Spinner animation="border" /> : 'Submit'}</Button>
						</div>
					} */}
				</div>
			</div>
		</form>
	)
}

export default KPIInfoDetails
