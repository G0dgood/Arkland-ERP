import { Button } from '@material-ui/core';
import { NoRecordFound, TableFetch } from '../../../components/TableOptions';
import { BsFileEarmarkText } from 'react-icons/bs';
import { SetStateAction, useState } from 'react';
import RunSpecificItemsTable from './ RunSpecificItemsTable';
import GroupPayRunTable from './GroupPayRunTable';
import RunSpecificItems from './ RunSpecificItems';
import GroupPayRun from './GroupPayRun';

const PayRunComponent = () => {

	const [selectedRadio, setSelectedRadio] = useState(null);


	const handleRadioChange = (value: any) => {
		setSelectedRadio(value);
	};

	const keys = [
		"Pay Parameters ",
		"Salary Component",
	];
	const data = [];

	const valuesArray = [
		["", "Precious Damola", "Salary", "Software Developer", "A&A", "ACTIVE",],
		["", "Precious Damola", "Salary", "Software Developer", "A&A", "ACTIVE",],
		["", "Precious Damola", "Salary", "Software Developer", "A&A", "ACTIVE",],
		["", "Precious Damola", "Salary", "Software Developer", "A&A", "ACTIVE",],
		["", "Precious Damola", "Salary", "Software Developer", "A&A", "ACTIVE",],
		["", "Precious Damola", "Salary", "Software Developer", "A&A", "ACTIVE",],
		["", "Precious Damola", "Salary", "Software Developer", "A&A", "ACTIVE",],
		["", "Precious Damola", "Salary", "Software Developer", "A&A", "ACTIVE",],
		// Add more arrays for additional rows
	];

	for (const values of valuesArray) {
		const obj = {
			"Pay Parameters ": values[0],
			"Salary Component ": values[1],
		};
		data.push(obj);
	}



	return (
		<div className='specialallowancescomponent'>
			<div className='mt-5'>

				<div id='entry-radio-btn-container'>
					<div className="radio" id='entry-radio-btn'>
						<p className='check-title'>Run Specific Items</p>
						<input
							id="radio-1"
							name="radio"
							type="radio"
							checked={selectedRadio === 'radio-1'}
							onChange={() => handleRadioChange('radio-1')}
						/>
						<label htmlFor="radio-1" className="radio-label"></label>
					</div>

					<div className="radio" id='entry-radio-btn'>
						<p className='check-title' >Group Pay Run</p>
						<input
							id="radio-2"
							name="radio"
							type="radio"
							checked={selectedRadio === 'radio-2'}
							onChange={() => handleRadioChange('radio-2')}
						/>
						<label htmlFor="radio-2" className="radio-label"></label>
					</div>
				</div>
				{/* Run Specific Items Conponent */}
				{selectedRadio === "radio-1" ? <RunSpecificItems /> :
					selectedRadio === "radio-2" ? <GroupPayRun /> :
						<RunSpecificItems />}


			</div>
			{selectedRadio === "radio-1" ?
				<RunSpecificItemsTable data={data} keys={keys} /> :
				selectedRadio === "radio-2" ?
					<GroupPayRunTable data={data} keys={keys} />
					: <div className='BsFileEarmarkText'>
						<BsFileEarmarkText size={100} color='#808080' />
					</div>}

		</div >
	)
}

export default PayRunComponent
