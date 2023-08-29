import createHttpService from '../../components/HttpService';
import HttpService from '../../components/HttpService'
 
 
const getHOD = async () => {   
  const HttpService = createHttpService();
    const {data}:any = await HttpService.get("hr/hods") 
  return data
}
 
const createHOD = async (inputs: any) => {  
  const HttpService = createHttpService();
  const  {data} : any = await HttpService.post(`hr/hods`, inputs)
  return data
}

const viewHOD = async (id: any) => {  
  const HttpService = createHttpService();
  const { data }: any = await HttpService.get(`hr/hods/${id}`)  
  return data
}
 
const deleteHOD = async (id: any) => {  
  const HttpService = createHttpService();
  const { data }: any = await HttpService.deleteRequest(`hr/hods/${id}`)   
  return data
}

 
  
const hodService = { 
  getHOD, 
  viewHOD,
  deleteHOD,
  createHOD
}

export default hodService
