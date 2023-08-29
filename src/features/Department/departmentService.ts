import createHttpService from '../../components/HttpService';
import HttpService from '../../components/HttpService'
 
 
const allDepartments = async (input: any) => {  
  const HttpService = createHttpService();
  const  {data}:any  =  await HttpService.get("hr/departments") 
  return data
}
 

const viewDepartments = async (id: any) => {  
  const HttpService = createHttpService();
  const { data }: any = await HttpService.get(`hr/departments/${id}`)  
  return data
}

const createDepartments = async (input: any) => {  
  const HttpService = createHttpService();
  const  {data}:any  =  await HttpService.post(`hr/departments`, input) 
  return data
}
const editDepartments = async (inputs: any) => {  
  const HttpService = createHttpService();
  const {id, input} = inputs
  const  {data}:any  =  await HttpService.patch(`hr/departments/${id}`, input) 
  return data
}

const deleteDepartments = async (id: any) => {  
  const HttpService = createHttpService();
  const  {data}:any  =  await HttpService.deleteRequest(`hr/departments/${id}`) 
  return data
}
  
const departmentsService = { 
  allDepartments,   
  viewDepartments,
  createDepartments,
  deleteDepartments,
  editDepartments
}

export default departmentsService
