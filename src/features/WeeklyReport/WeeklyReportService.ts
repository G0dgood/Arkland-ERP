import axios from 'axios' 
import HttpService from '../../components/HttpService'
 
 
  
 //Get all weekly Report
const allweeklyReport = async (id:any ) => { 
	 
  
  const { data }: any = await HttpService.search("hr/weekly-reports/list", { employee: id })
  return data
}
  //create weekly Report
const createweeklyReport = async (allinput:any) => { 
	  
   const  {data}:any  =  await HttpService.post(`hr/weekly-reports`, allinput) 
  return data
}
//get HOD Weekly Report
const getHODWeeklyReport = async ( ) => { 
	  
   const  {data}:any  =  await HttpService.get("hr/weekly-reports/list-for-department")
   
  return data
}
 //view Weekly Report
const viewWeeklyReport = async (id:any ) => { 
	 
  const {data} = await axios.get(`${process.env.REACT_APP_API}/hr/weekly-reports/${id}/view`)
   
  return data
}
//delete Weekly Report 
const deleteWeeklyReport = async (id:any ) => { 
	 
  const {data} = await axios.delete(`${process.env.REACT_APP_API}/hr/weekly-reports/${id}`)
   
  return data
}
//update Weekly Report
const updateWeeklyReport = async ({id,inputs}:any ) => { 
	 
  const {data} = await axios.patch(`${process.env.REACT_APP_API}/hr/weekly-reports/${id}`,inputs)
   
  return data
}
 
 
 
 
 
 
const WeeklyReportService = { 
  allweeklyReport,   
  createweeklyReport,
  getHODWeeklyReport,
  viewWeeklyReport,
  deleteWeeklyReport,
  updateWeeklyReport
}

export default WeeklyReportService
