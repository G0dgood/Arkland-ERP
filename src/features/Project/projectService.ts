import axios from 'axios' 
 
 
  
 
const allProject = async (  ) => { 
	 
  const response = await axios.get(`${process.env.REACT_APP_API}/hr/projects`, )

  return response
}
 
 
 
 
 
 
const projectService = { 
  allProject,   
}

export default projectService
