import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Button } from '@material-ui/core';

const KPIAssessment = () => {

	// @ts-ignore
	const userInfo: any = JSON?.parse(localStorage.getItem("userInfo"))
	const [collapseNav, setCollapseNav] = useState(() => {
		// @ts-ignore
		return JSON?.parse(localStorage.getItem("collapse")) || false;
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


	const [employeegrade, setemployeegrade] = useState<any>({
		employeegrade1: 0,
		employeegrade2: 0,
		employeegrade3: 0,
		employeegrade4: 0,
		employeegrade5: 0,
		employeegrade6: 0,
	})



	const [inputs, setInputs] = useState({
		job_knowledge: 15,
		efficiency: 15,
		attendance: 15,
		communication: 15,
		reliability: 15,
		collaboration: 20,
	})



	// @ts-ignore
	const [kpiData1, setkpiData1] = useState<any>({
		Performance1: 'Job Knowledge',
		Performance2: 'Efficiency',
		Performance3: ' Attendance',
		Performance4: 'Software Development',
		Performance5: 'Team work',
		Performance6: 'Debugging',
	});


	const [kpiData2, setkpiData2] = useState<any>({
		IndicatorDescription1: "Measures employee's relevant knowledge and essential skills, such as work practices, policies and procedures needed to do a particular job",
		IndicatorDescription2: "Maintaining the same standards and behaviors that lead to producing a high quality of work",
		IndicatorDescription3: "Frequency of times at work",
		IndicatorDescription4: "Completes clearly defined tasks and works and also learn the relevant technologies to improve the company sales mobile application solutions.",
		IndicatorDescription5: "Collaborate with other team members and  communicates when something is blocking.",
		IndicatorDescription6: "Helps debug technical problems. Submits issues so that we can document and improve our service.",
	});


	const [kpiData3, setkpiData3] = useState<any>({
		Weight1: 20,
		Weight2: 15,
		Weight3: 20,
		Weight4: 20,
		Weight5: 15,
		Weight6: 10,
	});


	const Weight = kpiData3.Weight1 +
		kpiData3.Weight2 +
		kpiData3.Weight3 +
		kpiData3.Weight4 +
		kpiData3.Weight5 +
		kpiData3.Weight6



	const handleOnChange1 = (input: string, value: any) => {
		setkpiData1((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};

	const handleOnChange2 = (input: string, value: any) => {
		setkpiData2((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};

	const handleOnChange3 = (input: string, value: any) => {
		setkpiData3((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};
	const handleOnChange4 = (input: string, value: any) => {
		setemployeegrade((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};
	const handleOnKPI = (input: string, value: any) => {
		setKpInputs((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};



	const totalScore1 = (kpiData3.Weight1 / 5) * employeegrade.employeegrade1
	const totalScore2 = (kpiData3.Weight2 / 5) * employeegrade.employeegrade2
	const totalScore3 = (kpiData3.Weight3 / 5) * employeegrade.employeegrade3
	const totalScore4 = (kpiData3.Weight4 / 5) * employeegrade.employeegrade4
	const totalScore5 = (kpiData3.Weight5 / 5) * employeegrade.employeegrade5
	const totalScore6 = (kpiData3.Weight6 / 5) * employeegrade.employeegrade6

	const [kpiscore, setkpiscore] = useState()
	useEffect(() => {
		const kpi: any = totalScore1 + totalScore2 + totalScore3 + totalScore4 + totalScore5 + totalScore6
		setkpiscore(kpi)
	}, [totalScore1, totalScore2, totalScore3, totalScore4, totalScore5, totalScore6])



	const [kpinputs, setKpInputs] = useState({
		month: 0,
		employee: "632941e5b20c61595d0a6208",
		reviewer: "632882a46cdfa02ee0ddbe28",
		job_knowledge: totalScore1,
		efficiency: totalScore2,
		attendance: totalScore3,
		communication: totalScore4,
		reliability: totalScore5,
		collaboration: totalScore6,
		comment: ""
	})

	console.log('kpinputs', kpinputs)


	useEffect(() => {
		setKpInputs((prevState: any) => {
			return ({
				...prevState,
				job_knowledge: totalScore1
			});
		});
	}, [kpinputs.job_knowledge, setKpInputs, totalScore1]);
	useEffect(() => {
		setKpInputs((prevState: any) => {
			return ({
				...prevState,
				efficiency: totalScore2
			});
		});
	}, [kpinputs.efficiency, setKpInputs, totalScore2]);
	useEffect(() => {
		setKpInputs((prevState: any) => {
			return ({
				...prevState,
				attendance: totalScore3
			});
		});
	}, [kpinputs.attendance, setKpInputs, totalScore3]);
	useEffect(() => {
		setKpInputs((prevState: any) => {
			return ({
				...prevState,
				communication: totalScore4
			});
		});
	}, [kpinputs.communication, setKpInputs, totalScore4]);

	useEffect(() => {
		setKpInputs((prevState: any) => {
			return ({
				...prevState,
				reliability: totalScore5
			});
		});
	}, [kpinputs.reliability, setKpInputs, totalScore5]);

	useEffect(() => {
		setKpInputs((prevState: any) => {
			return ({
				...prevState,
				collaboration: totalScore6
			});
		});
	}, [kpinputs.collaboration, setKpInputs, totalScore6]);

	const [data, setData] = useState([]);
	const [sortData, setSortData] = useState([]);
	const [isLoading, setisLoading] = useState(false);

	console.log('collaboration', data, sortData, isLoading)

	// useEffect(() => {
	// 	setisLoading(true)
	// 	const requestOptions = {
	// 		method: "POST",
	// 		headers: { "Content-Type": "application/json" },
	// 		body: JSON.stringify({ ...kpinputs }),
	// 	};
	// 	fetch(`${process.env.REACT_APP_API}/hr/appraisals`, requestOptions)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			setData(data);
	// 			setisLoading(false)
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 			setisLoading(false)
	// 		});
	// }, [kpinputs]);

	const handelkpi = () => {
		setisLoading(true)
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...kpinputs }),
		};
		fetch(`${process.env.REACT_APP_API}/hr/appraisals`, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				setData(data);
				setisLoading(false)
			})
			.catch((err) => {
				console.log(err, 'err');
				setisLoading(false)
			});
	}

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
							<p className='kpi-top-card-1-sub-second-child'>{userInfo?.full_name}</p>
							<p>Employee Role</p>
							<p> </p>
							<p>Employee ID</p>
							<p>{userInfo?.employee?.employee_id} </p>
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
			<div className='datacell-button-bottom-select'>
				<div className='table-datacell-button-bottom' style={{ marginRight: "20px" }}>
					<div className='table-datacell-button-bottom-color1'>Select Month:</div>
					<div className='table-datacell-button-bottom-color2'>
						<select value={kpinputs.month}
							onChange={(e) => handleOnKPI("month", e.target.value)}>
							<option>0</option>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
							<option>6</option>
							<option>7</option>
							<option>8</option>
							<option>9</option>
							<option>10</option>
							<option>11</option>
							<option>12</option>
						</select>
					</div>
				</div>
				<div className='table-datacell-button-bottom'>

					<div className='table-datacell-button-bottom-color1'>KPI SCORE:</div>
					<div className='table-datacell-button-bottom-color2'>{kpiscore}</div>
				</div>
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

							<tbody className="data-table-content">
								{/* one */}
								<tr className="data-table-row">
									<td className="table-datacell datatype-string">
										<input className='Performance-Indicator-input'
											value={kpiData1.Performance1}
											onChange={(e) => handleOnChange1("Performance1", e.target.value)} />
									</td>

									<td className="table-datacell datatype-numeric">
										<textarea
											id='kpi-textarea'
											className='Performance-Indicator-input2'
											value={kpiData2.IndicatorDescription2}
											onChange={(e) => handleOnChange2("IndicatorDescription1", e.target.value)} rows={4} />
									</td>

									<td className="table-datacell datatype-numeric">
										<input className='Performance-Indicator-input1'
											type='number'
											value={kpiData3.Weight1}
											onChange={(e) => handleOnChange3("Weight1", e.target.value)} />
									</td>

									<td className="table-datacell datatype-numeric">
										<select className='performance-field' name="score"
											value={employeegrade.employeegrade1}
											onChange={(e) => handleOnChange4("employeegrade1", e.target.value)}>
											<option>
											</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5">5</option>
										</select>
									</td>
									<td className="table-datacell datatype-numeric">
										<input className='Performance-Indicator-input1'
											value={totalScore1}
										/> </td>
								</tr>

								{/* two */}
								<tr className="data-table-row">
									<td className="table-datacell datatype-string">
										<input className='Performance-Indicator-input'
											value={kpiData1.Performance2}
											onChange={(e) => handleOnChange1("Performance2", e.target.value)} />
									</td>
									<td className="table-datacell datatype-numeric">
										<textarea
											id='kpi-textarea'
											className='Performance-Indicator-input2'
											value={kpiData2.IndicatorDescription2}
											onChange={(e) => handleOnChange2("IndicatorDescription2", e.target.value)} rows={5} />  </td>
									<td className="table-datacell datatype-numeric">
										<input className='Performance-Indicator-input1'
											value={kpiData3.Weight2}
											onChange={(e) => handleOnChange3("userId", e.target.value)} /> </td>
									<td className="table-datacell datatype-numeric">
										<select className='performance-field' name="score"
											value={employeegrade.employeegrade2}
											onChange={(e) => handleOnChange4("employeegrade2", e.target.value)}>
											<option>
											</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5">5</option>
										</select>
									</td>
									<td className="table-datacell datatype-numeric">
										<input className='Performance-Indicator-input1'
											value={totalScore2}
										/> </td>
								</tr>

								{/* three */}
								<tr className="data-table-row">
									<td className="table-datacell datatype-string">
										<input className='Performance-Indicator-input'
											value={kpiData1.Performance3}
											onChange={(e) => handleOnChange1("Performance3", e.target.value)} />
									</td>
									<td className="table-datacell datatype-numeric">
										<textarea
											id='kpi-textarea'
											className='Performance-Indicator-input2'
											value={kpiData2.IndicatorDescription3}
											onChange={(e) => handleOnChange2("IndicatorDescription3", e.target.value)} rows={5} />  </td>
									<td className="table-datacell datatype-numeric">
										<input className='Performance-Indicator-input1'
											value={kpiData3.Weight3}
											onChange={(e) => handleOnChange3("Weight3", e.target.value)} /> </td>
									<td className="table-datacell datatype-numeric">
										<select className='performance-field' name="score"
											value={employeegrade.employeegrade3}
											onChange={(e) => handleOnChange4("employeegrade3", e.target.value)}>
											<option>
											</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5">5</option>
										</select>
									</td>
									<td className="table-datacell datatype-numeric">
										<input className='Performance-Indicator-input1'
											value={totalScore3}
										/> </td>
								</tr>

								{/* four */}
								<tr className="data-table-row">
									<td className="table-datacell datatype-string">
										<input className='Performance-Indicator-input'
											value={kpiData1.Performance4}
											onChange={(e) => handleOnChange1("Performance4", e.target.value)} />
									</td>
									<td className="table-datacell datatype-numeric">
										<textarea
											id='kpi-textarea'
											className='Performance-Indicator-input2'
											value={kpiData2.IndicatorDescription4}
											onChange={(e) => handleOnChange2("kpiData2.IndicatorDescription4", e.target.value)} rows={5} />  </td>
									<td className="table-datacell datatype-numeric">
										<input className='Performance-Indicator-input1'
											value={kpiData3.Weight4}
											onChange={(e) => handleOnChange3("Weight3", e.target.value)} /> </td>
									<td className="table-datacell datatype-numeric">
										<select className='performance-field' name="score"
											value={employeegrade.employeegrade4}
											onChange={(e) => handleOnChange4("employeegrade4", e.target.value)}>
											<option>
											</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5">5</option>
										</select>
									</td>
									<td className="table-datacell datatype-numeric">
										<input className='Performance-Indicator-input1'
											value={totalScore4}
										/> </td>
								</tr>

								{/* five */}
								<tr className="data-table-row">
									<td className="table-datacell datatype-string">
										<input className='Performance-Indicator-input'
											value={kpiData1.Performance5}
											onChange={(e) => handleOnChange1("Performance5", e.target.value)} />
									</td>
									<td className="table-datacell datatype-numeric">
										<textarea
											id='kpi-textarea'
											className='Performance-Indicator-input2'
											value={kpiData2.IndicatorDescription5}
											onChange={(e) => handleOnChange2("IndicatorDescription5", e.target.value)} rows={5} />  </td>
									<td className="table-datacell datatype-numeric">
										<input className='Performance-Indicator-input1'
											value={kpiData3.Weight5}
											onChange={(e) => handleOnChange3("Weight5", e.target.value)} /> </td>
									<td className="table-datacell datatype-numeric">
										<select className='performance-field' name="score"
											value={employeegrade.employeegrade5}
											onChange={(e) => handleOnChange4("employeegrade5", e.target.value)}>
											<option>
											</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5">5</option>
										</select>
									</td>
									<td className="table-datacell datatype-numeric">
										<input className='Performance-Indicator-input1'
											value={totalScore5}
										/> </td>
								</tr>

								{/* six */}
								<tr className="data-table-row">
									<td className="table-datacell datatype-string">
										<input className='Performance-Indicator-input'
											value={kpiData1.Performance6}
											onChange={(e) => handleOnChange1("Performance6", e.target.value)} />
									</td>
									<td className="table-datacell datatype-numeric">
										<textarea
											id='kpi-textarea'
											className='Performance-Indicator-input2'
											value={kpiData2.IndicatorDescription6}
											onChange={(e) => handleOnChange2("IndicatorDescription6", e.target.value)} rows={5} />  </td>
									<td className="table-datacell datatype-numeric">
										<input className='Performance-Indicator-input1'
											value={kpiData3.Weight6}
											onChange={(e) => handleOnChange4("Weight6", e.target.value)} /> </td>
									<td className="table-datacell datatype-numeric">
										<select className='performance-field' name="score"
											value={employeegrade.employeegrade6}
											onChange={(e) => handleOnChange4("employeegrade6", e.target.value)}>
											<option>
											</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5">5</option>
										</select>
									</td>
									<td className="table-datacell datatype-numeric">
										<input className='Performance-Indicator-input1'
											value={totalScore6}
										/> </td>
								</tr>

							</tbody>
							{/* ))} */}
							<tr className="data-table-row">
								<td className="table-datacell datatype-string table-datacell-color" >  </td>
								<td className="table-datacell datatype-numeric table-datacell-color"> </td>
								<td className="table-datacell datatype-numeric table-datacell-color2">{Weight}</td>
								<td className="table-datacell datatype-numeric table-datacell-color">  </td>
								<td className="table-datacell datatype-numeric table-datacell-color2">{kpiscore}</td>
								{/* <td className="table-datacell datatype-numeric table-datacell-color">  </td>
								<td className="table-datacell datatype-numeric table-datacell-color2"> </td> */}
							</tr>
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
			<div className="board">
				<div className="shareCommentContainer">
					<textarea id="shareCommentText" placeholder="Write a comment.."
						value={kpinputs.comment}
						onChange={(e) => handleOnKPI("comment", e.target.value)}></textarea>
					{/* <button className="btn btn-success"> Share</button> */}
					<div className='con-btn-success'>
						{/* <Button variant="contained" className="show-btn btn-success"  >
							Show All
						</Button> */}
						<Button variant="contained" className="Add-btn" onClick={handelkpi}>
							{isLoading ? "loading..." : "	Create KPI"}

						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}



export default KPIAssessment