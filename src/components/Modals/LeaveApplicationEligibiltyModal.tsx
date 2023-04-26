import React from 'react'
import { Button } from '@material-ui/core';
import { Modal, Spinner } from 'react-bootstrap'
import { MdOutlineClose } from 'react-icons/md';
import { BsExclamationTriangle } from 'react-icons/bs';

const LeaveApplicationEligibiltyModal = ({ lgShow, setLgShow, daysLeft }: any) => {
	return (
		<div>
			<Modal
				show={lgShow}
				onHide={lgShow}
				backdrop="static"
				keyboard={false}
				className="kpi-modal"
			>
				<Modal.Header>
					<span>{/*  */}</span>
					<Button style={{ color: "#fff" }} onClick={() => setLgShow(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<BsExclamationTriangle size={70} color='red' />
					<h2>Not Eligible</h2>
					<p>You have <code>{daysLeft}</code> days left</p>
					<p className="last-line"> </p>


				</Modal.Body>
			</Modal>
		</div>
	)
}

export default LeaveApplicationEligibiltyModal
