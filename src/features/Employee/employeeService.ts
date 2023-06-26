import HttpService from '../../components/HttpService'
import { AnyArray } from 'immer/dist/internal'
 
 
  
const allEmployee = async (  ) => {  
  const {data}:any = await HttpService.get("hr/employees") 
  return data
}

 

const createEmployeeRole = async (input: any) => {  
	   const  {data}:any  =  await HttpService.post(`hr/employee-roles`, input)  
  return data
}
 
 const userEmployees = async (id: any ) => { 
	 
 const {data}:any = await HttpService.get(`employees`)
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
 
 const viewRole = async (id: any) => {   
   const { data }: any = await HttpService.get(`hr/employee-roles/${id}`) 
   return data
 }
  
 const viewPrevilage = async (id: any) => {   
   const { data }: any = await HttpService.get(`admin/privileges/${id}`) 
   return data
 }
  
 const deleteRole = async (id: any) => {   
   const { data }: any = await HttpService.delete(`hr/employee-roles/${id}`) 
   return data
  }
  
  const getTerminations = async (id:any) => {   
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
const updateWarning = async (input: any) => {   
    const {id , inputs} = input
     const { data }: any = await HttpService.patch(`hr/warnings/${id}` ,inputs) 
   return data
  }
  const createWarning = async (inputs:AnyArray) => {   
     const { data }: any = await HttpService.post(`hr/warnings`, inputs) 
   return data
  }
 
  const createEmployee = async (inputs:AnyArray) => {   
     const { data }: any = await HttpService.post(`hr/employees`, inputs) 
   return data
  }

const updateEmployee = async (input: AnyArray) => {  
  // @ts-ignore
  const { inputs, id } = input 
     const { data }: any = await HttpService.patch(`hr/employees/${id}/update`, inputs) 
   return data
  }
 
const deactivateWarning = async () => {  
  
     const { data }: any = await HttpService.patch(`hr/warnings`,  ) 
   return data
}
  
const responseWarning = async ({ input }: any) => { 
  const { id, inputs } = input
  
 
  
     const { data }: any = await HttpService.patch(`hr/warnings/${id}/respond`,  inputs) 
   return data
  }
 
 
const employeeService = { 
  allEmployee,    
  createEmployeeRole,
  viewRole,
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
  createWarning,
  createEmployee,
  updateEmployee,
  viewPrevilage,
  updateWarning,
  deactivateWarning,
  responseWarning
}

export default employeeService
