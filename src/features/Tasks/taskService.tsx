import HttpService from '../../components/HttpService'


const getTask = async () => {
	const { data }: any = await HttpService.get(`tasks`)
	return data
}

const createTask = async (input: any) => {
	const { data }: any = await HttpService.post(`tasks`, input)
	return data
}

const viewTask = async (id: any) => {
	const { data }: any = await HttpService.get(`tasks${id}`)
	return data
}

// const deleteTodos = async (id: any) => {
// 	// const response = await axios.delete(`${process.env.REACT_APP_API}/hr/announcements/${id}`)
// 	const { data }: any = await HttpService.delete(`hr/appraisals/${id}`)
// 	return data
// }





const taskService = {
	getTask,
	createTask,
	viewTask,
	// deleteTodos
}

export default taskService