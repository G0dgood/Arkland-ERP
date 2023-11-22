

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
import { MdPayment } from "react-icons/md";


const PayRunModal = () => {
	const navigate = useNavigate();
	const [lgShow, setLgShow] = useState(false);




	const loremIpsumData = [
		'Basic pay',
		'Sponsorship Allow',
		'Fixed Overtime ',
		'Overtime ',
		'Bonus',
		'Housing Allowance',
		'Meal',
		'Medical',
		'Leave Allow',
		'Utility',
		'Staff Daily Transport',
		'Transport',
		'Gross Pay',
		'Senior CESSA Dues',
		'Junior Union Dues',
		'Penalty',
		'Staff Advance I.O.U 1',
		'Absenteesiem',
		'Net Pay',
		'Number of Staff',
	];
	const loremIpsumData2 = [
		'₦34456434466.00',
		'₦135678466.00',
		'₦234567466.00',
		'₦345466.00',
		'₦2345466.00',
		'₦23456466.00',
		'₦3456466.00',
		'₦76543466.00',
		'₦3456466.00',
		'₦3456466.00',
		'₦3456466.00',
		'₦3456466.00',
		'₦2345466.00',
		'₦2453466.00',
		'₦4534466.00',
		'₦253466.00',
		'₦25466.00',
		'₦2453466.00',
		'₦2536466.00',
		'₦425364766.00',
	];


	return (
		<div>
			<Button id="view-status" onClick={() => setLgShow(true)}>Run</Button>
			{/* <ul className="nav-tabs-btn mb-3">
				<li className={"active"} onClick={() => setLgShow(true)}>Apply for Leave</li>
			</ul> */}

			<Modal
				size="lg"
				show={lgShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered>
				<ModalHeader setLgShow={setLgShow} icon={<MdPayment size={30} />} title={" Payment History"} subtitle={"Pay Run Payment History  "} />

				<Modal.Body>

					<div className='approve-container'>
						<div className='approve-container-main1'>
							{/* <h2>Current Value</h2> */}
							<ol>
								{loremIpsumData.map((item, index) => (
									<li key={index} >{`${index + 1 + ")"}.`}<span style={{ fontWeight: "bold" }} >{`${item}`}</span></li>
								))}
							</ol>
						</div>
						<div className='approve-container-divider'></div>
						<div className='approve-container-main2'>
							<ol>
								{/* <h2>New Value</h2> */}
								{loremIpsumData2.map((item, index) => (
									<li key={index} >{`${item}`}</li>
								))}
							</ol>
							{/* <div className='approve-buttons'>
								<button className='approve-button'>Approve</button>
								<button className='reject-button'>Reject</button>
							</div> */}
							<div style={{ display: "flex", justifyContent: "flex-end", }}>
								<Button style={{ border: "2px solid #990000", padding: "2px 5px 2px 5px", borderRadius: "5px", marginTop: "5px", color: "#990000" }}>Close</Button>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default PayRunModal

