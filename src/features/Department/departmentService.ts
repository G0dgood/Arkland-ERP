import axios from 'axios' 
 
 
const allDepartments = async ( input:any) => { 
	 
  const  {data}  = await axios.get(`${process.env.REACT_APP_API}/hr/departments`)
   
   
  return data
}

  
const departmentsService = { 
  allDepartments,   
}

export default departmentsService
