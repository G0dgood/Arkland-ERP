import axios from 'axios' 
 
 
  
 //Get all weekly Report
const allweeklyReport = async (id:any ) => { 
	 
  const response = await axios.get(`${process.env.REACT_APP_API}/hr/weekly-reports/list?employee=${id}`, )
   
  return response
}
  //create weekly Report
const createweeklyReport = async (allinput:any) => { 
	 
  const response = await axios.post(`${process.env.REACT_APP_API}/hr/weekly-reports`,allinput )
   
  return response
}
//get HOD Weekly Report
const getHODWeeklyReport = async ( ) => { 
	 
  const response = await axios.get(`${process.env.REACT_APP_API}/hr/weekly-reports/list-for-department`, )
   
  return response
}
 //view Weekly Report
const viewWeeklyReport = async (id:any ) => { 
	 
  const response = await axios.get(`${process.env.REACT_APP_API}/hr/weekly-reports/${id}/view`)
   
  return response
}
//delete Weekly Report 
const deleteWeeklyReport = async (id:any ) => { 
	 
  const response = await axios.delete(`${process.env.REACT_APP_API}/hr/weekly-reports/${id}`)
   
  return response
}
//update Weekly Report
const updateWeeklyReport = async ({id,inputs}:any ) => { 
	 
  const response = await axios.patch(`${process.env.REACT_APP_API}/hr/weekly-reports/${id}`,inputs)
   
  return response
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
