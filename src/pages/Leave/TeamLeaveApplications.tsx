import React, { useEffect, useState } from 'react'
import { Button } from "@material-ui/core";
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { MainSearch } from '../../components/TableOptions';

const TeamLeaveApplications = () => {
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
						<Button variant="contained" className="back-btn-icon" id="Add-btn-sub" onClick={() => navigate("/leave")}>
							<FaArrowLeft size={25} />
						</Button>

						<span className='SupportmainTitleh3'>My Team Leave Applications</span>
					</div>
					<div>
						<MainSearch placeholder={'Search...          Team Leave Applications'} />
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
									<td className="table-datacell datatype-numeric">Date Applied</td>
									<td className="table-datacell datatype-numeric">Email Address</td>
									<td className="table-datacell datatype-numeric">Leave  Type</td>
									<td className="table-datacell datatype-numeric">Start Date</td>
									<td className="table-datacell datatype-numeric">Leave Status</td>
									<td className="table-datacell datatype-numeric">...</td>

								</tr>
							</thead>
							<tbody className="data-table-content">
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric">25-08-2022</td>
									<td className="table-datacell datatype-numeric">j.abiodun@arklandstructuresltd.com</td>
									<td className="table-datacell datatype-numeric">Paid-Leave</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">Active</td>
									<td className="table-datacell datatype-numeric">
										<Button id="team-applicatiom-update">Update</Button>
									</td>
								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric">25-08-2022</td>
									<td className="table-datacell datatype-numeric">j.abiodun@arklandstructuresltd.com</td>
									<td className="table-datacell datatype-numeric">Paid-Leave</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">Active</td>
									<td className="table-datacell datatype-numeric">
										<Button id="team-applicatiom-update">Update</Button></td>
								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric">25-08-2022</td>
									<td className="table-datacell datatype-numeric">j.abiodun@arklandstructuresltd.com</td>
									<td className="table-datacell datatype-numeric">Paid-Leave</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">Active</td>
									<td className="table-datacell datatype-numeric">
										<Button id="team-applicatiom-update">Update</Button></td>
								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric">25-08-2022</td>
									<td className="table-datacell datatype-numeric">j.abiodun@arklandstructuresltd.com</td>
									<td className="table-datacell datatype-numeric">Paid-Leave</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">Active</td>
									<td className="table-datacell datatype-numeric">
										<Button id="team-applicatiom-update">Update</Button></td>
								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric">25-08-2022</td>
									<td className="table-datacell datatype-numeric">j.abiodun@arklandstructuresltd.com</td>
									<td className="table-datacell datatype-numeric">Paid-Leave</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">Active</td>
									<td className="table-datacell datatype-numeric">
										<Button id="team-applicatiom-update">Update</Button></td>
								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric">25-08-2022</td>
									<td className="table-datacell datatype-numeric">j.abiodun@arklandstructuresltd.com</td>
									<td className="table-datacell datatype-numeric">Paid-Leave</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">Active</td>
									<td className="table-datacell datatype-numeric">
										<Button id="team-applicatiom-update">Update</Button></td>
								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric">25-08-2022</td>
									<td className="table-datacell datatype-numeric">j.abiodun@arklandstructuresltd.com</td>
									<td className="table-datacell datatype-numeric">Paid-Leave</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">Active</td>
									<td className="table-datacell datatype-numeric">
										<Button id="team-applicatiom-update">Update</Button></td>
								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric">25-08-2022</td>
									<td className="table-datacell datatype-numeric">j.abiodun@arklandstructuresltd.com</td>
									<td className="table-datacell datatype-numeric">Paid-Leave</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">Active</td>
									<td className="table-datacell datatype-numeric">
										<Button id="team-applicatiom-update">Update</Button></td>
								</tr>
								<tr className="data-table-row">
									<td className="table-datacell datatype-numeric">25-08-2022</td>
									<td className="table-datacell datatype-numeric">j.abiodun@arklandstructuresltd.com</td>
									<td className="table-datacell datatype-numeric">Paid-Leave</td>
									<td className="table-datacell datatype-numeric">31-08-2022</td>
									<td className="table-datacell datatype-numeric">Active</td>
									<td className="table-datacell datatype-numeric">
										<Button id="team-applicatiom-update">Update</Button></td>
								</tr>
							</tbody>
						</table>
					</div>

				</section>
			</main>
		</div>
	)
}

export default TeamLeaveApplications

