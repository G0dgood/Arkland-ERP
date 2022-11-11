import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { GoPlus } from 'react-icons/go';
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { EntriesPerPage, MainSearch } from '../../components/TableOptions';

const AllEmployees = () => {


	const [data, setData] = useState([]);

	useEffect(() => {
		// setLoading(true)
		fetch('https://jsonplaceholder.typicode.com/users')

			.then((response) => response.json())
			.then((data) => {
				setData(data);
				// setLoading(false)
			})
			.catch((err) => {
				console.log(err);
				// setLoading(false)
			});
	}, []);

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

	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "10";
	});

	useEffect(() => {
		localStorage.setItem("reportsPerPage", entriesPerPage);
	}, [entriesPerPage]);

	return (
		<div id="screen-wrapper">
			<Header toggleSideNav={toggleSideNav} />
			<Sidebar collapseNav={collapseNav} />
			<main>
				<div className='allemployees-container'  >
					<div className='allemployees-container-main' >
						<div className='allemployees-container-sup'>
							<div className='allemployees-sup-item1'>
								<Button variant="contained" className="Add-btn">
									<GoPlus />		Create Employee
								</Button>
							</div>
							<div className='allemployees-sup-item2'>
								<Button variant="contained" className="Add-btn">
									Warning List
								</Button>
							</div>
							<div>
								<EntriesPerPage
									data={data}
									entriesPerPage={entriesPerPage}
									setEntriesPerPage={setEntriesPerPage}
								/>
							</div>
						</div>

						<div>
							<MainSearch placeholder={'Search...          Departments'} />
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default AllEmployees
