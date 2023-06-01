import axios from 'axios' 
import HttpService from '../../components/HttpService'
import { AnyArray } from 'immer/dist/internal'
 
 
  
const allEmployee = async (  ) => {  
  const {data}:any = await HttpService.get("hr/employees") 
  return data
}

// const uploadEmployee = async ( jsonData:any ,setProgress:any) => { 
	 
//   const  response  = await axios.post(`${process.env.REACT_APP_API}/hr/employees/bulk-upload`,{ employees: jsonData }, {
//           headers: { 
//             "Content-Type": "application/json",
//           },
//           onUploadProgress: (data:any) => {
//             setProgress(Math.round((100 * data.loaded) / data.total));
//           },
//         })
   
//     //  console.log('response ',response)
//   return response
// }

const createEmployeeRole = async (input: any) => { 
   console.log('input',input)
	   const  {data}:any  =  await HttpService.post(`hr/employee-roles`, `${input}`)  
  return data
}
 
 const userEmployees = async ( id:any) => { 
	 
 const {data}:any = await HttpService.get("employees")
  return data
}
 
const hrApproveEmployees = async (id: any) => {   
    const { data }: any = await HttpService.patch(`hr/employees/${id}/approve`) 
  return data
}
 
const hrViewEmployees = async (id: any) => {   
    const { data }: any = await HttpService.get(`hr/employees/${id}`) 
  return data
}
 
const deleteEmployees = async (id: any) => {   
    const { data }: any = await HttpService.delete(`hr/employees/${id}`) 
  return data
}
 
 const getRole = async (id: any) => {   
    const { data }: any = await HttpService.get(`hr/employee-roles`) 
  return data
 }
 
 const deleteRole = async (id: any) => {   
   const { data }: any = await HttpService.delete(`hr/employee-roles/${id}`) 
   return data
  }
  
  const getTerminations = async (id: any) => {   
     const { data }: any = await HttpService.get(`hr/terminations`) 
   return data
  }
  const viewTerminations = async (id: any) => {   
     const { data }: any = await HttpService.get(`hr/terminations/${id}`) 
   return data
  }
  const approveTerminations = async (id: any) => {   
     const { data }: any = await HttpService.patch(`hr/terminations/${id}`) 
   return data
  }
  const rejectTerminations = async (id: any) => {   
     const { data }: any = await HttpService.patch(`hr/terminations/${id}`) 
   return data
  }
  const getWarning = async (id: any) => {   
     const { data }: any = await HttpService.get(`hr/warnings`) 
   return data
  }
 
  const viewWarning = async (id: any) => {   
     const { data }: any = await HttpService.get(`hr/warnings/${id}`) 
   return data
  }
  const createWarning = async (inputs:AnyArray) => {   
     const { data }: any = await HttpService.post(`hr/warnings`, inputs) 
   return data
  }
 
const employeeService = { 
  allEmployee,   
  // uploadEmployee,
  createEmployeeRole,
  userEmployees,
  hrApproveEmployees,
  hrViewEmployees,
  deleteEmployees,
  getRole,
  deleteRole,
  getTerminations,
  viewTerminations,
  rejectTerminations,
  approveTerminations,
  getWarning,
  viewWarning,
  createWarning
}

export default employeeService
