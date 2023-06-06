import HttpService from '../../components/HttpService'


const getRequest = async () => {
	const { data }: any = await HttpService.get(`hr/workers-requests`)
	return data
}

const createRequest = async (input: any) => {
	const { data }: any = await HttpService.post(`workers-requests`, input)
	return data
}

const viewRequest = async (id: any) => {
	const { data }: any = await HttpService.get(`tasks/${id}`)
	return data
}

const deleteRequest = async (id: any) => {
	const { data }: any = await HttpService.delete(`tasks/${id}`)
	return data
}
const updateRequest = async (input: any) => {
	const { id, inputs } = input
	const { data }: any = await HttpService.patch(`tasks/${id}`, inputs)
	return data
}
const noteRequest = async (input: any) => {
	const { id, inputs } = input
	const { data }: any = await HttpService.patch(`tasks/${id}/notes`, inputs)
	return data
}





const workerRequestSlice = {
	getRequest,
	createRequest,
	viewRequest,
	deleteRequest,
	updateRequest,
	noteRequest
}

export default workerRequestSlice