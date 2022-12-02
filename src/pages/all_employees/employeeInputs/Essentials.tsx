import React from 'react'

const Essentials = () => {
	return (
		<div className='EssentialsContainer'>
			<div className="testbox">
				<form  >
					{/* <div className="item">
						<div className="name-item">
							<div className=' form-group '>
								<p>First Name</p>
								<input type="text" name="name" placeholder="Enter first name" />
							</div>
							<div className='name-item-input'>
								<p>Last Name</p>
								<input type="text" name="name" placeholder="Last" />
							</div>
						</div>
					</div> */}
					<div className='row-item'>
						<div className="col">
							<div className="form-group">
								<label>First Name</label>
								<input type="text" placeholder="Enter first name" />
							</div>
						</div>
						<div className='imput-space' />
						<div className="col">
							<div className="form-group">
								<label>Last Name</label>
								<input type="text" placeholder="Enter last name" />
							</div>
						</div>
					</div>
					<div className='row-item'>
						<div className="col">
							<div className="form-group">
								<label>First Name</label>
								<input type="text" placeholder="Enter first name" />
							</div>
						</div>
						<div className='imput-space' />
						<div className="col">
							<div className="form-group">
								<label>Last Name</label>
								<input type="text" placeholder="Enter last name" />
							</div>
						</div>
					</div>
					<div className='row-item'>
						<div className="col">
							<div className="form-group">
								<label>First Name</label>
								<input type="text" placeholder="Enter first name" />
							</div>
						</div>
						<div className='imput-space' />
						<div className="col">
							<div className="form-group">
								<label>Last Name</label>
								<input type="text" placeholder="Enter last name" />
							</div>
						</div>
					</div>
					<div className='row-item'>
						<div className="col">
							<div className="form-group">
								<label>First Name</label>
								<input type="text" placeholder="Enter first name" />
							</div>
						</div>
						<div className='imput-space' />
						<div className="col">
							<div className="form-group">
								<label>Last Name</label>
								<input type="text" placeholder="Enter last name" />
							</div>
						</div>
					</div>
					<div className='row-item'>
						<div className="col">
							<div className="form-group">
								<label>First Name</label>
								<input type="text" placeholder="Enter first name" />
							</div>
						</div>
						<div className='imput-space' />
						<div className="col">
							<div className="form-group">
								<label>Last Name</label>
								<input type="text" placeholder="Enter last name" />
							</div>
						</div>
					</div>

				</form>
			</div>
		</div>
	)
}

export default Essentials