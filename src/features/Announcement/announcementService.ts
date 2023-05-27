import axios from 'axios' 
import Cookies from 'js-cookie';
import HttpService from '../../components/HttpService';
 const token = Cookies.get("token");
 
const getAnnouncement = async () => {  
  const   response = await axios.get(`${process.env.REACT_APP_API}/hr/announcements`) 
  return response
}

const viewAnnouncement = async ( id:any) => {  
  const   response = await axios.get(`${process.env.REACT_APP_API}/hr/announcements/${id}`) 
  return response
}

// const createAnnouncement = async ( input:any) => {  
//   const   response = await axios.post(`${process.env.REACT_APP_API}/hr/announcements`,input) 
//   return response
// }
const createAnnouncement = async ( input:any) => {  
  // const   response = await axios.post(`${process.env.REACT_APP_API}/hr/announcements`,input) 
  // return response
 
    const response = await HttpService.post(`hr/announcements`,input);
    return response
}
 
const deleteAnnouncement = async ( id:any) => {  
  const   response = await axios.delete(`${process.env.REACT_APP_API}/hr/announcements/${id}`) 
  return response
}
  // const deleteAnnouncement =  ( id:any) => {  
   
  //   fetch(`${process.env.REACT_APP_API}/hr/announcements/${id}`, {
  //     method: 'DELETE', // or 'PUT'
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     // body: JSON.stringify(inputs),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data?.success === false) {
  //         console.log('Success:', data?.message);
  //         return data?.message; 
  //       } else { 
  //         console.log('Success:', data);
  //         return data;
  //       } 
  //     })
  //     .catch((error) => { 
  //     });
    
  // }

 
 
 
 
const announcementService = { 
  getAnnouncement,   
  viewAnnouncement,
  createAnnouncement,
  deleteAnnouncement
}

export default announcementService