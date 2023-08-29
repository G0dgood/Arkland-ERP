import createHttpService from '../../components/HttpService';
import HttpService from '../../components/HttpService'


const getRequest = async () => {
	const HttpService = createHttpService();
	const { data }: any = await HttpService.get(`hr/workers-requests`)
	return data
}

const createRequest = async (input: any) => {
	const HttpService = createHttpService();
	const { data }: any = await HttpService.post(`hr/workers-requests`, input)
	return data
}

const viewRequest = async (id: any) => {
	const HttpService = createHttpService();
	const { data }: any = await HttpService.get(`hr/workers-requests/${id}`)
	return data
}

const rejectRequest = async (id: any) => {
	const HttpService = createHttpService();
	const { data }: any = await HttpService.patch(`hr/workers-requests/${id}/reject`)
	return data
}
const approveRequest = async (id: any) => {
	const HttpService = createHttpService();
	const { data }: any = await HttpService.patch(`hr/workers-requests/${id}/approve`)
	return data
}





const workerRequestSlice = {
	getRequest,
	createRequest,
	viewRequest,
	rejectRequest,
	approveRequest,
}

export default workerRequestSlice