import { Button } from '@material-ui/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv';
import { RiDownloadLine } from 'react-icons/ri';
import createHttpService from '../HttpService';

const PayrollEmployeeDownloader = () => {


	const [isLoadings, setisLoadings] = useState(false);
	const [isData, setisData] = useState<string | undefined>(undefined);




	const getData = async () => {
		const HttpService = createHttpService();
		setisLoadings(true);

		try {
			const exportUrl = "payroll/employees/export/csv";
			const csv = await HttpService.get(exportUrl);
			setisData(csv?.data);

			setisLoadings(false); // Disable loading indicator
		} catch (error) {
			console.error('An error occurred:', error);
			setisLoadings(false);
		}
	};



	useEffect(() => {
	}, [isData]);
	const jsonArray = [];
	// Check if isData is a string
	if (typeof isData === 'string') {
		// Split the CSV data into lines
		const lines = isData.split('\n');
		// Extract headers from the first line
		const headerscsv = lines[0]?.split(',');
		// Iterate through each line starting from the second line
		for (let i = 1; i < lines.length; i++) {
			const values = lines[i].split(',');
			// Create a JSON object using the headers and values
			const jsonObject: any = {};
			for (let j = 0; j < headerscsv.length; j++) {
				jsonObject[headerscsv[j]] = values[j];
			}
			// Add the JSON object to the array
			jsonArray.push(jsonObject);
		}
		// Display the resulting JSON array
		console.log('jsonArray', jsonArray);
	} else {
		console.error('isData is not a string');
	}





	const headers = [
		{ label: "FULL NAME", key: "fullname" },
		{ label: "EMAIL", key: "email" },
		{ label: "EMPLOYMENT DATE", key: "employment_date" },
		{ label: "ROLE", key: "role" },
		{ label: "DEPARTMENT", key: "department" },
		{ label: "CATEGORY", key: "category" },
		{ label: "STATUS", key: "status" },
		{ label: "GENDER", key: "gender" },
		{ label: "STATE OF ORIGIN", key: "state_of_origin" },
		{ label: "QUALIFICATION", key: "qualification" },
		{ label: "COUNTRY", key: "country" },
		{ label: "CITY", key: "city" },
	];

	const loopData = (data: any) => {
		console.log('isData', data)
		// Ensure that data is an array before proceeding
		if (!Array.isArray(data)) {
			console.error('Data is not an array:', data);
			return [];
		}

		// Process the data and return a new array
		return data?.map((item) => ({
			fullname: item?.full_name || 'No Full Name',
			email: item?.email || 'No Email',
			employment_date:
				moment(item?.employment_date).isValid()
					? moment(item?.employment_date).format('DD-MM-YYYY')
					: 'No Date Given',
			role: item?.role || 'No Role',
			department: item?.department?.name || 'No Department',
			category: item?.category || 'No Category',
			status: item?.status || 'No Status',
			gender: item?.gender || 'No Gender',
			state_of_origin: item?.state_of_origin || 'No State of Origin',
			qualification: item?.qualification || 'No Qualification',
			country: item?.country || 'No Country',
			city: item?.city || 'No City',
		}));
	};
	const exportData = loopData(jsonArray);

	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth() + 1;
	const day = today.getDate();

	const csvdate =
		"EMPLOYEE REPORT  [" + day + "-" + month + "-" + year + "].csv";


	return (
		<>
			<CSVLink
				data={exportData}
				headers={headers}
				filename={csvdate}
				asyncOnClick={true}
				onClick={getData}>
				<Button className='CSV-button'>
					{isLoadings ? 'LOADING....' : <><RiDownloadLine size={15} /> CSV</>}
				</Button>
			</CSVLink>
		</>
	);
};


export default PayrollEmployeeDownloader