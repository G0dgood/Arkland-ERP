import { Button } from '@material-ui/core';
import { Modal, Spinner } from 'react-bootstrap'
import { useState } from 'react';
import HttpService from './HttpService';
import DataService from '../utils/dataService';
import { AiOutlineLogout } from 'react-icons/ai';
import { io } from 'socket.io-client';

const dataService = new DataService();

const LogoutOption = ({ open, setOpen }: any) => {
	const userInfo = dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`)
	const socket = io("https://arkland-erp-b4872258abbf.herokuapp.com");
	const [showLogout, setShowLogout] = useState<any>(false);
	const [isLoading, setisLoading] = useState<any>(false);


	const handleLogout = async () => {
		setisLoading(true);
		socket.disconnect()
		try {
			await HttpService.patch("me/logout", {})
			window.location.replace("/");
			dataService.clearData()
			localStorage.removeItem(userInfo?.employee?.email);
			setisLoading(false);
		} catch (error) {
			window.location.replace("/");
			setisLoading(false);
			dataService.clearData()
			localStorage.removeItem(userInfo?.employee?.email);
		}
	};

	const handlelogout = () => {
		setShowLogout(true)
	}
	const handleLogoutClose = () => {
		setOpen(false)
		setShowLogout(false);
	}

	return (
		<div>
			<Button onClick={handlelogout}>
				<AiOutlineLogout size={30} color='red' /> <span className='LogoutOption-Logout'>Logout</span>
			</Button>
			<Modal
				show={showLogout || open}
				backdrop="static"
				// keyboard={false}
				className="kpi-modal"
				centered
			>

				<Modal.Body>
					<p>Logout</p>
					<p>Are you Sure you want to logout?</p>
					<p className="last-line"> </p>

					<div className='deleteKPIHandler'>
						<span className='deleteKPIHandler-mr' onClick={handleLogoutClose}>
							<Button className="table-link-active">
								Close </Button></span>
						<span >
							<Button className="table-link" onClick={handleLogout} style={{ height: "2rem" }}>
								{isLoading ? <Spinner animation="border" size='sm' /> : "Yes"}
							</Button></span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default LogoutOption
