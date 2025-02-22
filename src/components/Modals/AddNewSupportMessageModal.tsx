import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Button } from '@material-ui/core';
import { ModalHeader } from './ModalOptions';
import { BiMessageDetail } from 'react-icons/bi';

const AddNewSupportMessageModal = (props: any) => {

	const [lgShow, setLgShow] = useState(false);

	return (
		<div>
			<Button variant="contained" className="add-experience"
				onClick={() => setLgShow(true)}>
				New Message
			</Button>
			<Modal
				size="lg"
				show={lgShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<ModalHeader setLgShow={setLgShow} icon={<BiMessageDetail size={30} />} title={"New Message"} subtitle={"New Message"} />
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

							</div>
						</div>
						<div className='btn-modal-container'>
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

export default AddNewSupportMessageModal