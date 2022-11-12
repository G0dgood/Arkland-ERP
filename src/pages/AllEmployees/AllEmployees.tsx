import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs';
import { FiEdit, FiLock } from 'react-icons/fi';
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

					<section className="md-ui component-data-table">
						{/* <header className="main-table-header">
							<h1 className="table-header--title">Nutrition</h1>
							<span className="table-header--icons"><i className="material-icons">filter_list</i><i className="material-icons">more_vert</i>
							</span>
						</header> */}
						<div className="main-table-wrapper">
							<table className="main-table-content">
								<thead className="data-table-header">
									<tr className="data-table-row">
										<td className="table-datacell datatype-string">EMPLOYEE ID</td>
										<td className="table-datacell datatype-numeric">FIRST NAME</td>
										<td className="table-datacell datatype-numeric">MIDDLE NAME</td>
										<td className="table-datacell datatype-numeric">LAST NAME</td>
										<td className="table-datacell datatype-numeric">EMAIL</td>
										<td className="table-datacell datatype-numeric">ROLE</td>
										<td className="table-datacell datatype-numeric">DEPARTMENT</td>
										<td className="table-datacell datatype-numeric">ACTIVE USER</td>
									</tr>
								</thead>
								<tbody className="data-table-content">
									<tr className="data-table-row">
										<td className="table-datacell datatype-string">Frozen yogurt</td>
										<td className="table-datacell datatype-numeric">159</td>
										<td className="table-datacell datatype-numeric">6.0</td>
										<td className="table-datacell datatype-numeric">24</td>
										<td className="table-datacell datatype-numeric">4.0</td>
										<td className="table-datacell datatype-numeric">87</td>
										<td className="table-datacell datatype-numeric">14%</td>
										<td className="table-datacell datatype-numeric">
											<div className='table-active-items'>
												<span><BsCheckCircle size={18} color={"green"} /></span>
												<span>
													<FiEdit size={18} /> {"  "} <FiLock size={18} />
												</span>
											</div>
										</td>

									</tr>
									<tr className="data-table-row">
										<td className="table-datacell datatype-string">Ice cream sandwich</td>
										<td className="table-datacell datatype-numeric">237</td>
										<td className="table-datacell datatype-numeric">9.0</td>
										<td className="table-datacell datatype-numeric">37</td>
										<td className="table-datacell datatype-numeric">4.3</td>
										<td className="table-datacell datatype-numeric">129</td>
										<td className="table-datacell datatype-numeric">8%</td>
										<td className="table-datacell datatype-numeric">
											<div className='table-active-items'>
												<span><BsCheckCircle size={18} color={"green"} /></span>
												<span>
													<FiEdit size={18} /> {"  "} <FiLock size={18} />
												</span>
											</div>
										</td>

									</tr>
									<tr className="data-table-row">
										<td className="table-datacell datatype-string">Eclair</td>
										<td className="table-datacell datatype-numeric">262</td>
										<td className="table-datacell datatype-numeric">16.0</td>
										<td className="table-datacell datatype-numeric">24</td>
										<td className="table-datacell datatype-numeric">6.0</td>
										<td className="table-datacell datatype-numeric">337</td>
										<td className="table-datacell datatype-numeric">6%</td>
										<td className="table-datacell datatype-numeric">
											<div className='table-active-items'>
												<span>
													<BsXCircle size={18} color={"red"} />
												</span>
												<span>
													<FiEdit size={18} /> {"  "} <FiLock size={18} />
												</span>
											</div>
										</td>

									</tr>
									<tr className="data-table-row">
										<td className="table-datacell datatype-string">Cupcake</td>
										<td className="table-datacell datatype-numeric">305</td>
										<td className="table-datacell datatype-numeric">3.7</td>
										<td className="table-datacell datatype-numeric">67</td>
										<td className="table-datacell datatype-numeric">4.3</td>
										<td className="table-datacell datatype-numeric">413</td>
										<td className="table-datacell datatype-numeric">3%</td>
										<td className="table-datacell datatype-numeric">
											<div className='table-active-items'>
												<span>			<BsXCircle size={18} color={"red"} /></span>
												<span>
													<FiEdit size={18} /> {"  "} <FiLock size={18} />
												</span>
											</div>
										</td>

									</tr>
									<tr className="data-table-row">
										<td className="table-datacell datatype-string">Gingerbread</td>
										<td className="table-datacell datatype-numeric">356</td>
										<td className="table-datacell datatype-numeric">16.0</td>
										<td className="table-datacell datatype-numeric">49</td>
										<td className="table-datacell datatype-numeric">3.9</td>
										<td className="table-datacell datatype-numeric">327</td>
										<td className="table-datacell datatype-numeric">7%</td>
										<td className="table-datacell datatype-numeric">		<div className='table-active-items'>
											<span><BsCheckCircle size={18} color={"green"} /></span>
											<span>
												<FiEdit size={18} /> {"  "} <FiLock size={18} />
											</span>
										</div>
										</td>

									</tr>
									<tr className="data-table-row">
										<td className="table-datacell datatype-string">Jellybean</td>
										<td className="table-datacell datatype-numeric">375</td>
										<td className="table-datacell datatype-numeric">0.0</td>
										<td className="table-datacell datatype-numeric">94</td>
										<td className="table-datacell datatype-numeric">0.0</td>
										<td className="table-datacell datatype-numeric">50</td>
										<td className="table-datacell datatype-numeric">0%</td>
										<td className="table-datacell datatype-numeric"><div className='table-active-items'>
											<span><BsCheckCircle size={18} color={"green"} /></span>
											<span>
												<FiEdit size={18} /> {"  "} <FiLock size={18} />
											</span>
										</div></td>

									</tr>
									<tr>
										<td className="table-datacell datatype-string">Lollipop</td>
										<td className="table-datacell datatype-numeric">392</td>
										<td className="table-datacell datatype-numeric">0.2</td>
										<td className="table-datacell datatype-numeric">98</td>
										<td className="table-datacell datatype-numeric">0</td>
										<td className="table-datacell datatype-numeric">38</td>
										<td className="table-datacell datatype-numeric">0%</td>
										<td className="table-datacell datatype-numeric"><div className='table-active-items'>
											<span><BsCheckCircle size={18} color={"green"} /></span>
											<span>
												<FiEdit size={18} /> {"  "} <FiLock size={18} />
											</span>
										</div></td>

									</tr>
									<tr className="data-table-row">
										<td className="table-datacell datatype-string">Honeycomb</td>
										<td className="table-datacell datatype-numeric">408</td>
										<td className="table-datacell datatype-numeric">3.2</td>
										<td className="table-datacell datatype-numeric">87</td>
										<td className="table-datacell datatype-numeric">6.5</td>
										<td className="table-datacell datatype-numeric">562</td>
										<td className="table-datacell datatype-numeric">0%</td>
										<td className="table-datacell datatype-numeric"><div className='table-active-items'>
											<span><BsCheckCircle size={18} color={"green"} /></span>
											<span>
												<FiEdit size={18} /> {"  "} <FiLock size={18} />
											</span>
										</div></td>

									</tr>
									<tr className="data-table-row">
										<td className="table-datacell datatype-string">Donut</td>
										<td className="table-datacell datatype-numeric">452</td>
										<td className="table-datacell datatype-numeric">25.0</td>
										<td className="table-datacell datatype-numeric">51</td>
										<td className="table-datacell datatype-numeric">4.9</td>
										<td className="table-datacell datatype-numeric">326</td>
										<td className="table-datacell datatype-numeric">2%</td>
										<td className="table-datacell datatype-numeric"><div className='table-active-items'>
											<span>			<BsXCircle size={18} color={"red"} /></span>
											<span>
												<FiEdit size={18} /> {"  "} <FiLock size={18} />
											</span>
										</div></td>

									</tr>
									<tr className="data-table-row">
										<td className="table-datacell datatype-string">KitKat</td>
										<td className="table-datacell datatype-numeric">518</td>
										<td className="table-datacell datatype-numeric">26.0</td>
										<td className="table-datacell datatype-numeric">65</td>
										<td className="table-datacell datatype-numeric">7</td>
										<td className="table-datacell datatype-numeric">54</td>
										<td className="table-datacell datatype-numeric">12%</td>
										<td className="table-datacell datatype-numeric"><div className='table-active-items'>
											<span><BsCheckCircle size={18} color={"green"} /></span>
											<span>
												<FiEdit size={18} /> {"  "} <FiLock size={18} />
											</span>
										</div></td>

									</tr>
								</tbody>
							</table>
						</div>
						{/* <footer className="main-table-footer">
							<span className="rows-selection">
								<span className="rows-selection-label">Rows per page:</span>
								<span className="rows-selection-dropdown">10<i className="material-icons">arrow_drop_down</i></span>
							</span>
							<span className="rows-amount">1-10 of 100</span>
							<span className="table-pagination">
								<i className="material-icons">keyboard_arrow_left</i>
								<i className="material-icons">keyboard_arrow_right</i>
							</span>
						</footer> */}
					</section>
				</div>
			</main>
		</div>
	)
}

export default AllEmployees
