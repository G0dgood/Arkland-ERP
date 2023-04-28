/* eslint-disable jsx-a11y/alt-text */

import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import Chatmain from './Chatmain';
import Chatsidebar from './Chatsidebar';
import Chatdetails from './Chatdetails';
import { BsChatRightText } from 'react-icons/bs';
import { io } from "socket.io-client";

const Support = (props: any) => {

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

	const [userID, setUserID] = useState<any>(0)

	// console.log('userID', userID)

	return (
		<div id="screen-wrapper">
			<Header toggleSideNav={toggleSideNav} />
			<Sidebar collapseNav={collapseNav} />
			<main>
				<div className="app-chat">
					<div className="header-chat">
						<div className="logo">
							<BsChatRightText size={30} color="#990000" />
						</div>
						<div className="user-settings">
							<img className="user-profile  account-profile" src={userID?.img} alt={userID?.name} />
						</div>
					</div>
					<div className="wrapper-chat">
						{/* chat side bar */}
						<Chatsidebar setUserID={setUserID} />
						{/* Chat main */}
						<Chatmain userID={userID} />
						{/* Chat details */}
						<Chatdetails userID={userID} />
					</div>
				</div>
			</main>
		</div>
	)
}

export default Support





