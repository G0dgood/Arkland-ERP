import { useEffect, useState } from 'react'
import { NoRecordFound, SearchComponent, TableFetch } from '../../components/TableOptions';
import TableLoader from '../../components/TableLoader';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { Button } from '@material-ui/core';
import { BsCheckCircle } from 'react-icons/bs';
import moment from 'moment';
import Pagination from '../../components/Pagination';
import { useNavigate } from 'react-router-dom';
import CreateAnnouncementModal from '../../components/Modals/CreateAnnouncementModal';


const PayrollEmployees = () => {
	const dispatch = useAppDispatch();

	const navigate = useNavigate();
	const [displayData, setDisplayData] = useState([]);




	const [sortData, setSortData] = useState([]);
	const [searchItem,] = useState("");



	// --- Pagination --- //
	const [entriesPerPage, setEntriesPerPage] = useState(() => {
		return localStorage.getItem("reportsPerPage") || "10";
	});

	useEffect(() => {
		localStorage.setItem("reportsPerPage", entriesPerPage);
	}, [entriesPerPage]);



	const keys = [
		"Name",
		"Employee Role",
		"Email Address",
		"Contact",
		"Location",
		"Department",
		"Salary",
		"Employment Date",
		"Action ",
		"Status",
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
			"Name": values[0],
			"Employee Role": values[1],
			"Email Address ": values[2],
			"Contact": values[3],
			"Location": values[4],
			"Department": values[5],
			"Salary": values[6],
			"Employment Date": values[7],
			"Action": values[8],
			"Status": values[9],
		};
		data.push(obj);
	}






	return (
		<div id="reports">
			<h5 className="page-title">All Employee</h5>
			<ul className="nav-tabs-btn mb-3">
				{/* <CreateAnnouncementModal />
				<Button id="view-status-top" onClick={() => navigate("/payroll/payroll/employeesonboarding")}>Add Employee</Button> */}
				<li className={"active"} onClick={() => navigate("/payroll/payroll/employeesonboarding")}> Add Employee</li>
			</ul>
			<div className='half-background'>
				<SearchComponent sortData={sortData} entriesPerPage={entriesPerPage} setEntriesPerPage={entriesPerPage} parameter={false} addemployee={true} />

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

										data.map((item, index) => (
											<tr key={index} className="data-table-row">
												<td className="table-datacell datatype-numeric">Precious Damola</td>
												<td className="table-datacell datatype-numeric">Software</td>
												<td className="table-datacell datatype-numeric">preciousdamo@gmail.com</td>
												<td className="table-datacell datatype-numeric"> 	091-22-766-665 </td>
												<td className="table-datacell datatype-numeric">A&A </td>
												<td className="table-datacell datatype-numeric">IT </td>
												<td className="table-datacell datatype-numeric">₦123,455 </td>
												<td className="table-datacell datatype-numeric">091-22-766-665</td>
												<td className="table-datacell datatype-numeric">
													<Button id="view-btn" onClick={() => navigate(`/announcements/announcements/`)}>View</Button>
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
					<Pagination
						setDisplayData={setDisplayData}
						data={sortData}
						entriesPerPage={entriesPerPage}
						Total={"Employee"}
					/>
				</footer>
			</div>
		</div>
	)
}

export default PayrollEmployees