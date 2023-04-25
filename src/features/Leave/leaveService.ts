import axios from 'axios' 
 
 
  
 
const createLeave = async ( input:any) => { 
	 
  const { data } = await axios.post(`${process.env.REACT_APP_API}/hr/leaves`,input)
   
  return data
}
const getCreateLeave = async ( ) => { 
	 
  const { data } = await axios.get(`${process.env.REACT_APP_API}/hr/leaves`)
   
  return data
}
 
 
 
 
 
const leaveService = { 
  createLeave,  
  getCreateLeave
}

export default leaveService
