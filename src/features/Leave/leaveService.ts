import axios from 'axios' 
 
 
  
  
 
const createLeave = async ( input:any) => { 
	 
  const  data  = await axios.post(`${process.env.REACT_APP_API}/hr/leaves`,input)
   
  return data
}

const getCreateLeave = async (id: any) => { 
   
  const   response  = await axios.get(`${process.env.REACT_APP_API}/hr/leaves?employee=${id}`)   
   
  return response
}
 
 
 
 
 
const leaveService = { 
  createLeave,  
  getCreateLeave
}

export default leaveService
