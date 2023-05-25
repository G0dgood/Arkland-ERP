import axios from 'axios' 
 
 
  
 
const allNotifications = async (  ) => { 
	 
  const { data } = await axios.get(`${process.env.REACT_APP_API}/notifications`, )

  return data
}
 
 
 
 
 
 
const NotificationService = { 
  allNotifications,   
}

export default NotificationService
