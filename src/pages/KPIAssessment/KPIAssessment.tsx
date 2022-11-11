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
								<p className='kpi-top-card-1-sub-second-child'>dd</p>
								<p>Employee Role</p>
								<p>d</p>
								<p>Employee ID</p>
								<p>d</p>
								<p>Review Date</p>
								<p>d</p>
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
					ffffff
				</div>
			</main>
		</div>
	)
}

export default KPIAssessment