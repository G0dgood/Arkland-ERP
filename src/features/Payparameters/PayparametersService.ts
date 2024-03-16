import createHttpService from '../../components/HttpService';
import QueryParams from '../../components/QueryParams';



const getPayparameters = async (Query: any) => {   
	 const base = `employees` 
  const HttpService = createHttpService();
  	const { location, department, role,is_expatriate, category} = Query   
	const url = QueryParams(null, null, null, null, null, null,null,location, department, role,is_expatriate, category, base);  
	const { data }: any = await HttpService.get(url) 
	return data
}

// const createTeamLead = async (inputs: any) => {
// 	const HttpService = createHttpService();
// 	const { data }: any = await HttpService.post(`hr/team-leads`, inputs)
// 	return data
// }

const getPayparameterDetails = async (Query: any) => { 
 const base = `payroll/pay_parameters` 
  const HttpService = createHttpService();
  	const { location, department, role,is_expatriate, category} = Query   
	const url = QueryParams(null, null, null, null, null, null,null,location, department, role,is_expatriate, category, base);  
	const { data }: any = await HttpService.get(url) 
	console.log('data',data)
	return data
}

// const getListChangeRequests = async (id: any) => {
// 	const HttpService = createHttpService();
// 	const { data }: any = await HttpService.get(`payroll/employees/change_requests/list`)
// 	return data
// }

// const deleteTeamLead = async (id: any) => {
// 	const HttpService = createHttpService();
// 	const { data }: any = await HttpService.deleteRequest(`hr/team-leads/${id}`)
// 	return data
// }
// const payRollEmployeeSalaryApproval = async (id: any) => {
// 	const HttpService = createHttpService();
// 	const { data }: any = await HttpService.patch(`payroll/employees/${id}/finance/approve`)


// 	return data
// }




const PayparametersService = {
	getPayparameters,
 getPayparameterDetails,
	// getListChangeRequests,
	// payRollEmployeeSalaryApproval
	// deleteTeamLead,
	// createTeamLead,
}

export default PayparametersService