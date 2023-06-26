import { Button } from '@material-ui/core';
import { Modal, Spinner } from 'react-bootstrap'
import { MdOutlineClose } from 'react-icons/md';
import { useState } from 'react';
import HttpService from './HttpService';
import DataService from '../utils/dataService';
import { AiOutlineLogout } from 'react-icons/ai';
import { io } from 'socket.io-client';

const dataService = new DataService();

const LogoutOption = () => {

	const socket = io("https://arkland-erp-b4872258abbf.herokuapp.com");
	const [showLogout, setShowLogout] = useState<any>(false);
	const [isLoading, setisLoading] = useState<any>(false);
	const handleLogoutClose = () => setShowLogout(false);

	const handleLogout = async () => {
		setisLoading(true);
		socket.disconnect()
		try {
			await HttpService.patch("me/logout", {})
			window.location.replace("/");
			dataService.clearData()
			setisLoading(false);
		} catch (error) {
			window.location.replace("/");
			setisLoading(false);
			dataService.clearData()
		}
	};


	return (
		<div>
			<Button onClick={() => setShowLogout(true)}>
				<AiOutlineLogout size={30} color='red' />
			</Button>
			<Modal
				show={showLogout}
				// onHide={handleLogoutClose}
				backdrop="static"
				// keyboard={false}
				className="kpi-modal"
				centered
			>
				<Modal.Header>
					<span>{/*  */}</span>
					{/* <span className="span-center-title">Logout</span> */}
					<Button style={{ color: "#fff" }} onClick={handleLogoutClose}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<p>Logout</p>
					<p>Are you Sure you want to logout?</p>
					<p className="last-line"> </p>

					<div className='deleteKPIHandler'>
						<span className='deleteKPIHandler-mr' onClick={() => setShowLogout(false)}>
							<Button className="table-link-active">
								Close </Button></span>
						<span ><Button className="table-link" onClick={handleLogout} >
							{isLoading ? <Spinner animation="border" /> : "Yes"}
						</Button></span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default LogoutOption
