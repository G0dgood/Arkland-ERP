import { useState } from 'react'
import { Button } from '@mui/material'
import { Modal } from 'react-bootstrap'
import { MdOutlineClose } from 'react-icons/md'

const CreateAnnouncementModal = () => {

	const [lgShow, setLgShow] = useState(false);
	return (

		<div>
			<Button variant="contained" className="Add-btn"
				onClick={() => setLgShow(true)}>
				Create Announcement
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
					<span className='span-center-title'>Create Announcement</span>
					<Button style={{ color: '#fff' }} onClick={() => setLgShow(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<div className='Modal-Body'>
						<div className='Modal-textarea-middle'>
							<h6>Message</h6>
							<textarea rows={6} className='Modal-textarea' placeholder='What is the announcement about' />
						</div>
						<div className='modal-input-sub-space'>
							<h6>Name</h6>
							<select id="Modal-textarea-input-sub" >
								<option value=" ">Select your audience...</option>
								<option value="AL">Alabama</option>
								<option value="AK">Alaska</option>
							</select >
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
						<div className='btn-modal-container'>
							<Button variant="contained" className="Add-btn-modal">
								CREATE
							</Button>
						</div>
					</div>

				</Modal.Body>
			</Modal>
		</div>
	)
}

export default CreateAnnouncementModal