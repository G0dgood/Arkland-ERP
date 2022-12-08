import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import WeeklyReportTable from '../../components/table_component/WeeklyReportTable';
import WeeklyReportTable2 from '../../components/table_component/WeeklyReportTable2';
import WeeklyReportTable3 from '../../components/table_component/WeeklyReportTable3';
import WeeklyReportTable4 from '../../components/table_component/WeeklyReportTable4';
import WeeklyReportTable5 from '../../components/table_component/WeeklyReportTable5';
import WeeKlyReportButtomTabs from '../../components/WeeKlyReportButtomTabs';

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
	const [data, setData] = useState<any>("week 1")



	return (
		<div id="screen-wrapper">
			<Header toggleSideNav={toggleSideNav} />
			<Sidebar collapseNav={collapseNav} />
			<main>
				<div className='weeklycontainer'>
					<div>
						<div>
							<div className='weekly-top-container'>
								<div className='weeklyreporttop-container-card-1'>
									<div className='weekly-top-card-1-sub'>
										<p>EMPLOYEE NAME</p>
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
										<p>Execellent</p>
										<p>Above Average</p>
										<p>Average</p>
										<p>Above Average</p>
									</div>
								</div>
							</div>
							<div className='weekly-report-title'>
								<h4>{data.length === 0 ? "Week 1" : data[0]?.category}</h4>
							</div>
						</div>
					</div>
					<div>
						{data.length === 0 && <WeeklyReportTable />}
						{data[0]?.category === "Week 1" && <WeeklyReportTable />}
						{data[0]?.category === "Week 2" && <WeeklyReportTable2 />}
						{data[0]?.category === "Week 3" && <WeeklyReportTable3 />}
						{data[0]?.category === "Week 4" && <WeeklyReportTable4 />}
						{data[0]?.category === "Week 5" && <WeeklyReportTable5 />}


						<WeeKlyReportButtomTabs setData={setData} />
					</div>
				</div>
			</main>
		</div>
	)
}

export default WeeklyReport