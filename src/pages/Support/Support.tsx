
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { Modal } from 'react-bootstrap';
import MyMessage from '../../components/SupportComponents/MyMessage';
import AllMessages from '../../components/SupportComponents/AllMessages';
import ChatBoard from '../../components/SupportComponents/ChatBoard';
import NewMessage from '../../components/SupportComponents/NewMessage';

const Support = (props: any) => {



	// --- New Message Modal --- //
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const [activeTab, setActiveTab] = useState(0)
	const tabs = ["My message", "All message"]
	const tabPanels = [
		{ component: <MyMessage handleShow={handleShow} /> },
		{ component: <AllMessages /> }
	]
	const [collapseNav, setCollapseNav] = useState(() => {
		// @ts-ignore
		return JSON.parse(localStorage.getItem("collapse")) || false;
	});

	useEffect(() => {
		// --- Set state of collapseNav to localStorage on pageLoad --- //
		localStorage.setItem("collapse", JSON.stringify(collapseNav));
		// --- Set state of collapseNav to localStorage on pageLoad --- //
	}, [collapseNav]);
	const toggleSideNav = () => {
		setCollapseNav(!collapseNav);
	};


	return (
		<div id="screen-wrapper">
			<Header toggleSideNav={toggleSideNav} />
			<Sidebar collapseNav={collapseNav} />
			<main>
				<h4 className="page-title">Support Messaging</h4>
				<ul className="nav-tabs">
					{tabs.map((item, i) =>
						// @ts-ignore
						<li key={i} className={activeTab === i && "active"} onClick={() => setActiveTab(i)}>{item}</li>
					)}
				</ul>
				<div className="msg-area">
					<div className="msg-table">
						{tabPanels[activeTab].component}
					</div>
					<div className="msg-board">
						<ChatBoard />
					</div>
				</div>

				<Modal
					// @ts-ignore
					size="md"
					show={show}
					onHide={handleClose}
					backdrop="static"
					keyboard={false}>
					<Modal.Header closeButton>
						<Modal.Title>Start New Message</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<NewMessage />
					</Modal.Body>
				</Modal>

			</main>
		</div>
	)
}

export default Support