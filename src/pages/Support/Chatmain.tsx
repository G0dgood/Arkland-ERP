/* eslint-disable jsx-a11y/alt-text */
import React from 'react'

const Chatmain = ({ userID }: any) => {






	return (
		<div className="chat-area">
			<div className="chat-area-header">
				<div className="chat-area-title"> {!userID?.name ? "Chat" : userID?.name}</div>

			</div>
			<div className="chat-area-main">
				<div className="chat-msg">
					<div className="chat-msg-profile">
						<img className="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png" alt="" />
						<div className="chat-msg-date">Message seen 1.22pm</div>
					</div>
					<div className="chat-msg-content">
						<div className="chat-msg-text">Luctus et ultrices posuere cubilia curae.</div>
						<div className="chat-msg-text">
							<img src="https://media0.giphy.com/media/yYSSBtDgbbRzq/giphy.gif?cid=ecf05e47344fb5d835f832a976d1007c241548cc4eea4e7e&rid=giphy.gif" />
						</div>
						<div className="chat-msg-text">Neque gravida in fermentum et sollicitudin ac orci phasellus egestas. Pretium lectus quam id leo.</div>
					</div>
				</div>
				<div className="chat-msg owner">
					<div className="chat-msg-profile">
						<img className="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png" alt="" />
						<div className="chat-msg-date">Message seen 1.22pm</div>
					</div>
					<div className="chat-msg-content">
						<div className="chat-msg-text">Sit amet risus nullam eget felis eget. Dolor sed viverra ipsum😂😂😂</div>
						<div className="chat-msg-text">Cras mollis nec arcu malesuada tincidunt.</div>
					</div>
				</div>
				<div className="chat-msg">
					<div className="chat-msg-profile">
						<img className="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%282%29.png" alt="" />
						<div className="chat-msg-date">Message seen 2.45pm</div>
					</div>
					<div className="chat-msg-content">
						<div className="chat-msg-text">Aenean tristique maximus tortor non tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae😊</div>
						<div className="chat-msg-text">Ut faucibus pulvinar elementum integer enim neque volutpat.</div>
					</div>
				</div>
				<div className="chat-msg owner">
					<div className="chat-msg-profile">
						<img className="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png" alt="" />
						<div className="chat-msg-date">Message seen 2.50pm</div>
					</div>
					<div className="chat-msg-content">
						<div className="chat-msg-text">posuere eget augue sodales, aliquet posuere eros.</div>
						<div className="chat-msg-text">Cras mollis nec arcu malesuada tincidunt.</div>
					</div>
				</div>
				<div className="chat-msg">
					<div className="chat-msg-profile">
						<img className="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%2812%29.png" alt="" />
						<div className="chat-msg-date">Message seen 3.16pm</div>
					</div>
					<div className="chat-msg-content">
						<div className="chat-msg-text">Egestas tellus rutrum tellus pellentesque</div>
					</div>
				</div>
				<div className="chat-msg">
					<div className="chat-msg-profile">
						<img className="chat-msg-img account-profile" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png" alt="" />
						<div className="chat-msg-date">Message seen 3.16pm</div>
					</div>
					<div className="chat-msg-content">
						<div className="chat-msg-text">Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et.</div>
					</div>
				</div>
				<div className="chat-msg owner">
					<div className="chat-msg-profile">
						<img className="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png" alt="" />
						<div className="chat-msg-date">Message seen 2.50pm</div>
					</div>
					<div className="chat-msg-content">
						<div className="chat-msg-text">Tincidunt arcu non sodales😂</div>
					</div>
				</div>
				<div className="chat-msg">
					<div className="chat-msg-profile">
						<img className="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%282%29.png" alt="" />
						<div className="chat-msg-date">Message seen 3.16pm</div>
					</div>
					<div className="chat-msg-content">
						<div className="chat-msg-text">Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et🥰</div>
					</div>
				</div>
			</div>
			<div className="chat-area-footer">
				<input type="text" placeholder="Type something here..." />
			</div>
		</div>
	)
}

export default Chatmain