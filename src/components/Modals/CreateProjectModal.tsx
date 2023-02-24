import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Button } from '@material-ui/core';
import { MdOutlineClose } from 'react-icons/md';
import { BsPlusLg } from 'react-icons/bs';

const CreateProjectModal = (props: any) => {

	const [lgShow, setLgShow] = useState(false);

	return (
		<div>
			<Button className='subone-header-flex-btn' onClick={() => setLgShow(true)}>
				<BsPlusLg size={10} color='#fff' className='Create-plue-account' /> Create Project</Button>
			<Modal
				size="lg"
				show={lgShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header  >
					<span>

					</span>
					<span className='span-center-title'>Create Project</span>
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
								<h6>Department</h6>
								<select id="Modal-textarea-input-sub" >
									<option value=" ">Select Department</option>
									<option value="AL">Software</option>
									<option value="AK">Sales</option>
								</select >
							</div>
							<div className='div-space' />
							<div className='Modal-two-input'>
								<h6>Team Lead</h6>
								<select id="Modal-textarea-input-sub" >
									<option value=" ">Select Team Lead</option>
									<option value="AL">Sam</option>
									<option value="AK">John</option>
								</select >
							</div>
						</div>
						<div className='Modal-textarea-middle'>
							<h6>Description</h6>
							<textarea rows={6} className='Modal-textarea' placeholder='Enter detailed description' />
						</div>
						<div className='Modal-data-time'>
							<div className='Modal-two-input'>
								<h6>L G A</h6>
								<select id="Modal-textarea-input-sub" >
									<option value=" ">Select LGA</option>
									<option value="AL">Sam</option>
									<option value="AK">John</option>
								</select >
							</div>
							<div className='div-space' />
							<div className='Modal-two-input'>
								<h6>Country</h6>
								<select id="Modal-textarea-input-sub" >
									<option value=" ">Select Country</option>
									<option value="AL">Sam</option>
									<option value="AK">John</option>
								</select >
							</div>
						</div>
						<div className='Modal-textarea-middle'>
							<h6>Proposed Completion Date</h6>
							<input id='Modal-textarea-input-sub' placeholder='Select proposed completion date' type={'date'} />
						</div>
						<div className='btn-modal-container'>
							<Button variant="contained" className="Add-btn-modal">
								Create
							</Button>
						</div>
					</div>

				</Modal.Body>
			</Modal>
		</div>
	)
}

export default CreateProjectModal


