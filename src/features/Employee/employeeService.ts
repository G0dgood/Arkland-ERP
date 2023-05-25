import axios from 'axios' 
 
 
const allEmployee = async ( input:any) => { 
	 
  const  response  = await axios.get(`${process.env.REACT_APP_API}/hr/employees`) 
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
   
   console.log('response ',response)
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
