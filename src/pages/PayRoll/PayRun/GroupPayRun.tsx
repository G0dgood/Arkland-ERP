import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { InputCategory, InputDepartment, InputExpatriate, InputLocation, InputOne, InputRole } from '../../../components/TableOptions';


const GroupPayRun = () => {
	const [selectedValue, setSelectedValue] = useState('Employees');
	const [selectedLocation, setSelectedLocation] = useState('');
	const [selectedRole, setSelectedRole] = useState('');
	const [selectedDepartment, setSelectedDepartment] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedExpatriate, setSelectedExpatriate] = useState('');



	return (
		<div>
			<div className='specialallowancescomponent-contaner'>
				<div className='numberofdays-main'>
					<div className='input mt-2 mb-4'  >
						<label className='input__label '>Days to pay</label>
						<input className='input__field input-perameter-color' placeholder='Enter Amount' />
					</div>
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
					<div className='numberofdays mt-5'>
						<div className='numberofdays-title'> Pay Period </div>
						<div className='input__labelinput__field' style={{ display: "flex", gap: "20px" }} id='numberofdays-bg'>
							<div className='input' style={{ width: "50%" }}>
								<label className='input__label' style={{ fontSize: "10px", paddingLeft: '16px' }} >Month</label>
								<input className='input__field input-perameter-color' placeholder='23' />
							</div>
							<div className='input' style={{ width: "20%" }}>
							</div>
							<div className='input' style={{ width: "50%" }}>
								<label className='input__label' style={{ fontSize: "10px", paddingLeft: '16px' }}>Year</label>
								<input className='input__field input-perameter-color' placeholder='2023' />
							</div>
						</div>
						InputRole</div>
				</div>
				<div className='input mt-5'  >
					<label className='input__label'>Days to pay</label>
					<input className='input__field input-perameter-color' placeholder='Enter Amount' />
				</div>
			</div>
			<div style={{ float: "right", paddingRight: "3.6rem", marginTop: "1.5rem", marginBottom: "3rem" }}>
				<Button id="view-status"  >Run</Button>
			</div>
		</div>
	)
}

export default GroupPayRun


