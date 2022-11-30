import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Button } from '@material-ui/core';
import { MdOutlineClose } from 'react-icons/md';

const ApplyForLeave = (props: any) => {

	const [lgShow, setLgShow] = useState(false);

	return (
		<div>
			<Button variant="contained" className="Add-btn"
				onClick={() => setLgShow(true)}>
				Apply for Leave
			</Button>
			<Modal
				size="lg"
				show={lgShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header  >
					<span>

					</span>
					<span className='span-center-title'>Apply For Leave</span>
					<Button style={{ color: '#fff' }} onClick={() => setLgShow(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<div className='Modal-Body'>
						<h6>Name</h6>
						<select id="Modal-textarea-input-sub" >
							<option value=" ">Select Name...</option>
							<option value="AL">Alabama</option>
							<option value="AK">Alaska</option>
						</select >
						<div className='Modal-data-time'>
							<div className='Modal-two-input'>
								<h6>Reports to</h6>
								<select id="Modal-textarea-input-sub" >
									<option value=" ">Select line manager</option>
									<option value="AL">Alabama</option>
									<option value="AK">Alaska</option>
								</select >
							</div>
							<div className='div-space' />
							<div className='Modal-two-input'>
								<h6>No of Days</h6>
								<select id="Modal-textarea-input-sub" >
									<option value=" ">Select number of days</option>
									<option value="AL">Alabama</option>
									<option value="AK">Alaska</option>
								</select >
							</div>
						</div>
						<div className='Modal-data-time'>
							<div className='Modal-two-input'>
								<h6>Start Date</h6>
								<input id='Modal-textarea-input-sub' placeholder='Select start date of leave' type={'date'} />
							</div>
							<div className='div-space' />
							<div className='Modal-two-input'>
								<h6>End Date</h6>
								<input id='Modal-textarea-input-sub' placeholder='Select end date of leave' type={'date'} />
							</div>
						</div>
						<div className='Modal-textarea-middle'>
							<h6>Description</h6>
							<textarea rows={6} className='Modal-textarea' placeholder='Enter detailed reason for leave' />
						</div>
						<div className='btn-modal-container'>
							<Button variant="contained" className="Add-btn-modal">
								APPLY
							</Button>
						</div>
					</div>

				</Modal.Body>
			</Modal>
		</div>
	)
}

export default ApplyForLeave

