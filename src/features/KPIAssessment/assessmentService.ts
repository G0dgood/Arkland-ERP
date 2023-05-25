import axios from 'axios' 
 
 
 
const getAssessment= async (id: any) => { 
  const  response  = await axios.get(`${process.env.REACT_APP_API}/hr/appraisals?employee=${id}`)   
  return response
}
 
const viewAssessment= async (id: any) => { 
  const response = await axios.get(`${process.env.REACT_APP_API}/hr/appraisals/${id}`)    
  return response
}
 
const createAssessment= async (inputs:any) => { 
  const  response  = await axios.get(`${process.env.REACT_APP_API}/hr/appraisals`,inputs)   
  return response
}
const teamAssessment= async (id:any) => { 
  const  response  = await axios.get(`${process.env.REACT_APP_API}/hr/appraisals?reviewer=${id}`)   
  return response
}
 
 
 
 
 
const assessmentService = { 
  getAssessment,
  viewAssessment,
  createAssessment,
  teamAssessment
}

export default assessmentService
