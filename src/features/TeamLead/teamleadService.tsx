import HttpService from '../../components/HttpService'


const getTeamLead = async (id: any) => {
	const { data }: any = await HttpService.get(`hr/team-leads`)
	return data
}

const createTeamLead = async (inputs: any) => {
	const { data }: any = await HttpService.post(`hr/team-leads`, inputs)
	return data
}

const viewTeamLead = async (id: any) => {
	const { data }: any = await HttpService.get(`hr/team-leads/${id}`)
	return data
}

const deleteTeamLead = async (id: any) => {
	const { data }: any = await HttpService.delete(`hr/team-leads/${id}`)
	return data
}





const teamService = {
	getTeamLead,
	viewTeamLead,
	deleteTeamLead,
	createTeamLead,
}

export default teamService