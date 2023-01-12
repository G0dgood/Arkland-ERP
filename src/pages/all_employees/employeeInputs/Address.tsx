import React from 'react'
import { Button } from '@material-ui/core';

const Address = ({ setActive }: any) => {
	return (
		<div className='EssentialsContainer'>
			<div className="testbox">
				<form  >

					<div className='imput-space' />
					<div className='row-item'>
						<div className="col">
							<div className="form-group">
								<label>Email</label>
								<input type="text" placeholder="Enter Email" />
							</div>
						</div>
						<div className='imput-space' />
						<div className="col">
							<div className="form-group">
								<label>Phone</label>
								<input type="text" placeholder="Enter Phone" />
							</div>
						</div>
					</div>
					<div className='row-item'>
						{/* <div className="col">
							<div className="form-group">
								<label>First Name</label>
								<input type="text" placeholder="Enter first name" />
							</div>
						</div> */}
						<div className="col">
							<div className="form-group">
								<label htmlFor="status">Gender</label>
								<select
									id="status"
								>
									<option></option>
									<option value="Single">Single</option>
									<option value="Married">Married</option>
								</select>
							</div>
						</div>
						<div className='imput-space' />
						<div className="col">
							<div className="form-group">
								<label>Date of Birth</label>
								<input type="date" placeholder="Enter Date of Birth" />
							</div>
						</div>
					</div>
					<div className='row-item'>
						<div className="col">
							{/* <div className="form-group">
								<label>First Name</label>
								<input type="text" placeholder="Enter first name" />
							</div> */}
							<div className="form-group">
								<label htmlFor="status">Disability</label>
								<select
									id="status"
								>
									<option></option>
									<option value="Single">Single</option>
									<option value="Married">Married</option>
								</select>
							</div>
						</div>
						<div className='imput-space' />
						<div className="col">
							<div className="form-group">
								<label>Institution Attended</label>
								<input type="text" placeholder="Enter Institution Attended" />
							</div>
						</div>
					</div>
					<div className='row-item'>
						<div className="col">
							<div className="form-group">
								<label>Course Studied</label>
								<input type="text" placeholder="Enter Course Studied" />
							</div>
						</div>
						<div className='imput-space' />
						<div className="col">
							<div className="form-group">
								<label>Qualification</label>
								<input type="text" placeholder="Enter Qualification" />
							</div>
						</div>
					</div>
					<div id="Essential-btn" >
						<Button variant="outlined" className={"Add-btn-edit"} onClick={() => setActive(6)}>
							View Details
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Address
