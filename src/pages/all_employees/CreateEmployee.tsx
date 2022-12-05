import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import AddEmployeeNav from './AddEmployeeNav';
import AddEmployeeTitle from './AddEmployeeTitle';
import Address from './employeeInputs/Address';
import Employment from './employeeInputs/Employment';
import Essentials from './employeeInputs/Essentials';
import Finance from './employeeInputs/Finance';
import Refrence from './employeeInputs/Refrence';

const CreateEmployee = () => {
	// State to store count value 
	const [active, setActive] = useState<number>(1)
	useEffect(() => {
		setActive(active)
	}, [active])

	console.log('active', active)

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
					<AddEmployeeTitle setActive={setActive} active={active} />
					<AddEmployeeNav active={active} />
					<div className='all-inputs-container'>
						{active === 1 && <Essentials />}
						{active === 2 && <Finance />}
						{active === 3 && <Refrence />}
						{active === 4 && <Employment />}
						{active === 5 && <Address />}

					</div>
				</div>
			</main>
		</div>
	)
}

export default CreateEmployee



