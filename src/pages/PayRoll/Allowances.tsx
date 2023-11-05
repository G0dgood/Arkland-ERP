import { Button } from '@material-ui/core';
import { NoRecordFound, SearchComponent, TableFetch } from '../../components/TableOptions';
import { useNavigate } from 'react-router-dom';
import { IoIosSearch } from 'react-icons/io';
import { RiArrowUpDownFill, RiDownloadLine } from 'react-icons/ri';
import ReactSelectField from '../../components/Inputs/ReactSelectField';
import Select from "react-select";

const Allowances = () => {

	const navigate = useNavigate();
	const keys = [
		"Employee",
		"Pay Period",
		"Employee Role/Category",
		"Amount",
		"Created By",
		"Approved By",
		"Location",
		"Department",
		"Category ",
		"isExpatriate",
		"Approve"
	];
	const data = [];

	const valuesArray = [
		["Lindsey Stroud", "4-10-2021", "$600,000", "4-10-2021", "$100,000", "$100,000", "A & A", "Software", "Senior Staff", "Yes", <Button id="view-status" onClick={() => navigate(`/application/infodetails/:id`)}>View</Button>],
		["Lindsey Stroud", "4-10-2021", "$600,000", "4-10-2021", "$100,000", "$100,000", "A & A", "Software", "Senior Staff", "Yes", <Button id="view-status" onClick={() => navigate(`/application/infodetails/:id`)}>View</Button>],
		["Lindsey Stroud", "4-10-2021", "$600,000", "4-10-2021", "$100,000", "$100,000", "A & A", "Software", "Senior Staff", "Yes", <Button id="view-status" onClick={() => navigate(`/application/infodetails/:id`)}>View</Button>],
		["Lindsey Stroud", "4-10-2021", "$600,000", "4-10-2021", "$100,000", "$100,000", "A & A", "Software", "Senior Staff", "Yes", <Button id="view-status" onClick={() => navigate(`/application/infodetails/:id`)}>View</Button>],
		["Lindsey Stroud", "4-10-2021", "$600,000", "4-10-2021", "$100,000", "$100,000", "A & A", "Software", "Senior Staff", "Yes", <Button id="view-status" onClick={() => navigate(`/application/infodetails/:id`)}>View</Button>],
		["Lindsey Stroud", "4-10-2021", "$600,000", "4-10-2021", "$100,000", "$100,000", "A & A", "Software", "Senior Staff", "Yes", <Button id="view-status" onClick={() => navigate(`/application/infodetails/:id`)}>View</Button>],
		["Lindsey Stroud", "4-10-2021", "$600,000", "4-10-2021", "$100,000", "$100,000", "A & A", "Software", "Senior Staff", "Yes", <Button id="view-status" onClick={() => navigate(`/application/infodetails/:id`)}>View</Button>],
		["Lindsey Stroud", "4-10-2021", "$600,000", "4-10-2021", "$100,000", "$100,000", "A & A", "Software", "Senior Staff", "Yes", <Button id="view-status" onClick={() => navigate(`/application/infodetails/:id`)}>View</Button>],
		// Add more arrays for additional rows
	];

	for (const values of valuesArray) {
		const obj = {
			"Employee": values[0],
			"Pay Period": values[1],
			"Employee Role/Category ": values[2],
			"Amount": values[3],
			"Created By": values[4],
			"Approved By": values[5],
			"Location": values[6],
			"Department": values[7],
			"Category": values[8],
			"isExpatriate": values[9],
			"Approve": values[10]
		};
		data.push(obj);
	}




	return (
		<div className='half-background'>
			<SearchComponent parameter={true} addemployee={false} placeholder={"Pay Parameters"} />
			<section className="md-ui component-data-table">
				{/* {isLoading ? <TableLoader isLoading={isLoading} /> : ""} */}
				<div className="main-table-wrapper">
					<table className="main-table-content">
						<thead className="data-table-header">
							<tr className="data-table-row">
								{keys.map((i, index) => {
									return (
										<>
											<td className="table-datacell datatype-numeric"
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
											{Object.values(item).map((value, index) => (
												<td className="table-datacell" key={index}>{value}</td>
											))}
										</tr>
									))
								)}
						</tbody>
					</table>
				</div>
			</section>
		</div>
	)
}

export default Allowances
