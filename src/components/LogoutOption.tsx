import { Button } from '@material-ui/core';
import { Modal, Spinner } from 'react-bootstrap'
import { MdOutlineClose } from 'react-icons/md';
import storage from '../utils/dataService';
import axios from 'axios';
import { removeData } from '../AppRoutes';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutOption = ({ showLogout, setShowLogout }: any) => {

	const navigate = useNavigate();


	const [isLoading, setisLoading] = useState<any>(false);


	const handleLogoutClose = () => setShowLogout(false);

	const handleLogout = async () => {
		setisLoading(true);
		await axios
			.patch(`${process.env.REACT_APP_API}/me/logout`)
			.then(() => {
				delete axios?.defaults?.headers?.common["Authorization"];
				Cookies.remove("token");
				storage.remove("user");
				storage.remove("notifications");
				removeData();
				navigate("/");
			})
			.catch((err) => {
				console.log(err);
				setisLoading(false);
			});

		setisLoading(false)
		// window.location.replace("/");
		// window.location.reload();
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
