import createHttpService from '../../components/HttpService';
 
 
 
  
 
const userRole = async (  ) => { 
	  const HttpService = createHttpService();
   const  {data}:any  =  await HttpService.get("hr/employee-roles")
   
  return data
}
const userDepartment = async () => { 
  const HttpService = createHttpService();
	    const  {data}:any  =  await HttpService.get("hr/employee-roles") 
   
  return data
}

const userprivileges = async () => { 
  const HttpService = createHttpService();
	    const  {data}:any  =  await HttpService.get("admin/privileges") 
   
  return data
}
 
const createprivileges = async (inputs: any) => { 
  const HttpService = createHttpService();
	     const { data }: any = await HttpService.post(`admin/privileges`, inputs) 
   
  return data
}
 
const deleteprivileges = async (id: any) => { 
  const HttpService = createHttpService();
	    const  {data}:any  =  await HttpService.deleteRequest(`admin/privileges/${id}`) 
   
  return data
}
 
const createHOD = async (id: any) => { 
  const HttpService = createHttpService();
	    const  {data}:any  =  await HttpService.deleteRequest(`admin/privileges/${id}`) 
   
  return data
}
 
const forgetPassword = async (inputs: any) => { 
   const HttpService = createHttpService();
	     const { data }: any = await HttpService.patch(`auth/password`, inputs) 
   
  return data
}
 
const updatePassword = async (inputs: any) => { 
   const HttpService = createHttpService();
	     const { data }: any = await HttpService.patch(`me/password`, inputs) 
   
  return data
}
 
const resetPassword = async (inputs: any) => { 
   const HttpService = createHttpService();
	     const { data }: any = await HttpService.patch(`auth/password`, inputs) 
   
  return data
}
 
 
 
const userService = { 
  userRole,  
  userDepartment,
  userprivileges,
  deleteprivileges,
  createHOD,
  createprivileges,
  forgetPassword,
  updatePassword,
  resetPassword
}

export default userService
