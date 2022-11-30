import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Button } from '@material-ui/core';
import { MdOutlineClose } from 'react-icons/md';
import { GoPlus } from 'react-icons/go';

const CreateDepartmentModal = (props: any) => {

	const [lgShow, setLgShow] = useState(false);

	return (
		<div>
			<Button variant="contained" className="Add-btn"
				onClick={() => setLgShow(true)}>
				<GoPlus className="icon-space" />{' '}Create Department
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
					<span className='span-center-title'>Create Department</span>
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

						<div className='Modal-textarea-middle'>
							<h6>Description</h6>
							<textarea rows={6} className='Modal-textarea' placeholder='Description of department' />
						</div>
						{/* <div className='Modal-data-time'>
							<div className='Modal-two-input'>
								<h6>Date</h6>
								<input id='Modal-textarea-input-sub' placeholder='What is the announcement about' type={'date'} />
							</div>
							<div className='div-space' />
							<div className='Modal-two-input'>
								<h6>Time</h6>
								<input id='Modal-textarea-input-sub' placeholder='What is the announcement about' type={'time'} />
							</div>
						</div> */}
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

export default CreateDepartmentModal
