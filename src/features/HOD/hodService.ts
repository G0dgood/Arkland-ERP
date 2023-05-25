import axios from 'axios' 
 
 
 
const getHOD= async (id: any) => { 
  const  {data}  = await axios.get(`${process.env.REACT_APP_API}/hr/hods`)   
  return data
}
 
const craeteHOD= async (id: any) => { 
  const { data } = await axios.post(`${process.env.REACT_APP_API}/hr/appraisals/${id}`)    
  return data
}
 
const deleteHOD= async (id:any) => { 
  const  {data}  = await axios.delete(`${process.env.REACT_APP_API}/hr/hods/${id}`)   
  return data
}

// const teamAssessment= async (id:any) => { 
//   const  {data}  = await axios.get(`${process.env.REACT_APP_API}/hr/appraisals?reviewer=${id}`)   
//   return data
// }
 
 
 
 
 
const hodService = { 
  getHOD, 
  deleteHOD
}

export default hodService
