import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react'
import { BsCheckCircle, BsXCircle } from 'react-icons/bs';
import { GoPlus } from 'react-icons/go';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
// import { MainSearch } from '../../components/TableOptions';

const Leave = () => {
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
				<div className='allemployees-container-main' >
					<div className='allemployees-container-sup'>
						<div className='allemployees-sup-item1'>
							<Button variant="contained" className="Add-btn">
								<GoPlus size={20} className="icon-space" />
								Team Leave Applications
							</Button>
						</div>
						<div className='allemployees-sup-item2'>
							<Button variant="contained" className="Add-btn">
								All Leave Applications
							</Button>
						</div>
					</div>

					<div>
						<Button variant="contained" className="Add-btn">
							Apply for Leave
						</Button>
					</div>
				</div>

				<section className="md-ui component-data-table">

					<div className="main-table-wrapper">
						<table className="main-table-content">
							<thead className="data-table-header">
								<tr className="data-table-row">
									<td className="table-datacell datatype-string">Leave Type</td>
									<td className="table-datacell datatype-numeric">Start Date</td>
									<td className="table-datacell datatype-numeric">End Date</td>
									<td className="table-datacell datatype-numeric">HOD Approval</td>
									<td className="table-datacell datatype-numeric">Final Approval</td>
									<td className="table-datacell datatype-numeric">
										Status
									</td>
								</tr>
							</thead>
							<tbody className="data-table-content">
								<tr className="data-table-row">
									<td className="table-datacell datatype-string">Frozen yogurt</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">
										<BsCheckCircle size={25} color={"red"} className="icon-bold" />
									</td>
									<td className="table-datacell datatype-numeric">
										<BsCheckCircle size={25} color={"green"} />
									</td>
									<td className="table-datacell datatype-numeric">
										<Button variant="outlined" id="leave-status-btn-error">
											Not Approved
										</Button>
									</td>


								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-string">Ice cream sandwich</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">
										<BsCheckCircle size={25} color={"green"} />
									</td>
									<td className="table-datacell datatype-numeric">
										<BsXCircle size={25} color={"red"} />
									</td>
									<td className="table-datacell datatype-numeric">
										<Button variant="outlined" id="leave-status-btn">
											Approved
										</Button>
									</td>


								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-string">Eclair</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">
										<BsXCircle size={25} color={"red"} />
									</td>
									<td className="table-datacell datatype-numeric">
										<BsCheckCircle size={25} color={"green"} />
									</td>
									<td className="table-datacell datatype-numeric">
										<Button variant="outlined" id="leave-status-btn-error">
											Not Approved
										</Button>
									</td>


								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-string">Cupcake</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">
										<BsCheckCircle size={25} color={"green"} />
									</td>
									< td className="table-datacell datatype-numeric">
										<BsXCircle size={25} color={"red"} />
									</td>
									<td className="table-datacell datatype-numeric">
										<Button variant="outlined" id="leave-status-btn">
											Approved
										</Button>
									</td>


								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-string">Gingerbread</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">
										<BsXCircle size={25} color={"red"} />
									</td>
									<td className="table-datacell datatype-numeric">
										<BsCheckCircle size={25} color={"green"} />
									</td>
									<td className="table-datacell datatype-numeric">
										<Button variant="outlined" id="leave-status-btn-error">
											Not Approved
										</Button>
									</td>
								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-string">Jellybean</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">
										<BsXCircle size={25} color={"red"} />
									</td>
									<td className="table-datacell datatype-numeric">
										<BsXCircle size={25} color={"red"} />
									</td>
									<td className="table-datacell datatype-numeric">
										<Button variant="outlined" id="leave-status-btn-error">
											Not Approved
										</Button>
									</td>
								</tr>
								<tr>
									<td className="table-datacell datatype-string">Lollipop</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">
										<BsXCircle size={25} color={"red"} />
									</td>
									<td className="table-datacell datatype-numeric">
										<BsCheckCircle size={25} color={"green"} />
									</td>
									<td className="table-datacell datatype-numeric">
										<Button variant="outlined" id="leave-status-btn">
											Approved
										</Button>
									</td>


								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-string">Honeycomb</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">
										<BsXCircle size={25} color={"green"} />
									</td>
									<td className="table-datacell datatype-numeric">
										<BsXCircle size={25} color={"red"} />
									</td>
									<td className="table-datacell datatype-numeric">
										<Button variant="outlined" id="leave-status-btn">
											Approved
										</Button>
									</td>


								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-string">Donut</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">
										<BsCheckCircle size={25} color={"green"} />
									</td>
									<td className="table-datacell datatype-numeric">
										<BsXCircle size={25} color={"red"} />
									</td>
									<td className="table-datacell datatype-numeric">
										<Button variant="outlined" id="leave-status-btn-error">
											Not Approved
										</Button>
									</td>


								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-string">KitKat</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">
										<BsCheckCircle size={25} color={"green"} />
									</td>
									<td className="table-datacell datatype-numeric">
										<BsXCircle size={25} color={"red"} />
									</td>
									<td className="table-datacell datatype-numeric">
										<Button variant="outlined" id="leave-status-btn">
											Approved
										</Button>
									</td>


								</tr>
							</tbody>
						</table>
					</div>

				</section>
			</main>
		</div>
	)
}

export default Leave
