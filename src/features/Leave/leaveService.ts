import axios from 'axios' 
import { baseUrl } from '../../shared/baseUrl'
// import { baseUrl } from '../../shared/baseUrl';
	// @ts-ignore
// const user = JSON.parse(localStorage.getItem("user"));
 
 
 
 
const createLeave = async ( input:any) => { 
	// const config = {
  //        headers: {
  //          "Content-Type": "application/json",
  //          Authorization: `Bearer ${user.token}`,
  //        },
  // };
  const { data } = await axios.post(baseUrl +`/hr/leaves`,input)
   
  return data
}
 
 
 
 
 
const leaveService = { 
  createLeave,  
}

export default leaveService
