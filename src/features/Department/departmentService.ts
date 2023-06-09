import HttpService from '../../components/HttpService'
 
 
const allDepartments = async ( input:any) => {  
  const  {data}:any  =  await HttpService.get("hr/departments") 
  return data
}
 

const viewDepartments = async ( id:any) => {  
  const { data }: any = await HttpService.get(`hr/departments/${id}`)  
  return data
}

const createDepartments = async (   input:any) => {  
  const  {data}:any  =  await HttpService.post(`hr/departments`, input) 
  return data
}

const deleteDepartments = async (   id:any) => {  
  const  {data}:any  =  await HttpService.delete(`hr/departments/${id}`) 
  return data
}
  
const departmentsService = { 
  allDepartments,   
  viewDepartments,
  createDepartments,
  deleteDepartments
}

export default departmentsService
