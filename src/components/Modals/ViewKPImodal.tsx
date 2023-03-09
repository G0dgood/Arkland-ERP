import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { BiUser } from 'react-icons/bi';
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import HodEvaluation from '../../pages/kpi_assessment/HodEvaluate';
import axios, { AxiosResponse } from 'axios';

const ViewKPImodal = ({ id }: any) => {

	console.log("id", id)
	const [fullscreen, setFullscreen] = useState(true);
	const [show, setShow] = useState(false);

	const handleShow = () => {
		setShow(true);
	}

	const gradeSystem = [
		{ rate: 4, definition: "Exceptional" },
		{ rate: 3, definition: "Meets Expected" },
		{ rate: 2, definition: "Marginal" },
		{ rate: 1, definition: "Unsatisfactory" },
	]


	const [data, setData] = useState<any>([]);
	const [sortData, setSortData] = useState([]);
	const [searchItem, setSearchItem] = useState("");
	const [isLoading, setisLoading] = useState(false);


	React.useEffect(() => {
		const source = axios.CancelToken.source();
		setisLoading(true);
		axios
			.get(`${process.env.REACT_APP_API}/hr/appraisals/${id}`)
			.then((res: AxiosResponse) => {
				setData(res?.data?.data);
				console.log("res-appraisals-res", res?.data)
				setisLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setisLoading(false);
			});
		return () => {
			source.cancel();
		};
	}, [id]);

	return (
		<div id="page-wrapper">

			<Button id="team-applicatiom-update" className="me-2 mb-2" onClick={() => handleShow()}>View</Button>

			<Modal fullscreen={true} show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>
						<span className="span-center-title" >Create Event</span>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div id="performance">

						<h3 className="page-title">
							{/* @ts-ignore */}
							<div >
								<h5>	HOD Evaluations | Update Performance</h5>
							</div>
						</h3>
						<section className="area-grid">
							<div className="evaluation-area">
								<div id="edit-user">
									<div className="user-info">
										<BiUser size={80} />
										<div>
											<h3>John Adibe</h3>
											<p>john.adibe@outcess.com</p>
											<p>OUT/ADM/269</p>
										</div>
									</div>
								</div>
								<HodEvaluation />
							</div>
							<div className="info-area">
								<div className="grade-system">
									<h4>Grading System</h4>
									{gradeSystem.map(item =>
										<div key={item.rate} className="grade_item">
											<p>{item.rate}</p>
											<p>{item.definition}</p>
										</div>
									)}
								</div>
							</div>
						</section>
					</div>
				</Modal.Body>
			</Modal>
		</div>

	)
}

export default ViewKPImodal




