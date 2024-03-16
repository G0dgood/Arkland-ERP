import createHttpService from '../../components/HttpService';



const getSalary = async (id: any) => {
	const HttpService = createHttpService();
	const { data }: any = await HttpService.get(`payroll/salaries`)
	return data
}

// const createTeamLead = async (inputs: any) => {
// 	const HttpService = createHttpService();
// 	const { data }: any = await HttpService.post(`hr/team-leads`, inputs)
// 	return data
// }

// const getEmployeePayrollDetails = async (id: any) => {
// 	const HttpService = createHttpService();
// 	const { data }: any = await HttpService.get(`payroll/employees/${id}`)

// 	return data
// }
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




const SalaryService = {
	getSalary
	// deleteTeamLead,
	// createTeamLead,
}

export default SalaryService