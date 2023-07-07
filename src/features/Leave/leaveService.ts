import HttpService from '../../components/HttpService'
 
 
  
 
const createLeave = async ( input:any) => { 
	  
  const  {data} : any = await HttpService.post("leaves", input)
   
  return data
}

const getCreateLeave = async (id: any) => {  
  const { data }: any = await HttpService.search(`leaves`, { employee: id })  
  return data
}
const getAllLeave = async (id: any) => {  
  const { data }: any = await HttpService.get(`hr/leaves`)  
  return data
}
const viewLeave = async (id: any) => {  
  const { data }: any = await HttpService.get(`leaves/${id}`)  
   
  return data
}
const viewdeleteLeave = async (id: any) => {  
  const { data }: any = await HttpService.delete(`leaves/${id}`)  
  return data
}
 
const getTeamLeave = async (id: any) => {  
  const { data }: any = await HttpService.get(`hr/leaves/list/teams`)   
 
  return data
}
 
const viewTeamLeave = async (id: any) => {  
  const { data }: any = await HttpService.get(`hr/leaves/${id}`)  
  return data
}
const hodApproveLeave = async (id: any) => {  
  const { data }: any = await HttpService.patch(`hr/leaves/${id}/hod-approval`)  
  return data
}
const hrApproveLeave = async (id: any) => {  
  const { data }: any = await HttpService.patch(`hr/leaves/${id}/hr-approval`)  
  return data
}
const finalApproveLeave = async (id: any) => {  
  const { data }: any = await HttpService.patch(`hr/leaves/${id}/final-approval`)  
  return data
}
 
const rejectLeave = async (id: any) => {  
  const { data }: any = await HttpService.patch(`hr/leaves/${id}/reject`)  
  return data
}
 
 
 
 
 
const leaveService = { 
  createLeave,  
  getCreateLeave,
  viewLeave,
  getTeamLeave,
  viewTeamLeave,
  viewdeleteLeave,
  hodApproveLeave,
  hrApproveLeave,
  finalApproveLeave,
  rejectLeave,
  getAllLeave
}

export default leaveService
