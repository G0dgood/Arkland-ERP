import axios from 'axios'


const getTodos = async () => {
	const response = await axios.get(`${process.env.REACT_APP_API}/hr/announcements`)
	return response
}

const viewTodos = async (id: any) => {
	const response = await axios.get(`${process.env.REACT_APP_API}/hr/announcements/${id}`)
	return response
}

const createTodos = async (input: any) => {
	const response = await axios.post(`${process.env.REACT_APP_API}/hr/announcements`, input)
	return response
}
const deleteTodos = async (id: any) => {
	const response = await axios.delete(`${process.env.REACT_APP_API}/hr/announcements/${id}`)
	return response
}





const todosService = {
	getTodos,
	viewTodos,
	createTodos,
	deleteTodos
}

export default todosService