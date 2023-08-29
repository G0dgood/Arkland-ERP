import React, { useEffect, useState } from 'react'
import TotalInventory from './Reports/TotalInventory';
import Search from './Search';
import SoldInventory from './Reports/SoldInventory';
import AssignInventory from './Reports/AssignInventory';

const Application = () => {

	const [activeTab, setActiveTab] = useState(1)
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
	}

	return (
		<div id="reports">
			<h3 className="page-title">Reports</h3>
			<ul className="nav-tabs">
				<li className={activeTab === 1 ? "active" : ""} onClick={() => setActiveTab(1)}>Total Inventory</li>
				<li className={activeTab === 2 ? "active" : ""} onClick={() => setActiveTab(2)}>Inventory Assign</li>
				<li className={activeTab === 3 ? "active" : ""} onClick={() => setActiveTab(3)}>Inventory Sold</li>
			</ul>
			<Search ID={"Item ID"} Date={true} State={true} search={true} />
			<div className="tab-panel">
				{activeTab === 1 && (
					<TotalInventory />
				)}
				{activeTab === 2 && (
					<AssignInventory />
				)}
				{activeTab === 3 && (
					<SoldInventory />
				)}
			</div>
		</div>
	)
}

export default Application
