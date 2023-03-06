import React, { useEffect, useState } from 'react'
import RegisterNavTab from './KPINavTab';
import KPINavTab from './KPINavTab';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MyKPIAssessment from './MyKPIAssessment';
import KPIAssessment from './KPIAssessment';

const KpiContainer = () => {
	const [isCheck, setIsCheck] = useState(false);
	const [data, setData] = useState(0);

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
				<div >
					<KPINavTab setIsCheck={setIsCheck} isCheck={isCheck} data={data} />
				</div>
				<div style={{ marginTop: "2rem" }}>
					{/* <RegisterTable pageHeader={"Register User"} headerTitles={[]} setData={setData} /> */}
					{isCheck === false ? <MyKPIAssessment /> : ""}
					{isCheck === true ? <KPIAssessment /> : ""}

				</div>
			</main>
		</div>
	)
}

export default KpiContainer