import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'

const CreateEmployee = () => {


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
				<div className='addemployeecontainer'>
					<div className='addemployeecontainer-sup'>
						<h4 className='addemployeecontainer-title'>Add Employee</h4>
						<div className='addemployee-sup'>
							<div>
								<Button variant="outlined" className="addemployee-back">
									BACK
								</Button>
							</div>
							<div className='addemployee-space' />
							<div>
								<Button variant="contained" className="addemployee-back2">
									CONTINUE
								</Button>
							</div>
						</div>
					</div>
					<div className='addemployee-essential-tab'>
						<div className='essential-tab'>
							<div className='vl'>
								<div>ff</div>
								{/* <div className='vl-hline'> </div> */}
							</div>
							<div>ESSENTIAL</div>
						</div>
						<div className='essential-tab'>
							<div className='vl'>
								<div>ff</div>
								<div className='vl-hline'> </div>
							</div>
							<div>ESSENTIAL</div>
						</div>
						<div className='essential-tab'>
							<div className='vl'>
								<div>ff</div>
								<div className='vl-hline'> </div>
							</div>
							<div>ESSENTIAL</div>
						</div>
						<div className='essential-tab'>
							<div className='vl'>
								<div>ff</div>
								<div className='vl-hline'> </div>
							</div>
							<div>ESSENTIAL</div>
						</div>
						<div className='essential-tab'>
							<div className='vl'>
								<div>ff</div>
								{/* <div className='vl-hline'> </div> */}
							</div>
							<div>ESSENTIAL</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default CreateEmployee