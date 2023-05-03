import Cookies from 'js-cookie';
import { io } from "socket.io-client";
import toast, { Toaster } from 'react-hot-toast';
import noti from './NotificationSound/IPhoneNotification.mp3'


const Socket = ({ setRefresh }: any) => {

	// Audio File
	const myAudio = new Audio(noti);

	const token = Cookies.get("token");
	const socket = io("https://arkland-erp.herokuapp.com");
	socket.emit("notification-connection", { token: token });
	socket.on("notification-connected", (res) => {
		// console.log('res', res)
	});

	socket.on("new-notification", (notification) => {
		if (notification) {
			toast.success(<p className='text-white-socket'>{notification?.details}</p>);
			myAudio.play()
			setRefresh(true)
		} else if (notification.success === false) {
			setRefresh(false)
		}
		// console.log('new-notification', notification)
	});

	socket.on("new-message", (message) => {
		if (message) {
			toast.success(message?.details);
		} else if (message.success === false) {
			toast.error(message.error);
		}
		// console.log('new-message', message)
	});



	return (
		<>
			<Toaster
				position="top-center"
				toastOptions={{
					duration: 15000,
					// error: {
					//   duration: 20000,
					// }     
				}}
			/>
		</>
	)

}
export default Socket