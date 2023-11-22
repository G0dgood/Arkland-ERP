import { NoRecordFound, TableFetch } from '../../../../components/TableOptions';
import { useNavigate } from 'react-router-dom';
import RefundToBankComponent from './RefundToBankComponent';
import { useState } from 'react';
import BulkUpload from '../../../../components/BulkUpload/BulkUpload';

const RefundToBank = ({ parameter }: any) => {
	const [selectedRadio, setSelectedRadio] = useState("radio-1");
	const navigate = useNavigate();
	const keys = [
		"Employee",
		"Pay Period",
		"Employee Role/Category",
		"Amount",
		"Created By",
		"Approved By",
		"Department",
		"No. Months to pay",
		"Location ",
		"isExpatriate",
		"Comment",
		"Status"
	];
	const data = [];

	const valuesArray = [
		["Lindsey Stroud", "4-10-2021", "$600,000", "4-10-2021", "chinedu", "Kingsley", "I.T", "May", "A&A", "Yes", "expatriate, amount...", <span >Active</span>],
		["Lindsey Stroud", "4-10-2021", "$600,000", "4-10-2021", "chinedu", "Kingsley", "I.T", "May", "A&A", "Yes", "expatriate, amount...", <span >Active</span>],
		["Lindsey Stroud", "4-10-2021", "$600,000", "4-10-2021", "chinedu", "Kingsley", "I.T", "May", "A&A", "Yes", "expatriate, amount...", <span >Active</span>],
		["Lindsey Stroud", "4-10-2021", "$600,000", "4-10-2021", "chinedu", "Kingsley", "I.T", "May", "A&A", "Yes", "expatriate, amount...", <span >Active</span>],
		["Lindsey Stroud", "4-10-2021", "$600,000", "4-10-2021", "chinedu", "Kingsley", "I.T", "May", "A&A", "Yes", "expatriate, amount...", <span >Active</span>],
		["Lindsey Stroud", "4-10-2021", "$600,000", "4-10-2021", "chinedu", "Kingsley", "I.T", "May", "A&A", "Yes", "expatriate, amount...", <span >Active</span>],
		["Lindsey Stroud", "4-10-2021", "$600,000", "4-10-2021", "chinedu", "Kingsley", "I.T", "May", "A&A", "Yes", "expatriate, amount...", <span >Active</span>],
		["Lindsey Stroud", "4-10-2021", "$600,000", "4-10-2021", "chinedu", "Kingsley", "I.T", "May", "A&A", "Yes", "expatriate, amount...", <span >Active</span>],
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
			"Department": values[6],
			"No. Months to pay": values[7],
			"Location": values[8],
			"isExpatriate": values[9],
			"Comment": values[10],
			"Status": values[11]
		};
		data.push(obj);
	}

	return (
		<div>
			{parameter && <RefundToBankComponent setSelectedRadio={setSelectedRadio} selectedRadio={selectedRadio} />}
			{selectedRadio === "radio-2" && <BulkUpload />}
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

export default RefundToBank


