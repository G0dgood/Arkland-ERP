import React, { useState } from 'react'

const Chatsidebar = ({ setUserID }: any) => {

	const [activeTab, setActiveTab] = useState<any>(0)

	console.log('activeTab', activeTab)


	const obj = [
		{
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png",
			name: "Madison Jones",
			message: "What time was our meet",
			time: "20m"
		},
		{
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%2812%29.png",
			name: "Nice Group",
			message: "Adaptogen taiyaki austin jean shorts brunch",
			time: "20m"
		},
		{
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%282%29.png",
			name: "Lea Debere",
			message: "Adaptogen taiyaki austin jean shorts brunch",
			time: "20m"
		},
		{
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%282%29.png",
			name: "Jordan Smith",
			message: "Adaptogen taiyaki austin jean shorts brunch",
			time: "20m"
		},
		{
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29+%281%29.png",
			name: "Jared Jackson",
			message: "Adaptogen taiyaki austin jean shorts brunch",
			time: "20m"
		},
		{
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%284%29+%281%29.png",
			name: "Henry Clark",
			message: "Adaptogen taiyaki austin jean shorts brunch",
			time: "20m"
		},
		{
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png",
			name: "Jason Mraz",
			message: "Adaptogen taiyaki austin jean shorts brunch",
			time: "20m"
		},
		{
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/qs6F3dgm.png",
			name: "Chiwa Lauren",
			message: "Adaptogen taiyaki austin jean shorts brunch",
			time: "20m"
		},
		{
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%288%29.png",
			name: "Miguel Cohen",
			message: "Adaptogen taiyaki austin jean shorts brunch",
			time: "20m"
		},
		{
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%289%29.png",
			name: "Caroline Orange",
			message: "Adaptogen taiyaki austin jean shorts brunch",
			time: "20m"
		},
		{
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%286%29.png",
			name: "Lina Ashma",
			message: "Adaptogen taiyaki austin jean shorts brunch",
			time: "20m"
		}
	]

	return (
		<div className="conversation-area">
			{obj?.map((item: any, i: any) => (
				<div className="msg online" key={i} onClick={() => { setUserID(item); setActiveTab(i) }}>
					<img className="msg-profile" src={item?.img} alt="" />
					<div className="msg-detail">
						<div className="msg-username">{item?.name}</div>
						<div className="msg-content">
							<span className="msg-message">{item?.message}</span>
							<span className="msg-date">{item?.time}</span>
						</div>
					</div>
				</div>
			))}
			{/* <div className="msg">
				<img className="msg-profile" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%2812%29.png" alt="" />
				<div className="msg-detail">
					<div className="msg-username">Miguel Cohen</div>
					<div className="msg-content">
						<span className="msg-message">Adaptogen taiyaki austin jean shorts brunch</span>
						<span className="msg-date">20m</span>
					</div>
				</div>
			</div>

			<div className="msg active">
				<div className="msg-profile group">
					<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1">
						<path d="M12 2l10 6.5v7L12 22 2 15.5v-7L12 2zM12 22v-6.5" />
						<path d="M22 8.5l-10 7-10-7" />
						<path d="M2 15.5l10-7 10 7M12 2v6.5" />
					</svg>
				</div>
				<div className="msg-detail">
					<div className="msg-username">CodePen Group</div>
					<div className="msg-content">
						<span className="msg-message">Aysenur: I love CSS</span>
						<span className="msg-date">28m</span>
					</div>
				</div>
			</div>

			<div className="msg online">
				<img className="msg-profile" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%282%29.png" alt="" />
				<div className="msg-detail">
					<div className="msg-username">Lea Debere</div>
					<div className="msg-content">
						<span className="msg-message">Shoreditch iPhone jianbing</span>
						<span className="msg-date">45m</span>
					</div>
				</div>
			</div>

			<div className="msg online">
				<img className="msg-profile" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29+%281%29.png" alt="" />
				<div className="msg-detail">
					<div className="msg-username">Jordan Smith</div>
					<div className="msg-content">
						<span className="msg-message">Snackwave craft beer raclette, beard kombucha </span>
						<span className="msg-date">2h</span>
					</div>
				</div>
			</div>
			<div className="msg">
				<img className="msg-profile" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%284%29+%281%29.png" alt="" />
				<div className="msg-detail">
					<div className="msg-username">Jared Jackson</div>
					<div className="msg-content">
						<span className="msg-message">Tattooed brooklyn typewriter gastropub</span>
						<span className="msg-date">18m</span>
					</div>
				</div>
			</div>
			<div className="msg online">
				<img className="msg-profile" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png" alt="" />
				<div className="msg-detail">
					<div className="msg-username">Henry Clark</div>
					<div className="msg-content">
						<span className="msg-message">Ethical typewriter williamsburg lo-fi street art</span>
						<span className="msg-date">2h</span>
					</div>
				</div>
			</div>
			<div className="msg">
				<img className="msg-profile" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/qs6F3dgm.png" alt="" />
				<div className="msg-detail">
					<div className="msg-username">Jason Mraz</div>
					<div className="msg-content">
						<span className="msg-message">I'm lucky I'm in love with my best friend</span>
						<span className="msg-date">4h</span>
					</div>
				</div>
			</div>
			<div className="msg">
				<img className="msg-profile" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%288%29.png" alt="" />
				<div className="msg-detail">
					<div className="msg-username">Chiwa Lauren</div>
					<div className="msg-content">
						<span className="msg-message">Pabst af 3 wolf moon</span>
						<span className="msg-date">28m</span>
					</div>
				</div>
			</div>
			<div className="msg">
				<img className="msg-profile" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%289%29.png" alt="" />
				<div className="msg-detail">
					<div className="msg-username">Caroline Orange</div>
					<div className="msg-content">
						<span className="msg-message">Bespoke aesthetic lyft woke cornhole</span>
						<span className="msg-date">35m</span>
					</div>
				</div>
			</div>
			<div className="msg">
				<img className="msg-profile" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%286%29.png" alt="" />
				<div className="msg-detail">
					<div className="msg-username">Lina Ashma</div>
					<div className="msg-content">
						<span className="msg-message">Migas food truck crucifix vexi</span>
						<span className="msg-date">42m</span>
					</div>
				</div>
			</div> */}
			<div className="overlay"></div>
		</div>
	)
}

export default Chatsidebar