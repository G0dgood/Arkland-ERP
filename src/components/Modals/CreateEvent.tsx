import { useState } from 'react'
import { Button } from '@mui/material'
import { Modal } from 'react-bootstrap'
import { ModalHeader } from './ModalOptions'
import { BsCalendar2Event } from 'react-icons/bs'

const CreateEvent = () => {
	const [lgShow, setLgShow] = useState(false);
	return (

		<div>
			<ul className="nav-tabs-btn mb-3">
				<li className={"active"} onClick={() => setLgShow(true)}> 	Create Event</li>
			</ul>
			<Modal
				size="lg"
				show={lgShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<ModalHeader setLgShow={setLgShow} icon={<BsCalendar2Event size={30} />} title={"Create Event"} subtitle={"Create An Event"} />
				<Modal.Body>
					<div className='Modal-Body'>
						<div className='modal-input-sub-space'>
							<h6>Event Title</h6>
							<select id="Modal-textarea-input-sub" >
								<option value=" ">Select title of event...</option>
								<option value="AL">Alabama</option>
								<option value="AK">Alaska</option>
							</select >
						</div>
						<div className='Modal-textarea-middle'>
							<h6>Description</h6>
							<textarea rows={6} className='Modal-textarea' placeholder='Description of event' />
						</div>

						<div className='Modal-data-time'>
							<div className='Modal-two-input'>
								<h6>Date</h6>
								<input id='Modal-textarea-input-sub' placeholder='Select start date of leave' type={'date'} />
							</div>
							<div className='div-space' />
							<div className='Modal-two-input'>
								<h6>Time</h6>
								<input id='Modal-textarea-input-sub' placeholder='Select end date of leave' type={'time'} />
							</div>
						</div>
						<div className='btn-modal-container' style={{ display: "flex", justifyContent: "flex-end" }}>
							<Button variant="contained" className="add-experience">
								CREATE
							</Button>
						</div>
					</div>

				</Modal.Body>
			</Modal>
		</div>
	)
}

export default CreateEvent