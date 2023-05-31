import HttpService from '../../components/HttpService'
 
 
  
 
const allNotifications = async (  ) => { 
  const { data }:any =  await HttpService.get("notifications")

  return data
}
 
 
 
 
 
 
const NotificationService = { 
  allNotifications,   
}

export default NotificationService
