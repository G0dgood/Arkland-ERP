
import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { MdOutlineClose } from 'react-icons/md';
import KPIAssessment from '../../pages/kpi_assessment/KPIAssessment';
import HttpService from '../HttpService';

const CreateKpiModal = () => {
	const [show, setShow] = useState(false);

	const [hods, setHods] = useState<any>([]);



	console.log('hods', hods)



	const getData = async () => {
		// setisLoading(true)
		try {
			const employeesUrl = "hr/hods"
			const employees: any = await HttpService.get(employeesUrl)
			setHods(employees?.data?.data)

			// setisLoading(false)

		} catch (error) {
			// setisLoading(false)
		}
	}

	return (
		<>
			<Button className="table-create-btn" onClick={() => { setShow(true); getData() }} style={{ marginLeft: "1rem" }}>
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
						<KPIAssessment setShow={setShow} hods={hods} />
					</main>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default CreateKpiModal