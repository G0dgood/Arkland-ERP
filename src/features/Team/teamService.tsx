import createHttpService from '../../components/HttpService';
import HttpService from '../../components/HttpService'


const getTeam = async (id: any) => {
	const HttpService = createHttpService();
	const { data }: any = await HttpService.get(`hr/teams`)
	return data
}

const createTeam = async (input: any) => {
	const HttpService = createHttpService();
	const { data }: any = await HttpService.post(`hr/teams`, input)
	return data
}

const viewTeam = async (id: any) => {
	const HttpService = createHttpService();
	const { data }: any = await HttpService.get(`hr/teams/${id}`)
	return data
}

const deleteTeam = async (id: any) => {
	const HttpService = createHttpService();
	const { data }: any = await HttpService.deleteRequest(`hr/teams/${id}`)
	return data
}
const getTeammembers = async (id: any) => {
	const HttpService = createHttpService();
	const { data }: any = await HttpService.get(`hr/teams/${id}/employees`)

	return data
}
const createTeamMembers = async (input: any) => {
	const HttpService = createHttpService();
	const { inputs, id } = input
	const { data }: any = await HttpService.post(`hr/teams/${id}`, inputs)
	return data
}

const removeTeamMembers = async (id: any) => {
	const HttpService = createHttpService();
	const { data }: any = await HttpService.patch(`tasks/${id}`)
	return data
}



const teamService = {
	getTeam,
	createTeam,
	viewTeam,
	deleteTeam,
	getTeammembers,
	createTeamMembers,
	removeTeamMembers
}

export default teamService