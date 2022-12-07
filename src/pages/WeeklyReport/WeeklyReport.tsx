import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'

const WeeklyReport = () => {

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
				<div className='weeklycontainer'>
					<div  >
						{/* <div>ff</div>
						<div>ff</div> */}
						<div>
							{/* <div className='grading-system-contain'>
								<div> </div>
								<h4 className='grading-system-title'>Grading System</h4>
							</div> */}
							<div className='weekly-top-container'>
								<div className='weeklyreporttop-container-card-1'>
									{/* <div className='kpi-top-card-1'>Employee Appraisal </div> */}
									<div className='weekly-top-card-1-sub'>
										<p>Employee Name</p>
										<p className='weekly-top-card-1-sub-second-child'>Okoro Godwin Chinedu</p>
										<p>EMPLOYEE TITLE</p>
										<p>Software Developer</p>
										<p>DEPARTMENT</p>
										<p>I.T</p>
										<p>SUPERVISOR</p>
										<p>Mr Samuel</p>
										<p>SELF ASSESSMENT</p>
										<p>Execellent</p>
										<p>DATE</p>
										<p>30/11/2022</p>
									</div>
								</div>
								<div className='weekly-top-container-card-2'>
									<div className='weekly-grading-system'>
										<p>SELF ASSESSMENT OPTIONS</p>
										{/* <p className='weekly-grading-system-second-child'>Description</p> */}
										<p>Execellent</p>
										<p>Above Average</p>
										<p>Average</p>
										<p>Above Average</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default WeeklyReport