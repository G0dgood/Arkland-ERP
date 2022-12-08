import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

const KPIAssessment = () => {
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
	return (
		<div id="screen-wrapper">
			<Header toggleSideNav={toggleSideNav} />
			<Sidebar collapseNav={collapseNav} />
			<main>
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
								<p className='kpi-top-card-1-sub-second-child'> </p>
								<p>Employee Role</p>
								<p> </p>
								<p>Employee ID</p>
								<p> </p>
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

				<div className='kpi-top-container-card-3'>
					<section className="md-ui component-data-table">

						<div className="main-table-wrapper">
							<table className="main-table-content">
								<thead className="data-table-header">
									<tr className="data-table-row">
										<td className="table-datacell datatype-numeric">Key Performance Indicator</td>
										<td className="table-datacell datatype-numeric">Indicator Description</td>
										<td className="table-datacell datatype-numeric">Weight</td>
										<td className="table-datacell datatype-numeric">Employee Grade</td>
										<td className="table-datacell datatype-numeric">Employee Score</td>
										<td className="table-datacell datatype-numeric">Supervisor Grade</td>
										<td className="table-datacell datatype-numeric">Supervisor Score</td>

									</tr>
								</thead>
								<tbody className="data-table-content">
									<tr className="data-table-row">

										<td className="table-datacell datatype-string">Key Performance Indicator</td>
										<td className="table-datacell datatype-numeric"> Lorem ipsum dolor sit amet, consectetur adip.</td>
										<td className="table-datacell datatype-numeric">20</td>
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
										<td className="table-datacell datatype-numeric"></td>
										<td className="table-datacell datatype-numeric">
											<select className='performance-field' name="score"  >
												<option>
												</option>
												<option value="1">1</option>
												<option value="2">2</option>
												<option value="3">3</option>
												<option value="4">4</option>
											</select></td>
										<td className="table-datacell datatype-numeric"></td>


									</tr>
									<tr className="data-table-row">
										<td className="table-datacell datatype-string"> Efficiency</td>
										<td className="table-datacell datatype-numeric"> Lorem ipsum dolor sit amet, consectetur adip.</td>
										<td className="table-datacell datatype-numeric">20 </td>
										<td className="table-datacell datatype-numeric">	<select className='performance-field' name="score"  >
											<option>
											</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
										</select></td>
										<td className="table-datacell datatype-numeric"> </td>
										<td className="table-datacell datatype-numeric"> 	<select className='performance-field' name="score"  >
											<option>
											</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
										</select></td>
										<td className="table-datacell datatype-numeric"> </td>


									</tr>
									<tr className="data-table-row">
										<td className="table-datacell datatype-string">Attendance </td>
										<td className="table-datacell datatype-numeric">Lorem ipsum dolor sit amet, consectetur adip. </td>
										<td className="table-datacell datatype-numeric"> 20</td>
										<td className="table-datacell datatype-numeric"> 	<select className='performance-field' name="score"  >
											<option>
											</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
										</select></td>
										<td className="table-datacell datatype-numeric"> </td>
										<td className="table-datacell datatype-numeric"> 	<select className='performance-field' name="score"  >
											<option>
											</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
										</select></td>
										<td className="table-datacell datatype-numeric"> </td>


									</tr>
									<tr className="data-table-row">
										<td className="table-datacell datatype-string"> Feedback</td>
										<td className="table-datacell datatype-numeric"> Lorem ipsum dolor sit amet, consectetur adip.</td>
										<td className="table-datacell datatype-numeric">20 </td>
										<td className="table-datacell datatype-numeric"> 	<select className='performance-field' name="score"  >
											<option>
											</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
										</select></td>
										<td className="table-datacell datatype-numeric"> </td>
										<td className="table-datacell datatype-numeric">	<select className='performance-field' name="score"  >
											<option>
											</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
										</select> </td>
										<td className="table-datacell datatype-numeric"> </td>

									</tr>
									<tr className="data-table-row">
										<td className="table-datacell datatype-string"> Consistency</td>
										<td className="table-datacell datatype-numeric"> Lorem ipsum dolor sit amet, consectetur adip.</td>
										<td className="table-datacell datatype-numeric">20 </td>
										<td className="table-datacell datatype-numeric"> 	<select className='performance-field' name="score"  >
											<option>
											</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
										</select></td>
										<td className="table-datacell datatype-numeric"> </td>
										<td className="table-datacell datatype-numeric"> 	<select className='performance-field' name="score"  >
											<option>
											</option>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
										</select></td>
										<td className="table-datacell datatype-numeric"> </td>
									</tr>
									<tr className="data-table-row">
										<td className="table-datacell datatype-string table-datacell-color" >  </td>
										<td className="table-datacell datatype-numeric table-datacell-color">  </td>
										<td className="table-datacell datatype-numeric table-datacell-color2">100</td>
										<td className="table-datacell datatype-numeric table-datacell-color">  </td>
										<td className="table-datacell datatype-numeric table-datacell-color2"> </td>
										<td className="table-datacell datatype-numeric table-datacell-color">  </td>
										<td className="table-datacell datatype-numeric table-datacell-color2"> </td>
									</tr>
								</tbody>
							</table>
						</div>
					</section>
					<div className='table-datacell-button-bottom'>
						<div className='table-datacell-button-bottom-color1'>KPI SCORE:</div>
						<div className='table-datacell-button-bottom-color2'>100</div>
					</div>

					<div className='emp-reconmentdetion'>
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
					</div>
				</div>
			</main>
		</div>
	)
}



export default KPIAssessment