import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { BiUser } from 'react-icons/bi';
import HodEvaluation from '../../pages/kpi_assessment/HodEvaluate';
import axios, { AxiosResponse } from 'axios';

const ViewKPImodal = ({ id }: any) => {

	console.log("id", id)


	// const fetchData = async () => {
	// 	setisLoading(true);
	// 	fetch(`${process.env.REACT_APP_API}/hr/appraisals/${id}`, {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			Authorization: "Bearer " + token,
	// 		},
	// 	})
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			console.log("Success:", data);
	// 		})
	// 		.catch((error) => {
	// 			console.error("Error:", error);
	// 		});
	// }
	// fetchData()

	return (
		<div id="page-wrapper">

			{/* <Button id="team-applicatiom-update" className="me-2 mb-2" onClick={() => handleShow()}>View</Button>

			<Modal fullscreen={true} show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>
						<span className="span-center-title" >Update Performance</span>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>

				</Modal.Body>
			</Modal> */}
		</div>

	)
}

export default ViewKPImodal




