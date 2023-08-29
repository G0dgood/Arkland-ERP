import createHttpService from '../../components/HttpService';
import HttpService from '../../components/HttpService'
 
 
 
const getAssessment= async (id: any) => { 
  const HttpService = createHttpService();
  const { data }: any = await HttpService.search(`hr/appraisals`, { employee: id })   
  return data
}
const allAssessment= async ( ) => { 
  const HttpService = createHttpService();
  const { data }: any = await HttpService.get(`hr/appraisals/list/for-management` )   
  return data
}
 
const viewAssessment = async (id: any) => {  
  const HttpService = createHttpService();
  const { data }: any = await HttpService.get(`hr/appraisals/${id}`)   
   
  return data
}
 
const createAssessment = async (allInput: any) => { 
  const HttpService = createHttpService();
   const { data }: any = await HttpService.post(`hr/appraisals`, allInput)    
  return data
}
const teamAssessment = async (id: any) => {  
  const HttpService = createHttpService();
    const { data }: any = await HttpService.search(`hr/appraisals`, {reviewer:id})   
  return data
}

const editAssessment = async (inputs: any) => {  
  const HttpService = createHttpService();
  const { id, kpinputs } = inputs
  
  console.log('inputs', inputs) 
    const { data }: any = await HttpService.patch(`hr/appraisals/${id}`, kpinputs)   
  return data
}


const hodReviewAssessment = async (inputs: any) => {  
  const HttpService = createHttpService();
  const { id, input } = inputs 
    const { data }: any = await HttpService.patch(`hr/appraisals/${id}/review`, input)   
  return data
}

const deleteAssessment = async (id: any) => {  
  const HttpService = createHttpService();
    const { data }: any = await HttpService.deleteRequest(`hr/appraisals/${id}`)   
  return data
}
 
 
 
 
 
const assessmentService = { 
  getAssessment,
  viewAssessment,
  createAssessment,
  teamAssessment,
  hodReviewAssessment,
  deleteAssessment,
  allAssessment,
  editAssessment
}

export default assessmentService
