
import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { MdOutlineClose } from 'react-icons/md';
import KPIAssessment from '../../pages/kpi_assessment/KPIAssessment';

const CreateKpiModal = () => {
	const [show, setShow] = useState(false);

	return (
		<>
			<Button className="table-create-btn" onClick={() => setShow(true)} style={{ marginLeft: "1rem" }}>
				Create KPI Assessment
			</Button>
			<Modal
				show={show}
				onHide={() => setShow(false)}
				fullscreen={true}
			>
				<Modal.Header  >
					<span></span>
					<span className="span-center-title">Create Asseccment</span>
					<Button style={{ color: "#fff" }} onClick={() => setShow(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<main>
						<KPIAssessment setShow={setShow} />
					</main>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default CreateKpiModal