import HttpService from '../../components/HttpService'
 
 
  
 
const userRole = async (  ) => { 
	  
   const  {data}:any  =  await HttpService.get("hr/employee-roles")
   
  return data
}
const userDepartment = async ( ) => { 
	    const  {data}:any  =  await HttpService.get("hr/employee-roles") 
   
  return data
}

const userprivileges = async ( ) => { 
	    const  {data}:any  =  await HttpService.get("admin/privileges") 
   
  return data
}
 
const createprivileges = async (inputs:any ) => { 
	     const { data }: any = await HttpService.post(`admin/privileges`, inputs) 
   
  return data
}
 
const deleteprivileges = async (id:any ) => { 
	    const  {data}:any  =  await HttpService.delete(`admin/privileges/${id}`) 
   
  return data
}
 
const createHOD = async (id:any ) => { 
	    const  {data}:any  =  await HttpService.delete(`admin/privileges/${id}`) 
   
  return data
}
 
 
 
 
 
const userService = { 
  userRole,  
  userDepartment,
  userprivileges,
  deleteprivileges,
  createHOD,
  createprivileges
}

export default userService
