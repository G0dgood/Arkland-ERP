import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Button } from '@material-ui/core';
import { MdOutlineClose } from 'react-icons/md';

const AddNewSupportMessageModal = (props: any) => {

	const [lgShow, setLgShow] = useState(false);

	return (
		<div>
			<Button variant="contained" className="Add-btn"
				onClick={() => setLgShow(true)}>
				New Message
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
					<span className='span-center-title'>New Message</span>
					<Button style={{ color: '#fff' }} onClick={() => setLgShow(false)}>
						<MdOutlineClose size={28} />
					</Button>

				</Modal.Header>
				<Modal.Body>
					<div className='Modal-Body'>
						<h6>Subject</h6>
						<input className='Modal-Input' placeholder='Subject of message' />

						<div className='Modal-textarea-middle'>
							<h6>Message</h6>
							<textarea rows={6} className='Modal-textarea' placeholder='What is the announcement about' />
						</div>
						<div className='Modal-data-time'>
							<div className='Modal-two-input'>
								<h6>Date</h6>
								<input id='Modal-textarea-input-sub' placeholder='What is the announcement about' type={'date'} />
							</div>
							<div className='div-space' />
							<div className='Modal-two-input'>
								<h6>Time</h6>
								<input id='Modal-textarea-input-sub' placeholder='What is the announcement about' type={'time'} />
								{/* <select id="Modal-textarea-input-sub" >
									<option value="none">(None)</option>
									<option value="AL">Alabama</option>
									<option value="AK">Alaska</option>
								</select > */}
							</div>
						</div>
						<div className='btn-modal-container'>
							<Button variant="contained" className="Add-btn-modal">
								CREATE
							</Button>
						</div>
					</div>

				</Modal.Body>
				{/* <Modal.Footer>
					<Button onClick={props.onHide}>Close</Button>
				</Modal.Footer> */}
			</Modal>
		</div>
	)
}

export default AddNewSupportMessageModal