import { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { Button } from '@material-ui/core';
import { fireAlert } from "../../utils/Alert";
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { createLeave } from '../../features/Leave/leaveSlice';
import { reset } from '../../features/Announcement/announcemetSlice';
import { ModalHeader } from './ModalOptions';
import { BsCalendar4Week } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { IoCheckmarkSharp } from "react-icons/io5";



const ApproveRequest = () => {
	const navigate = useNavigate();
	const [lgShow, setLgShow] = useState(false);




	const loremIpsumData = [
		'Lorem ipsum dolor sit amet',
		'consectetur adipiscing elit',
		'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
		'Ut enim ad minim veniam',
		'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
		'Lorem ipsum dolor sit amet',
		'consectetur adipiscing elit',
		'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
		'Ut enim ad minim veniam',
		'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
	];


	return (
		<div>
			<Button id="view-status" onClick={() => setLgShow(true)}>Approve</Button>
			{/* <ul className="nav-tabs-btn mb-3">
				<li className={"active"} onClick={() => setLgShow(true)}>Apply for Leave</li>
			</ul> */}

			<Modal
				size="lg"
				show={lgShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered>
				<ModalHeader setLgShow={setLgShow} icon={<IoCheckmarkSharp size={30} />} title={"Approve Request"} subtitle={"View previous and new request before approving"} />

				<Modal.Body>

					<div className='approve-container'>
						<div className='approve-container-main1'>
							<h2>Current Value</h2>
							<ol>
								{loremIpsumData.map((item, index) => (
									<li key={index}>{`${index + 1 + ")"}. ${item}`}</li>
								))}
							</ol>
						</div>
						<div className='approve-container-divider'></div>
						<div className='approve-container-main2'>
							<ol>
								<h2>New Value</h2>
								{loremIpsumData.map((item, index) => (
									<li key={index}>{`${index + 1 + ")"}. ${item}`}</li>
								))}
							</ol>
							<div className='approve-buttons'>
								<button className='approve-button'>Approve</button>
								<button className='reject-button'>Reject</button>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>


		</div>
	)
}

export default ApproveRequest

