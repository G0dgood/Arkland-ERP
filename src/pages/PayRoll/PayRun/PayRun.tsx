import { useEffect, useState } from 'react'
import { NoRecordFound, SearchComponent, TableFetch } from '../../../components/TableOptions';
import { useAppDispatch } from '../../../store/useStore';
import { Button } from '@material-ui/core';
import Pagination from '../../../components/Pagination';
import { useNavigate } from 'react-router-dom';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import PayRunComponent from './PayRunComponent';



const PayRun = () => {
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
		<div id="reports">
			<h5 className="page-title">Pay Run</h5>

			<ul className="nav-tabs-btn mb-3">

			</ul>
			<div className='half-background '>
				<SearchComponent sortData={sortData} entriesPerPage={entriesPerPage} setEntriesPerPage={entriesPerPage} parameter={false} addemployee={true} placeholder={"Employees"} emailpayslip={true} CSV={true} />

				<PayRunComponent />
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
													<Button id="view-status" onClick={() => navigate(``)}>View</Button>
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
	)
}

export default PayRun
