import { Key, useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap'
import { IoArrowBackSharp } from 'react-icons/io5'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { NoRecordFound, SearchComponent, TableFetch } from '../../../components/TableOptions';
import { Button } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';

const PayRunView = () => {
	const navigate = useNavigate();

	const [sortData, setSortData] = useState([]);
	const [searchItem,] = useState("");



	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "8";
	});

	useEffect(() => {
		localStorage.setItem("reportsPerPage", entriesPerPage);
	}, [entriesPerPage]);



	const keys = [
		"Period/ Date",
		"Batch",
		"Amount",
		"Days to pay",
		"No of employees",
		"Selection type",
		"Selected item",
		"Only specific items",
		"Status",
		"View",
		"Action",
	];
	const data = [];

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
			"Period/ Date": values[0],
			"Batch": values[1],
			"Amount": values[2],
			"Days to pay": values[3],
			"No of employees": values[4],
			"Selection type": values[5],
			"Selected item": values[6],
			"Only specific items": values[7],
			"Status": values[8],
			"View": values[9],
			"Action": values[10],
		};
		data.push(obj);
	}


	return (
		<>
			<Helmet>
				<title>Pay Run View | Arkland ERP</title>
			</Helmet>
			<div id="reports">
				<div className='roll-title'>
					<h5 className="page-title">Pay Run / More Details</h5>
					<div className='roll-icon' onClick={() => navigate(-1)}>
						<IoArrowBackSharp size={22} />
					</div>
				</div>

				<div className='view-roll-header-card-view'>
					<span>
						<h5>Employee</h5>
						<p className='view-roll-header-text'>Godwin Chinedu</p>
					</span>
					<span>
						<h5>Pay Period</h5>
						<p className='view-roll-header-text'>Jan-2023</p>
					</span>
					<span>
						<h5>Employee Role</h5>
						<p className='view-roll-header-text'>Software</p>
					</span>
					<span >
						<h5>Category</h5>
						<p className='view-roll-header-text'>Senior Staff</p>
					</span>
					<span >
						<h5>Amount</h5>
						<p className='view-roll-header-text'>₦30000000</p>
					</span>
					<span >
						<h5>Created By</h5>
						<p className='view-roll-header-text'>Kingsley</p>
					</span>
					<span >
						<h5>Approved By</h5>
						<p className='view-roll-header-text'>Henry</p>
					</span>
					<span >
						<h5> isExpatriate</h5>
						<p className='view-roll-header-text'>Yes</p>
					</span>
					<span >
						<h5>Status</h5>
						<p className='view-roll-header-text'>Godwin Chinedu</p>
					</span>
				</div>
				<div>

					<div className='half-background mt-6 ' style={{ borderRadius: "20px" }}>
						<span className="Employee-active-title-container" >
							<span className="Employee-active-title"  >Payrun Break down</span>
						</span>
						<div style={{ height: "10px", }} />
						<Accordion  >
							<Accordion.Item eventKey="3">
								<div id='accordion-body-form'>
									<Accordion.Header> </Accordion.Header>
									<Accordion.Body>
										<div className='payrunbreakdown-container'>
											<div>
												<h3>Pay Parameters </h3>
												<div className='payrunbreakdown_menu'>
													<h5>Sponsorship Allowance</h5>
													<p className='view-roll-header-text'>₦200,000</p>
												</div>
												<div className='payrunbreakdown_menu'>
													<h5>Fixed Overtime </h5>
													<p className='view-roll-header-text'>₦200,000</p>
												</div>
												<div className='payrunbreakdown_menu'>
													<h5>Overtime</h5>
													<p className='view-roll-header-text'>₦200,000</p>
												</div>
												<div className='payrunbreakdown_menu'>
													<h5>Bonus</h5>
													<p className='view-roll-header-text'>₦200,000</p>
												</div>
												<div className='payrunbreakdown_menu'>
													<h5>Leave Allowance</h5>
													<p className='view-roll-header-text'>₦200,000</p>
												</div>
												<div className='payrunbreakdown_menu'>
													<h5>Staff Daily Transport</h5>
													<p className='view-roll-header-text'>₦200,000</p>
												</div>
												<div className='payrunbreakdown_menu'>
													<h5>Transport</h5>
													<p className='view-roll-header-text'>₦200,000</p>
												</div>
												<div className='payrunbreakdown_menu'>
													<h5>Senior CESSA Dues</h5>
													<p className='view-roll-header-text'>₦200,000</p>
												</div>
												<div className='payrunbreakdown_menu'>
													<h5>Junior Union Dues</h5>
													<p className='view-roll-header-text'>₦200,000</p>
												</div>
												<div className='payrunbreakdown_menu'>
													<h5>Penalty</h5>
													<p className='view-roll-header-text'>₦200,000</p>
												</div>
												<div className='payrunbreakdown_menu'>
													<h5>Staff Advance I.O.U 1</h5>
													<p className='view-roll-header-text'>₦200,000</p>
												</div>
												<div className='payrunbreakdown_menu'>
													<h5>Absenteesiem</h5>
													<p className='view-roll-header-text'>₦200,000</p>
												</div>
												<div className='payrunbreakdown_menu'>
													<h5>Number of Staff</h5>
													<p className='view-roll-header-text'>₦200,000</p>
												</div>
												<div className='payrunbreakdown_menu'>
													<h3>TOTAL</h3>
													<p className='view-roll-header-text'>₦5,000,0000</p>
												</div>
											</div>
											<div>
												<h3>Salary Component</h3>
												<div className='payrunbreakdown_menu'>
													<h5>Basic pay</h5>
													<p className='view-roll-header-text'>₦200,000</p>
												</div>
												<div className='payrunbreakdown_menu'>
													<h5>Utility</h5>
													<p className='view-roll-header-text'>₦200,000</p>
												</div>
												<div className='payrunbreakdown_menu'>
													<h5>Meal</h5>
													<p className='view-roll-header-text'>₦200,000</p>
												</div>
												<div className='payrunbreakdown_menu'>
													<h5>Housing Allowance</h5>
													<p className='view-roll-header-text'>₦200,000</p>
												</div>
												<div className='payrunbreakdown_menu'>
													<h3>TOTAL</h3>
													<p className='view-roll-header-text'>₦2,000,0000</p>
												</div>
											</div>
										</div>
									</Accordion.Body>
								</div>
							</Accordion.Item>
						</Accordion>

						<div className='half-background mt-5'>
							<SearchComponent sortData={sortData} entriesPerPage={entriesPerPage} setEntriesPerPage={entriesPerPage} parameter={false} addemployee={true} placeholder={"Employees"} emailpayslip={true} CSV={true} />

							{/* <PayRunComponent /> */}
							<section className="md-ui component-data-table">
								{/* {isLoading ? <TableLoader isLoading={isLoading} /> : ""} */}
								<div className="main-table-wrapper">
									<table className="main-table-content">
										<thead className="data-table-header">
											<tr className="data-table-row">
												{keys.map((i, index) => {
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

													data.map((item: any, index: Key | null | undefined) => (
														<tr key={index} className="data-table-row">
															<td className="table-datacell datatype-numeric">
																<h4>Precious Damola</h4>
																<p style={{ fontSize: "12px", color: "#808080" }}>28/1/2023</p>
															</td>
															<td className="table-datacell datatype-numeric"> 1</td>
															<td className="table-datacell datatype-numeric">₦56000888888</td>
															<td className="table-datacell datatype-numeric">22</td>
															<td className="table-datacell datatype-numeric">900</td>
															<td className="table-datacell datatype-numeric">Location </td>
															<td className="table-datacell datatype-numeric">Department</td>
															<td className="table-datacell datatype-numeric">Lapaz</td>
															<td className="table-datacell datatype-numeric">ACTIVE</td>
															<td className="table-datacell datatype-numeric">
																<Button id="view-status" onClick={() => navigate(`/payroll/payroll/payrunview`)}>View</Button>
															</td>
															<td className="table-datacell datatype-numeric">
																<Button id="close-puy-btn" onClick={() => navigate(``)}>Close Pay Run</Button>
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
										<li><a>1</a></li>
										<li className="active"><a>2</a></li>
										<li><a>3</a></li>
										<li><a>4</a></li>
										<li><a>5</a></li>
										<li><span className="delimeter">...</span></li>
										<li><a>8</a></li>
										<li className="next">
											<a ><MdArrowForwardIos /></a></li>
									</ul>
								</div>
								{/* <Pagination
						setDisplayData={setDisplayData}
						data={sortData}
						entriesPerPage={entriesPerPage}
						Total={"Employee"}
					/> */}
							</footer>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default PayRunView