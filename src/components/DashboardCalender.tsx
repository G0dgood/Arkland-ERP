import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import Header from './Header'
import Sidebar from './Sidebar'
import { Calendars } from './Calender';

const DashboardCalender = () => {
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
					<div className='DashboardCalender-top-btn' >
						<div className='Calender-top-btn-sup'>
							<div>
								<MdArrowBackIos size={20} />
							</div>
							<div>July 2022</div>
							<div>
								<MdArrowForwardIos size={20} />
							</div>
						</div>
						<div>
							<Button variant="contained" className="Create-event-Calender">
								Add event
							</Button>
						</div>
					</div>
					<div>
						<Calendars />
					</div>
				</div>
			</main>
		</div>
	)
}

export default DashboardCalender
