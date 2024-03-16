import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { NoRecordFound, SearchComponent, TableFetch } from '../../../components/TableOptions';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import createHttpService from '../../../components/HttpService';
import { useAppDispatch, useAppSelector } from '../../../store/useStore';
import { getSalary } from '../../../features/Salary/SalarySlice';

const SalaryIncrement = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [sortData, setSortData] = useState([]);
	// const { data, isLoading } = useAppSelector((state: any) => state.salary)
	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "10";
	});

	// console.log('data', data)


	// useEffect(() => {
	// 	dispatch(getSalary());
	// }, [dispatch]);
	useEffect(() => {
		localStorage.setItem("reportsPerPage", entriesPerPage);
	}, [entriesPerPage]);


	const data = [];


	const keys = [
		"Employee/ID",
		"Department",
		"Location",
		"Role",
		"Category",
		"Gross Amount",
		"Created By",
		"Approved By",
	];


	const valuesArray = [
		["Lindsey Stroud", "4-10-2021", "$600,000", "4-10-2021", "$100,000", "$100,000", "A & A", "Software", "Senior Staff", "Yes", <Button id="team-applicatiom-update" onClick={() => navigate(`/application/infodetails/:id`)}>View</Button>],
		["Lindsey Stroud", "4-10-2021", "$600,000", "4-10-2021", "$100,000", "$100,000", "A & A", "Software", "Senior Staff", "Yes", <Button id="team-applicatiom-update" onClick={() => navigate(`/application/infodetails/:id`)}>View</Button>],
		["Lindsey Stroud", "4-10-2021", "$600,000", "4-10-2021", "$100,000", "$100,000", "A & A", "Software", "Senior Staff", "Yes", <Button id="team-applicatiom-update" onClick={() => navigate(`/application/infodetails/:id`)}>View</Button>],
		["Lindsey Stroud", "4-10-2021", "$600,000", "4-10-2021", "$100,000", "$100,000", "A & A", "Software", "Senior Staff", "Yes", <Button id="team-applicatiom-update" onClick={() => navigate(`/application/infodetails/:id`)}>View</Button>],
		["Lindsey Stroud", "4-10-2021", "$600,000", "4-10-2021", "$100,000", "$100,000", "A & A", "Software", "Senior Staff", "Yes", <Button id="team-applicatiom-update" onClick={() => navigate(`/application/infodetails/:id`)}>View</Button>],
		["Lindsey Stroud", "4-10-2021", "$600,000", "4-10-2021", "$100,000", "$100,000", "A & A", "Software", "Senior Staff", "Yes", <Button id="team-applicatiom-update" onClick={() => navigate(`/application/infodetails/:id`)}>View</Button>],
		["Lindsey Stroud", "4-10-2021", "$600,000", "4-10-2021", "$100,000", "$100,000", "A & A", "Software", "Senior Staff", "Yes", <Button id="team-applicatiom-update" onClick={() => navigate(`/application/infodetails/:id`)}>View</Button>],
		["Lindsey Stroud", "4-10-2021", "$600,000", "4-10-2021", "$100,000", "$100,000", "A & A", "Software", "Senior Staff", "Yes", <Button id="team-applicatiom-update" onClick={() => navigate(`/application/infodetails/:id`)}>View</Button>],
		// Add more arrays for additional rows
	];

	for (const values of valuesArray) {
		const obj = {
			"Employee/ID": values[0],
			"Department": values[1],
			"Location": values[2],
			"Role": values[3],
			"Category": values[4],
			"Gross Amount": values[5],
			"Created By": values[6],
			"Approved By": values[7],
		};
		data?.push(obj);
	}

	// useEffect(() => {
	// 	getData()
	// }, [])




	return (
		<>
			<Helmet>
				<title>Salary Increment | Arkland ERP</title>
			</Helmet>
			<div id="reports">
				<h5 className="page-title">Salary Page</h5>
				<ul className="nav-tabs-btn mb-3">
				</ul>
				<div className='half-background'>
					<SearchComponent sortData={sortData} entriesPerPage={entriesPerPage} setEntriesPerPage={entriesPerPage} parameter={false} addemployee={true} placeholder={"Employees"} CSV={true} ApprovalRequests={false} />

					<section className="md-ui component-data-table">
						{/* {isLoading ? <TableLoader isLoading={isLoading} /> : ""} */}
						<div className="main-table-wrapper">
							<table className="main-table-content">
								<thead className="data-table-header">
									<tr className="data-table-row">
										{keys?.map((i, index) => {
											return (
												<>
													<td
														className="table-datacell datatype-numeric"
														key={index} >
														{i}
													</td>
												</>
											);
										})}
									</tr>
								</thead>

								<tbody className="data-table-content">
									{
										false ? (
											<TableFetch colSpan={8} />
										) : data?.length === 0 || data == null ? (
											<NoRecordFound colSpan={8} />
										) : (
											data?.map((item: any, index: any) => (
												<tr key={index} className="data-table-row" onClick={() => navigate(`/payroll/payroll/salaryincrementview`)}>
													<td className="table-datacell datatype-numeric">
														<h4>Precious Damola</h4>
														<p style={{ fontSize: "12px", color: "#808080" }}>23456789</p>
													</td>
													<td className="table-datacell datatype-numeric">
														<h4>Software</h4>
														<p style={{ fontSize: "12px", color: "#808080" }}>Senior Staff</p></td>
													<td className="table-datacell datatype-numeric">A & A </td>
													<td className="table-datacell datatype-numeric">IT Manager</td>
													<td className="table-datacell datatype-numeric">Senior Staff </td>
													<td className="table-datacell datatype-numeric">₦56000888888</td>
													<td className="table-datacell datatype-numeric">
														<h4>Precious Damola</h4>
														<p style={{ fontSize: "12px", color: "#808080" }}>2023-08-01</p>
													</td>
													<td className="table-datacell datatype-numeric">
														<h4>Precious Damola</h4>
														<p style={{ fontSize: "12px", color: "#808080" }}>2023-08-01</p>
													</td>

													<td className="table-datacell datatype-numeric">
														<Button id="view-status" onClick={() => navigate(`/announcements/announcements/`)}>Approve</Button>
													</td>
												</tr>
											))
										)}
								</tbody>
							</table>
						</div>
					</section>

					<footer className="main-table-footer">
						<div className="paginations">
							<ul>
								<li className="prev">
									<a >
										<MdArrowBackIos />
									</a>
								</li>
								<li><a >1</a></li>
								<li className="active"><a >2</a></li>
								<li><a >3</a></li>
								<li><a >4</a></li>
								<li><a >5</a></li>
								<li><span className="delimeter">...</span></li>
								<li><a >8</a></li>
								<li className="next">
									<a ><MdArrowForwardIos /></a></li>
							</ul>
						</div>
					</footer>
				</div>
			</div>
		</>
	)
}

export default SalaryIncrement
