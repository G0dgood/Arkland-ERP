import HttpService from '../../components/HttpService'
 
 
const createAttendance = async ( input:any) => {  
  const  {data}:any  =  await HttpService.post("hr/attendances",{}) 
  return data
}
const hrcreateAttendance = async ( id:any) => {  
  const  {data}:any  =  await HttpService.post(`hr/attendances/${id}/clock-in`,{}) 
  return data
}
const hrgetAttendance = async ( input:any) => {  
  const  {data}:any  =  await HttpService.get("hr/attendances") 
  return data
}
const myAttendance = async ( input:any) => {  
  const  {data}:any  =  await HttpService.get("hr/attendances/list/self") 
  return data
}
 

 
  
const attendanceService = { 
  createAttendance, 
  hrcreateAttendance,
  hrgetAttendance,
  myAttendance
}

export default attendanceService