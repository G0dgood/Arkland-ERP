import { useState } from 'react'
import { InputCategory, InputDepartment, InputExpatriate, InputLocation, InputOne, InputRole, NoRecordFound, TableFetch } from '../../../../components/TableOptions';


const FixedOvertimeComponent = ({ setSelectedRadio, selectedRadio }: any) => {
	const [selectedValue, setSelectedValue] = useState('Employees');
	const [selectedLocation, setSelectedLocation] = useState('');
	const [selectedRole, setSelectedRole] = useState('');
	const [selectedDepartment, setSelectedDepartment] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedExpatriate, setSelectedExpatriate] = useState('');
	const keys = [
		"",
		"Employee & ID",
		"Department",
		"Role",
		"Location",
		"Status",
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
			" ": values[0],
			"Employee & ID": values[1],
			"Department ": values[2],
			"Role": values[3],
			"Location": values[4],
			"Status": values[5],
		};
		data.push(obj);
	}


	const handleRadioChange = (value: any) => {
		setSelectedRadio(value);
	};
	return (
		<div className='specialallowancescomponent'>
			<div >
				<div id='entry-radio-btn-container'>
					<div className="radio" id='entry-radio-btn'>
						<p className='check-title'> Regular Entry </p>
						<input
							id="radio-1"
							name="radio"
							type="radio"
							checked={selectedRadio === 'radio-1'}
							onChange={() => handleRadioChange('radio-1')}
						/>

						<label htmlFor="radio-1" className="radio-label"> </label>
					</div>

					<div className="radio" id='entry-radio-btn'>
						<p className='check-title'> Bulk Upload </p>
						<input
							id="radio-2"
							name="radio"
							type="radio"
							checked={selectedRadio === 'radio-2'}
							onChange={() => handleRadioChange('radio-2')}
						/>
						<label htmlFor="radio-2" className="radio-label">
						</label>
					</div>
				</div>
				{selectedRadio === "radio-1" &&
					<div className='specialallowancescomponent-contaner'>
						<InputOne setSelectedValue={setSelectedValue} selectedValue={selectedValue} />
						{selectedValue === "Employees" ?
							<InputLocation setSelectedLocation={setSelectedLocation} selectedLocation={selectedLocation} /> :
							selectedValue === "Role" ?
								<InputRole setSelectedRole={setSelectedRole} selectedRole={selectedRole} /> :
								selectedValue === "Category" ?
									<InputCategory setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} /> :
									selectedValue === "Department" ?
										<InputDepartment setSelectedDepartment={setSelectedDepartment} selectedDepartment={selectedDepartment} /> :
										selectedValue === "Expatriate" ?
											<InputExpatriate setSelectedExpatriate={setSelectedExpatriate} selectedExpatriate={selectedExpatriate} /> :
											selectedValue === "Location" ?
												<InputLocation setSelectedLocation={setSelectedLocation} selectedLocation={selectedLocation} /> :
												<InputLocation setSelectedLocation={setSelectedLocation} selectedLocation={selectedLocation} />
						}

						<div className='input'  >
							<label className='input__label'>Amount</label>
							<input className='input__field input-perameter-color' placeholder='Enter Amount' />
						</div>

						<div className='input mt-3' >
							<label className='input__label  '>Comment </label>
							<textarea rows={3} placeholder='Enter Comment' className="custom-textarea input-perameter-color" />

						</div>

					</div>
				}
			</div>
			{selectedRadio === "radio-1" &&
				<div style={{ overflow: 'auto' }}>
					<div className='selected-sub-entries'>
						<p>Selected  21 Out of 25  Entries</p></div>
					<section className="md-ui component-data-table">
						<div className="main-table-wrapper">
							<table className="main-table-content">
								<thead className="data-table-header">
									<tr className="data-table-row">
										{keys.map((i, index) => {
											return (
												<>
													<td className="table-datacell datatype-numeric" key={index} >
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
													<td className="table-datacell" key={index}>
														<div className="radio"  >
															<input id={`radio-${index}`} name="radio" type="radio" checked />
															<label htmlFor={`radio-${index}`} className="radio-label"> </label>
														</div>
													</td>
													<td className="table-datacell" >Precious Damola</td>
													<td className="table-datacell" >Salary</td>
													<td className="table-datacell" >Software Developer</td>
													<td className="table-datacell" >A&A</td>
													<td className="table-datacell" >ACTIVE</td>
												</tr>
											))
										)}
								</tbody>
							</table>
						</div>
					</section>
				</div>
			}
		</div>
	)
}

export default FixedOvertimeComponent
