import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import DataService from '../utils/dataService';
import { io } from 'socket.io-client';
import createHttpService from './HttpService';
import { SVGLoader } from './SVGLoader';


const dataService = new DataService();
const LogoutModal = ({ showLogout, setShowLogout, setDropDown }: any) => {
	const navigate = useNavigate();
	const userInfo = dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`)
	const socket = io("https://arkland-erp-b4872258abbf.herokuapp.com");
	const [isLoading, setisLoading] = useState<any>(false);


	const handleLogout = async () => {
		const HttpService = createHttpService();
		setisLoading(true);
		socket.disconnect()
		try {
			await HttpService.patch("me/logout", {})
			navigate("/");
			dataService.clearData()
			localStorage.removeItem(userInfo?.employee?.email);
			setisLoading(false);
		} catch (error) {
			navigate("/");
			setisLoading(false);
			dataService.clearData()
			localStorage.removeItem(userInfo?.employee?.email);
		}
	};




	return (
		<div>
			<Modal show={showLogout} centered>
				<div className="popup__container">
					<div className="popup__modal">
						<div className="popup__modal_header">
							<div className="popup__modal_title">
								<h5>Are You sure want to exit?</h5>
							</div>
						</div>
						{/* <!--     <div className="popup__modal_body">
							<div className="popup__modal_text">
								The progress isn't automatically saved, consider to save your progress before exiting!
							</div>
						</div> --> */}
						<div className="popup__modal_footer">
							<button id="button-modal-cancel" className="popup__modal_button" onClick={() => { setShowLogout(false); setDropDown(false) }}>Cancel</button>
							<button id="button-modal-continue" className="popup__modal_button" disabled={isLoading} onClick={handleLogout}>
								{isLoading ? <SVGLoader width={"30px"} height={"30px"} color={"#fff"} /> : 'Continue'}</button>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	)
}

export default LogoutModal