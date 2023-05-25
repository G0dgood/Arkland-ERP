import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { MdOutlineClose } from 'react-icons/md';

const DeleteModals = ({ isLoading1, handleDelete, showdelete, setShowDelete, Header }: any) => {


	const handleDeleteClose = () => setShowDelete(false);



	return (
		<div>
			<Modal
				show={showdelete}
				onHide={handleDeleteClose}
				backdrop="static"
				keyboard={false}
				className="kpi-modal"
			>
				<Modal.Header>
					<span>{/*  */}</span>
					<span className="span-center-title">Delete {Header}</span>
					<Button style={{ color: "#fff" }} onClick={() => setShowDelete(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<p>Are you Sure?</p>
					<p>This action cannot be reversed</p>
					<p className="last-line">Ensure you've "Checked" before you hit "Yes"</p>

					<div className='deleteKPIHandler'>
						<span className='deleteKPIHandler-mr'>
							<Button className="table-link-active">
								Close
							</Button>
						</span>
						<span >
							<Button className="table-link" onClick={handleDelete} >
								{isLoading1 ? <Spinner animation="border" /> : "Yes"}
							</Button>
						</span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default DeleteModals
