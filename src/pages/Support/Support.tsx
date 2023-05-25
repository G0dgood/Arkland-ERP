/* eslint-disable jsx-a11y/alt-text */

import { useState } from 'react'

import Chatmain from './Chatmain';
import Chatsidebar from './Chatsidebar';
import Chatdetails from './Chatdetails';
import { BsChatRightText } from 'react-icons/bs';

const Support = (props: any) => {



	const [userID, setUserID] = useState<any>(0)

	// console.log('userID', userID)



	return (
		<div  >
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





