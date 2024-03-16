import createHttpService from '../../components/HttpService'
import HttpService from '../../components/HttpService'
 
 
  
 
const allProject = async (  ) => { 
	  const HttpService = createHttpService();
   const  {data}:any  =  await HttpService.get("hr/projects")

  return data
}
 
const viewProject = async ( id:any ) => { 
	  const HttpService = createHttpService();
   const  {data}:any  =  await HttpService.get(`hr/projects/${id}`)

  return data
}
 
const createProject = async (input: any) => {  
   const HttpService = createHttpService();
  const { data }: any = await HttpService.post(`hr/projects`, input) 
 
  return data
 }

const commenceProject = async (id: any) => {  
  const HttpService = createHttpService();
  const  {data}:any  =  await HttpService.patch(`hr/projects/${id}/commence`) 
  return data
}
 
const completeProject = async (id: any) => {   
  const HttpService = createHttpService();
  const  {data}:any  =  await HttpService.patch(`hr/projects/${id}/complete`) 
  return data
}
 
const suspendProject = async (input: any) => {  
  const HttpService = createHttpService();
  const { id, inputs } = input 
  const  {data}:any  =  await HttpService.patch(`hr/projects/${id}/status/${inputs}` ) 
  return data
}
 
const updateProject = async (input: any) => {  
  const HttpService = createHttpService();
  const { id, inputs } = input 
  const  {data}:any  =  await HttpService.patch(`hr/projects/${id}`, inputs) 
  return data
}
 
 
 
 
const projectService = { 
  allProject,  
  createProject,
  viewProject,
  updateProject,
  commenceProject,
  completeProject,
  suspendProject
}

export default projectService
