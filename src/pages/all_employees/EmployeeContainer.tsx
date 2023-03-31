import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import EmployeeNavTab from './EmployeeNavTab';
import AllEmployees from './AllEmployees';
import CreateRole from './CreateRole';

const EmployeeContainer = () => {
	const [isCheck, setIsCheck] = useState(false);
	const [data, setData] = useState(0);
	const [employee, setEmployee] = useState(0);
	const [showTitle, setShowTitle] = useState(false);

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
				<div>
					{showTitle ? "" : <EmployeeNavTab
						setIsCheck={setIsCheck}
						isCheck={isCheck}
						data={data}
						infodata={employee}
						text1={"All Employee"}
						text2={"Create Role"} />}

				</div>
				<div style={{ marginTop: "2rem" }}>
					{isCheck === false ? <AllEmployees setEmployee={setEmployee} /> : ""}
					{isCheck === true ? <CreateRole setShowTitle={setShowTitle} /> : ""}

				</div>
			</main>
		</div>
	)
}

export default EmployeeContainer