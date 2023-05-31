import axios from 'axios' 
import HttpService from '../../components/HttpService'
 
 
  
 
const allProject = async (  ) => { 
	  
   const  {data}:any  =  await HttpService.get("hr/projects")

  return data
}
 
 const createProject  = async (   input:any) => {  
  const  {data}:any  =  await HttpService.post(`hr/projects`, input) 
  return data
}
 
 
 
 
const projectService = { 
  allProject,  
  createProject
}

export default projectService
