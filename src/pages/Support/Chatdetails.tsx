import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

const Chatdetails = ({ userID }: any) => {
	return (
		<div className="detail-area">
			<div className="detail-area-header">
				<div className="msg-profile group">
					{!userID?.img ? <FaUserCircle size={50} color='#990000' /> : <img className="user-profile  account-profile" src={userID?.img} alt={userID?.name} />}
				</div>
				<div className="detail-title">{!userID?.name ? 'User' : userID?.name}</div>
				<div className="detail-subtitle">Created by Aysenur, 1 May 2020</div>

			</div>
		</div>
	)
}

export default Chatdetails