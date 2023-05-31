import HttpService from '../../components/HttpService'


const getTodos = async () => {
	// const response = await axios.get(`${process.env.REACT_APP_API}/hr/announcements`)
	const { data }: any = await HttpService.get(`hr/announcements`)
	return data
}

const viewTodos = async (id: any) => {
	// const response = await axios.get(`${process.env.REACT_APP_API}/hr/announcements/${id}`)
	const { data }: any = await HttpService.get(`hr/announcements/${id}`)
	return data
}

const createTodos = async (input: any) => {
	const { data }: any = await HttpService.post(`hr/announcements`, input)
	// const response = await axios.post(`${process.env.REACT_APP_API}/hr/announcements`, input)
	return data
}
const deleteTodos = async (id: any) => {
	// const response = await axios.delete(`${process.env.REACT_APP_API}/hr/announcements/${id}`)
	const { data }: any = await HttpService.delete(`hr/appraisals/${id}`)
	return data
}





const todosService = {
	getTodos,
	viewTodos,
	createTodos,
	deleteTodos
}

export default todosService