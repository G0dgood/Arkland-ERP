import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { MdOutlineClose } from 'react-icons/md'

const CreateWarningModal = () => {

	const [lgShow, setLgShow] = useState(false);
	return (
		<div>
			<Button variant="contained" className="Add-btn"
				onClick={() => setLgShow(true)}>
				Create Warning
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
					<span className='span-center-title'>	Create Warning</span>
					<Button style={{ color: '#fff' }} onClick={() => setLgShow(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<div className='Modal-Body'>
						<h6>Employee ID</h6>
						<select id="Modal-textarea-input-sub" >
							<option value=" ">Select employee ID...</option>
							<option value="AL">Alabama</option>
							<option value="AK">Alaska</option>
						</select >

						<div className='modal-input-sub-space'>
							<h6>Misconduct</h6>
							<select id="Modal-textarea-input-sub" >
								<option value=" ">Select type of Misconduct...</option>
								<option value="AL">Alabama</option>
								<option value="AK">Alaska</option>
							</select >
						</div>

						<div className='Modal-textarea-middle'>
							<h6>Message</h6>
							<textarea rows={6} className='Modal-textarea' placeholder='Comment on warning ' />
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

export default CreateWarningModal
