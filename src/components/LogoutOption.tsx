import { Button } from '@material-ui/core';
import { Modal, Spinner } from 'react-bootstrap'
import { MdOutlineClose } from 'react-icons/md';
import { useState } from 'react';
import HttpService from './HttpService';
import DataService from '../utils/dataService';

const dataService = new DataService();

const LogoutOption = ({ showLogout, setShowLogout, socket }: any) => {


	const [isLoading, setisLoading] = useState<any>(false);
	const handleLogoutClose = () => setShowLogout(false);

	const handleLogout = async () => {
		setisLoading(true);
		socket.disconnect()
		try {
			await HttpService.patch("me/logout", {})
			dataService.clearData()
			setisLoading(false);
			window.location.replace("/");
		} catch (error) {
			setisLoading(false);
			dataService.clearData()
			window.location.replace("/");
		}
	};


	return (
		<div>
			<Modal
				show={showLogout}
				// onHide={handleLogoutClose}
				backdrop="static"
				keyboard={false}
				className="kpi-modal"
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
