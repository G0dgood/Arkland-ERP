import toast, { Toaster } from 'react-hot-toast';
import noti from './NotificationSound/IPhoneNotification.mp3'
import DataService from '../utils/dataService';

const dataService = new DataService()
const NotificationPopUp = ({ setRefresh, setNotification, socket }: any) => {



	// Audio File
	const myAudio = new Audio(noti);

	const token = dataService.getToken();

	socket.emit("notification-connection", { token: token });

	socket.on("new-notification", (notification: any) => {
		if (notification) {
			const userInfo = dataService.getData(`${process.env.REACT_APP_ERP_USER_INFO}`)
			userInfo.notifications = notification
			dataService.setData(`${process.env.REACT_APP_ERP_USER_INFO}`, userInfo)
			setNotification(notification)

			toast.success(<p className='text-white-socket'>{notification?.data[0].details}</p>);
			myAudio.play()
			setRefresh(true)
		} else if (notification.success === false) {
			setRefresh(false)
		}
		// console.log('new-notification', notification)
	});

	// socket.on("new-message", (message) => {
	// 	if (message) {
	// 		toast.success(message?.details);
	// 	} else if (message.success === false) {
	// 		toast.error(message.error);
	// 	}
	// 	// console.log('new-message', message)
	// });



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
export default NotificationPopUp