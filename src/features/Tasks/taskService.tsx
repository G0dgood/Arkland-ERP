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
	const { data }: any = await HttpService.get(`tasks/${id}`)
	return data
}

const deleteTask = async (id: any) => {
	const { data }: any = await HttpService.delete(`tasks/${id}`)
	return data
}
const updateTask = async (input: any) => {
	const { id, inputs } = input
	const { data }: any = await HttpService.patch(`tasks/${id}`, inputs)
	return data
}
const noteTask = async (input: any) => {
	const { id, inputs } = input
	const { data }: any = await HttpService.patch(`tasks/${id}/notes`, inputs)
	return data
}





const taskService = {
	getTask,
	createTask,
	viewTask,
	deleteTask,
	updateTask,
	noteTask
}

export default taskService