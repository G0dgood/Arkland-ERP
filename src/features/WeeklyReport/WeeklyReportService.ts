import createHttpService from '../../components/HttpService';
import HttpService from '../../components/HttpService'
 
 
  
 //Get all weekly Report
const allweeklyReport = async (id:any ) => { 
 const HttpService = createHttpService();
  const { data }: any = await HttpService.get("hr/weekly-reports" )
  return data
}
 //Manager Report
const managerReport = async (id:any ) => { 
 const HttpService = createHttpService();
  const { data }: any = await HttpService.get("hr/weekly-reports/list" )
  return data
}
  //create weekly Report
const createweeklyReport = async (allinput:any) => { 
	  const HttpService = createHttpService();
   const  {data}:any  =  await HttpService.post(`hr/weekly-reports`, allinput) 
  return data
}
//get HOD Weekly Report
const getHODWeeklyReport = async ( ) => { 
	  const HttpService = createHttpService();
   const  {data}:any  =  await HttpService.get("hr/weekly-reports/list-for-department")
   
  return data
}
 //view Weekly Report
const viewWeeklyReport = async (id:any ) => { 
	 const HttpService = createHttpService();
  const { data }: any = await HttpService.get(`hr/weekly-reports/${id}/view`)  
  
   
  return data
}
//delete Weekly Report 
const deleteWeeklyReport = async (id:any ) => { 
	 const HttpService = createHttpService();
  const { data }: any = await HttpService.deleteRequest(`hr/weekly-reports/${id}`)  
   
  return data
}
//update Weekly Report
const updateWeeklyReport = async ({id,inputs}:any ) => { 
	 const HttpService = createHttpService();
  const { data }: any = await HttpService.patch(`hr/weekly-reports/${id}` ,inputs)   
  return data
}
//Acknowledge Report
const acknowledgeReport = async (id:any ) => { 
	 const HttpService = createHttpService();
  const { data }: any = await HttpService.patch(`hr/weekly-reports/${id}/acknowledge` )   
  return data
}
 
 
 
 
 
 
const WeeklyReportService = { 
  allweeklyReport,   
  createweeklyReport,
  getHODWeeklyReport,
  viewWeeklyReport,
  deleteWeeklyReport,
  updateWeeklyReport,
  acknowledgeReport,
  managerReport
}

export default WeeklyReportService
