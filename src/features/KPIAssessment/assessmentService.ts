import HttpService from '../../components/HttpService'
 
 
 
const getAssessment= async (id: any) => { 
  
  const { data }: any = await HttpService.search(`hr/appraisals`, { employee: id })   
  return data
}
const allAssessment= async ( ) => { 
  
  const { data }: any = await HttpService.get(`hr/appraisals/list/for-management` )   
  return data
}
 
const viewAssessment = async (id: any) => {  
  const { data }: any = await HttpService.get(`hr/appraisals/${id}`)   
   
  return data
}
 
const createAssessment = async (allInput: any) => { 
   const { data }: any = await HttpService.post(`hr/appraisals`, allInput)    
  return data
}
const teamAssessment = async (id:any) => {  
    const { data }: any = await HttpService.search(`hr/appraisals`, {reviewer:id})   
  return data
}

const hodReviewAssessment = async (  inputs: any) => {  
 const {id , inputr} = inputs
    const { data }: any = await HttpService.patch(`hr/appraisals/${id}/review`, inputr)   
  return data
}

const deleteAssessment = async (id:any ) => {  
    const { data }: any = await HttpService.delete(`hr/appraisals/${id}` )   
  return data
}
 
 
 
 
 
const assessmentService = { 
  getAssessment,
  viewAssessment,
  createAssessment,
  teamAssessment,
  hodReviewAssessment,
  deleteAssessment,
  allAssessment
}

export default assessmentService
