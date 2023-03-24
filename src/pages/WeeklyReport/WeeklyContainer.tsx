import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import KPINavTab from '../kpi_assessment/KPINavTab';
import WeeklyReport from './WeeklyReport';
import TeamWeeklyReport from './TeamWeeklyReport';

const WeeklyContainer = () => {
	const [isCheck, setIsCheck] = useState(false);
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


	return (
		<div id="screen-wrapper">
			<Header toggleSideNav={toggleSideNav} />
			<Sidebar collapseNav={collapseNav} />
			<main>
				<div >
					<KPINavTab
						setIsCheck={setIsCheck}
						isCheck={isCheck}
						infodata={0}
						text1={"My weekly Report"}
						text2={"Create weekly Report"}
					/>
				</div>
				<div style={{ marginTop: "2rem" }}>
					{/* <RegisterTable pageHeader={"Register User"} headerTitles={[]} setData={setData} /> */}
					{isCheck === false ? <TeamWeeklyReport /> : ""}
					{isCheck === true ? <WeeklyReport /> : ""}

				</div>
			</main>
		</div>
	)
}

export default WeeklyContainer