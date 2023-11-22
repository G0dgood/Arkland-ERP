import { Button } from '@material-ui/core';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { NoRecordFound, SearchComponent, TableFetch } from '../../../components/TableOptions';
import { Accordion } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SalaryIncrementView = () => {
	const navigate = useNavigate();
	const [sortData, setSortData] = useState([]);
	const [activeKey, setActiveKey] = useState<any>(null);
	const handleAccordionClick = (eventKey: any) => {
		if (activeKey === eventKey) {
			setActiveKey(null);
		} else {
			setActiveKey(eventKey);
		}
	};
	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "10";
	});

	useEffect(() => {
		localStorage.setItem("reportsPerPage", entriesPerPage);
	}, [entriesPerPage]);



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
			"Employee/ID": values[0],
			"Department": values[1],
			"Location": values[2],
			"Role": values[3],
			"Category": values[4],
			"Gross Amount": values[5],
			"Created By": values[6],
			"Approved By": values[7],
		};
		data.push(obj);
	}

	return (
		<div id="reports">
			<h5 className="page-title">Pay Run / More Details</h5>

			<ul className="nav-tabs-btn mb-3">
			</ul>
			<div className='half-background mt-6 ' style={{ borderRadius: "20px" }}>
				<span className="Employee-active-title-container" >
					<span className="Employee-active-title"  >Salary Changes</span>
				</span>
				<div style={{ height: "10px", }} />
				<Accordion >
					<Accordion.Item eventKey="3">
						<div id='accordion-body-form'>
							<Accordion.Header>Salary Info</Accordion.Header>
							<Accordion.Body>
								<div className='payrunbreakdown-container'>
									<div>
										{/* <h3>Pay Parameters </h3> */}
										<div className='payrunbreakdown_menu'>
											<h5>Employee  </h5>
											<p className='view-roll-header-text'>₦200,000</p>
										</div>
										<div className='payrunbreakdown_menu'>
											<h5>Department </h5>
											<p className='view-roll-header-text'>₦200,000</p>
										</div>
										<div className='payrunbreakdown_menu'>
											<h5>Location</h5>
											<p className='view-roll-header-text'>₦200,000</p>
										</div>
										<div className='payrunbreakdown_menu'>
											<h5>Role</h5>
											<p className='view-roll-header-text'>₦200,000</p>
										</div>
										<div className='payrunbreakdown_menu'>
											<h5>Category</h5>
											<p className='view-roll-header-text'>₦200,000</p>
										</div>
									</div>
									<div>
										<div className='payrunbreakdown_menu'>
											<h5>Gross Amount</h5>
											<p className='view-roll-header-text'>₦200,000</p>
										</div>
										<div className='payrunbreakdown_menu'>
											<h5>Created By</h5>
											<p className='view-roll-header-text'>₦200,000</p>
										</div>
										<div className='payrunbreakdown_menu'>
											<h5>Approved By</h5>
											<p className='view-roll-header-text'>₦200,000</p>
										</div>
										<div className='payrunbreakdown_menu'>
											<h5>Status</h5>
											<p className='view-roll-header-text'>₦200,000</p>
										</div>
									</div>
								</div>
							</Accordion.Body>
						</div>
					</Accordion.Item>
				</Accordion>

				<div className='half-background mt-5'>
					<SearchComponent sortData={sortData} entriesPerPage={entriesPerPage} setEntriesPerPage={entriesPerPage} parameter={false} addemployee={true} placeholder={"Search for ID"} SalaryHistory={true} CSV={true} />

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

											data.map((item: any, index: any) => (
												<tr key={index} className="data-table-row"  >
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

													{/* <td className="table-datacell datatype-numeric">
													<Button id="view-status" onClick={() => navigate(`/announcements/announcements/`)}>Approve</Button>
												</td> */}
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
	)
}

export default SalaryIncrementView
