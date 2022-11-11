import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { GoPlus, GoSearch } from "react-icons/go";
import { FiBarChart, FiShoppingCart, FiTool, FiUsers } from 'react-icons/fi';
import { RiWallet2Line } from 'react-icons/ri';
import { BiBox } from 'react-icons/bi';
import { AiOutlineDesktop } from 'react-icons/ai';
import { MainSearch } from '../../components/TableOptions';

const Departments = () => {
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
				<div className='departments-main-container'>
					<div><Button variant="contained" className='Add-btn'> <GoPlus /> {' '}Create Department</Button></div>
					<MainSearch placeholder={'Search...          All Employees'} />
				</div>

				<div className='Department-item'>
					<div className='Department-item-sub-main'>
						<div className='Department-container-item-sub'>
							<FiShoppingCart size={50} />
						</div>
						<p className='Department-item-sub-p'>Procurement</p>
					</div>
					<div className='Department-item-sub-main'>
						<div className='Department-container-item-sub'>
							<FiTool size={50} />
						</div>
						<p className='Department-item-sub-p'>Engineering</p>
					</div>
					<div className='Department-item-sub-main'>
						<div className='Department-container-item-sub'>
							<RiWallet2Line size={50} />
						</div>
						<p className='Department-item-sub-p'>Finance</p>
					</div>
					<div className='Department-item-sub-main'>
						<div className='Department-container-item-sub'>
							<FiUsers size={50} />
						</div>
						<p className='Department-item-sub-p'>Human Resource</p>
					</div>
					<div className='Department-item-sub-main'>
						<div className='Department-container-item-sub'>
							<BiBox size={50} />
						</div>
						<p className='Department-item-sub-p'>Inventory</p>
					</div>
					<div className='Department-item-sub-main'>
						<div className='Department-container-item-sub'><AiOutlineDesktop size={50} /></div>
						<p className='Department-item-sub-p'>IT</p>
					</div>
					<div className='Department-item-sub-main'>
						<div className='Department-container-item-sub'><FiBarChart size={50} /></div>
						<p className='Department-item-sub-p'>Budget</p>
					</div>
				</div>
			</main>
		</div>
	)
}

export default Departments