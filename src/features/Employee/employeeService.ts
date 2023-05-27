import axios from 'axios' 
import HttpService from '../../components/HttpService'
 
 
const allEmployee = async ( input:any) => { 
	 
  // const  response  = await axios.get(`${process.env.REACT_APP_API}/hr/employees`) 
  const response = HttpService.search("hr/employees",{employment_date_start:"FSDFGSDVG"})
  
  // console.log('response ',response)
  return response
}

const uploadEmployee = async ( jsonData:any ,setProgress:any) => { 
	 
  const  response  = await axios.post(`${process.env.REACT_APP_API}/hr/employees/bulk-upload`,{ employees: jsonData }, {
          headers: { 
            "Content-Type": "application/json",
          },
          onUploadProgress: (data:any) => {
            setProgress(Math.round((100 * data.loaded) / data.total));
          },
        })
   
    //  console.log('response ',response)
  return response
}

 const createEmployeeRole = async ( id:any) => { 
	 
  const  response  = await axios.patch(`${process.env.REACT_APP_API}/hr/employee-roles`) 
  return response
}
 
 
 
const employeeService = { 
  allEmployee,   
  uploadEmployee,
  createEmployeeRole
}

export default employeeService
