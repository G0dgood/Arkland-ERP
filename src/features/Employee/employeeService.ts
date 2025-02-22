import createHttpService from '../../components/HttpService';
import { AnyArray } from 'immer/dist/internal'
import QueryParams from '../../components/QueryParams';
 
 
  
const allEmployee = async (Query:any) => {
  const base = `hr/employees` 
  const HttpService = createHttpService();
  	const { size, page, sort, limit, search} = Query   
   const url = QueryParams(size, page, sort, limit, search , null, null, null, null, null, null, null,base); 
	const { data }: any = await HttpService.get(url) 
  return data
}

const createEmployeeRole = async (input: any) => {  
  const HttpService = createHttpService();
	   const  {data}:any  =  await HttpService.post(`hr/employee-roles`, input)  
  return data
}
 
 const userEmployees = async (id: any ) => { 
	 const HttpService = createHttpService();
 const {data}:any = await HttpService.get(`employees`)
  return data
}
 
const hrApproveEmployees = async (id: any) => {   
  const HttpService = createHttpService();
    const { data }: any = await HttpService.patch(`hr/employees/${id}/approve`) 
  return data
}
 
const hrViewEmployees = async (id: any) => {   
  const HttpService = createHttpService();
    const { data }: any = await HttpService.get(`hr/employees/${id}`) 
  return data
}
 
const deleteEmployees = async (id: any) => {   
  const HttpService = createHttpService();
    const { data }: any = await HttpService.deleteRequest(`hr/employees/${id}`) 
  return data
}
 
const getRole = async (id: any) => {   
   const HttpService = createHttpService();
    const { data }: any = await HttpService.get(`hr/employee-roles`) 
  return data
 }
 
const viewRole = async (id: any) => {   
   const HttpService = createHttpService();
   const { data }: any = await HttpService.get(`hr/employee-roles/${id}`) 
   return data
 }

const editRole = async (input: any,) => {   
  const HttpService = createHttpService();
   const {id , inputs} = input
   const { data }: any = await HttpService.patch(`hr/employee-roles/${id}`,inputs) 
   return data
 }
  
const viewPrevilage = async (id: any) => {   
   const HttpService = createHttpService();
   const { data }: any = await HttpService.get(`admin/privileges/${id}`) 
   return data
 }
  
const deleteRole = async (id: any) => {   
   const HttpService = createHttpService();
   const { data }: any = await HttpService.deleteRequest(`hr/employee-roles/${id}`) 
   return data
  }
  
const getTerminations = async (id: any) => {   
    const HttpService = createHttpService();
     const { data }: any = await HttpService.get(`hr/terminations`) 
   return data
  }
const viewTerminations = async (id: any) => {   
    const HttpService = createHttpService();
     const { data }: any = await HttpService.get(`hr/terminations/${id}`) 
   return data
  }
const createTerminations = async (inputs: AnyArray) => {   
      const HttpService = createHttpService();
     const { data }: any = await HttpService.post(`hr/terminations`, inputs) 
   return data
  }
const teanCreateTerminations = async (inputs: AnyArray) => {   
      const HttpService = createHttpService();
     const { data }: any = await HttpService.post(`teams/terminations`, inputs) 
   return data
  }
const approveTerminations = async (id: any) => {   
    const HttpService = createHttpService();
     const { data }: any = await HttpService.patch(`hr/terminations/${id}`) 
   return data
  }
const rejectTerminations = async (id: any) => {   
    const HttpService = createHttpService();
     const { data }: any = await HttpService.patch(`hr/terminations/${id}`) 
   return data
  }
const getWarning = async (id: any) => {   
    const HttpService = createHttpService();
    const { data }: any = await HttpService.get(`hr/warnings`) 
    
   return data
  }
 
const viewWarning = async (id: any) => {   
    const HttpService = createHttpService();
     const { data }: any = await HttpService.get(`hr/warnings/${id}`) 
   return data
  }
const updateWarning = async (input: any) => {   
  const HttpService = createHttpService();
    const {id , inputs} = input
     const { data }: any = await HttpService.patch(`hr/warnings/${id}` ,inputs) 
   return data
  }
const createWarning = async (inputs: AnyArray) => {   
    const HttpService = createHttpService();
     const { data }: any = await HttpService.post(`hr/warnings`, inputs) 
   return data
  }
 
const createEmployee = async (inputs: AnyArray) => {  
    const HttpService = createHttpService();
     const { data }: any = await HttpService.post(`hr/employees`, inputs) 
   return data
  }

const updateEmployee = async (input: AnyArray) => {  
  const HttpService = createHttpService();
  // @ts-ignore
  const { inputs, id } = input 
     const { data }: any = await HttpService.patch(`hr/employees/${id}/update`, inputs) 
   return data
  }
 
const deactivateWarning = async () => {  
  const HttpService = createHttpService();
  
     const { data }: any = await HttpService.patch(`hr/warnings`,  ) 
   return data
}
  
const responseWarning = async ({ input }: any) => { 
  const HttpService = createHttpService();
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
  responseWarning,
  createTerminations,
  teanCreateTerminations,
  editRole
}

export default employeeService
