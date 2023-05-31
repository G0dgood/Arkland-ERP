import axios from 'axios' 
import HttpService from '../../components/HttpService'
 
 
 
const getHOD= async (id: any) => {   
    const {data}:any = await HttpService.get("hr/hods") 
  return data
}
 
const createHOD= async (inputs: any) => { 
  // const { data } = await axios.post(`${process.env.REACT_APP_API}/hr/appraisals/${id}`)    
  const  {data} : any = await HttpService.post(`hr/hods`,{inputs})
  return data
}
 
const deleteHOD= async (id:any) => { 
  // const  {data}  = await axios.delete(`${process.env.REACT_APP_API}/hr/hods/${id}`)   
  const { data }: any = await HttpService.delete(`hr/hods/${id}`  )   
  return data
}

 
 
 
 
const hodService = { 
  getHOD, 
  deleteHOD,
  createHOD

}

export default hodService
