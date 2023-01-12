import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import { FaArrowLeft } from 'react-icons/fa';
import { MainSearch } from '../../../components/TableOptions';

const Finance = () => {

	const navigate = useNavigate();
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
		<div id="screen-wrapper">
			<Header toggleSideNav={toggleSideNav} />
			<Sidebar collapseNav={collapseNav} />
			<main>
				<div className='SiteWorkermaindiv'>
					<div className='SiteWorkermaindivsub'>
						<Button variant="contained" className="back-btn-icon" id="Add-btn-sub" onClick={() => navigate("/departments")}>
							<FaArrowLeft size={25} />
						</Button>

						<span className='SupportmainTitleh3'>Finance</span>
					</div>
					<div>
						<MainSearch placeholder={'Search...          Finance'} />
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
								<tr className="data-table-row" >
									<td className="table-datacell datatype-numeric">EMPLOYEE ID</td>
									<td className="table-datacell datatype-numeric">FIRST NAME</td>
									<td className="table-datacell datatype-numeric">MIDDLE NAME</td>
									<td className="table-datacell datatype-numeric">LAST NAME</td>
									<td className="table-datacell datatype-numeric">EMAIL</td>
									<td className="table-datacell datatype-numeric">ROLE</td>
									<td className="table-datacell datatype-numeric">DEPARTMENT</td>
									<td className="table-datacell datatype-numeric">DATE OF EMPLOYMENT</td>

								</tr>
							</thead>
							<tbody className="data-table-content">
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric">asl/adm/264</td>
									<td className="table-datacell datatype-numeric">James</td>
									<td className="table-datacell datatype-numeric">Segun</td>
									<td className="table-datacell datatype-numeric">Abiodun</td>
									<td className="table-datacell datatype-numeric">j.abiodun@arklandstructuresltd.com</td>
									<td className="table-datacell datatype-numeric">IT Support</td>
									<td className="table-datacell datatype-numeric">IT </td>
									<td className="table-datacell datatype-numeric">31-08-2022 </td>

								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric">asl/adm/264</td>
									<td className="table-datacell datatype-numeric">James</td>
									<td className="table-datacell datatype-numeric">Segun</td>
									<td className="table-datacell datatype-numeric">Abiodun</td>
									<td className="table-datacell datatype-numeric">j.abiodun@arklandstructuresltd.com</td>
									<td className="table-datacell datatype-numeric">IT Support</td>
									<td className="table-datacell datatype-numeric">IT </td>
									<td className="table-datacell datatype-numeric">31-08-2022 </td>
								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric">asl/adm/264</td>
									<td className="table-datacell datatype-numeric">James</td>
									<td className="table-datacell datatype-numeric">Segun</td>
									<td className="table-datacell datatype-numeric">Abiodun</td>
									<td className="table-datacell datatype-numeric">j.abiodun@arklandstructuresltd.com</td>
									<td className="table-datacell datatype-numeric">IT Support</td>
									<td className="table-datacell datatype-numeric">IT </td>
									<td className="table-datacell datatype-numeric">31-08-2022 </td>
								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric">asl/adm/264</td>
									<td className="table-datacell datatype-numeric">James</td>
									<td className="table-datacell datatype-numeric">Segun</td>
									<td className="table-datacell datatype-numeric">Abiodun</td>
									<td className="table-datacell datatype-numeric">j.abiodun@arklandstructuresltd.com</td>
									<td className="table-datacell datatype-numeric">IT Support</td>
									<td className="table-datacell datatype-numeric">Architecture </td>
									<td className="table-datacell datatype-numeric">31-08-2022  </td>
								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric">asl/adm/264</td>
									<td className="table-datacell datatype-numeric">James</td>
									<td className="table-datacell datatype-numeric">Segun</td>
									<td className="table-datacell datatype-numeric">Abiodun</td>
									<td className="table-datacell datatype-numeric">j.abiodun@arklandstructuresltd.com</td>
									<td className="table-datacell datatype-numeric">IT Support</td>
									<td className="table-datacell datatype-numeric">IT </td>
									<td className="table-datacell datatype-numeric">31-08-2022 </td>
								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric">asl/adm/264</td>
									<td className="table-datacell datatype-numeric">James</td>
									<td className="table-datacell datatype-numeric">Segun</td>
									<td className="table-datacell datatype-numeric">Abiodun</td>
									<td className="table-datacell datatype-numeric">j.abiodun@arklandstructuresltd.com</td>
									<td className="table-datacell datatype-numeric">IT Support</td>
									<td className="table-datacell datatype-numeric">Architecture </td>
									<td className="table-datacell datatype-numeric">31-08-2022  </td>
								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric">asl/adm/264</td>
									<td className="table-datacell datatype-numeric">James</td>
									<td className="table-datacell datatype-numeric">Segun</td>
									<td className="table-datacell datatype-numeric">Abiodun</td>
									<td className="table-datacell datatype-numeric">j.abiodun@arklandstructuresltd.com</td>
									<td className="table-datacell datatype-numeric">IT Support</td>
									<td className="table-datacell datatype-numeric">IT </td>
									<td className="table-datacell datatype-numeric">31-08-2022 </td>
								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric">asl/adm/264</td>
									<td className="table-datacell datatype-numeric">James</td>
									<td className="table-datacell datatype-numeric">Segun</td>
									<td className="table-datacell datatype-numeric">Abiodun</td>
									<td className="table-datacell datatype-numeric">j.abiodun@arklandstructuresltd.com</td>
									<td className="table-datacell datatype-numeric">IT Support</td>
									<td className="table-datacell datatype-numeric">IT </td>
									<td className="table-datacell datatype-numeric">31-08-2022 </td>
								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric">asl/adm/264</td>
									<td className="table-datacell datatype-numeric">James</td>
									<td className="table-datacell datatype-numeric">Segun</td>
									<td className="table-datacell datatype-numeric">Abiodun</td>
									<td className="table-datacell datatype-numeric">j.abiodun@arklandstructuresltd.com</td>
									<td className="table-datacell datatype-numeric">IT Support</td>
									<td className="table-datacell datatype-numeric">IT </td>
									<td className="table-datacell datatype-numeric">31-08-2022 </td>
								</tr>
							</tbody>
						</table>
					</div>

				</section>
			</main>
		</div>
	)
}

export default Finance

