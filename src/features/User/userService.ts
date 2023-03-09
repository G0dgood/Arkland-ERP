import axios from 'axios' 
 
 
  
 
const userRole = async (  ) => { 
	 
  const { data } = await axios.get(`${process.env.REACT_APP_API}/hr/employee-roles`, )
   
  return data
}
const userDepartment = async ( ) => { 
	 
  const { data } = await axios.get(`${process.env.REACT_APP_API}/hr/leaves`)
   
  return data
}
 
 
 
 
 
const leaveService = { 
  userRole,  
  userDepartment
}

export default leaveService
