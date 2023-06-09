import React, { useState } from 'react'

const Chatsidebar = ({ setUserID }: any) => {

	const [activeTab, setActiveTab] = useState<any>(0)




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

			<div className="overlay"></div>
		</div>
	)
}

export default Chatsidebar