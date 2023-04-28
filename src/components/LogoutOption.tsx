import { Button } from '@material-ui/core';
import { Modal, Spinner } from 'react-bootstrap'
import { MdOutlineClose } from 'react-icons/md';

const LogoutOption = ({ isLoading1, handleLogout, showLogout, setShowLogout }: any) => {



	const handleLogoutClose = () => setShowLogout(false);



	return (
		<div>
			<Modal
				show={showLogout}
				onHide={handleLogoutClose}
				backdrop="static"
				keyboard={false}
				className="kpi-modal"
			>
				<Modal.Header>
					<span>{/*  */}</span>
					{/* <span className="span-center-title">Logout</span> */}
					<Button style={{ color: "#fff" }} onClick={() => setShowLogout(false)}>
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
							{isLoading1 ? <Spinner animation="border" /> : "Yes"}
						</Button></span>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default LogoutOption
