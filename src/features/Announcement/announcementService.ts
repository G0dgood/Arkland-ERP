import HttpService from '../../components/HttpService';
 
 
const getAnnouncement = async () => {   
  const { data }: any = await HttpService.get("hr/announcements") 
  
  return data
}

const viewAnnouncement = async ( id:any) => {   
   const {data}:any = await HttpService.get(`hr/announcements/${id}`) 
  
  return data
}
const viewMeAnnouncement = async ( id:any) => {   
   const {data}:any = await HttpService.get(`me/announcements/${id}`) 
  
  return data
}

 
const createAnnouncement = async ( input:any) => {   
    const data = await HttpService.post(`hr/announcements`,input);
    return data
}
 
const deleteAnnouncement = async ( id:any) => {   
     const { data }: any = await HttpService.delete(`hr/announcements/${id}`) 
  return data
}
    
 
const announcementService = { 
  getAnnouncement,   
  viewAnnouncement,
  createAnnouncement,
  deleteAnnouncement,
  viewMeAnnouncement
}

export default announcementService