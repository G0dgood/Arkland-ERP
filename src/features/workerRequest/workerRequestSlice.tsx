import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import workerRequestService from './workerRequestService'



const initialState = {
	data: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',

	createdata: [],
	createisError: false,
	createisSuccess: false,
	createisLoading: false,
	createmessage: '',

	viewdata: [],
	viewisError: false,
	viewisSuccess: false,
	viewisLoading: false,
	viewmessage: '',


	rejectdata: [],
	rejectisError: false,
	rejectisSuccess: false,
	rejectisLoading: false,
	rejectmessage: '',

	approvedata: [],
	approveisError: false,
	approveisSuccess: false,
	approveisLoading: false,
	approvemessage: '',


}


// Get Todos
export const getRequest = createAsyncThunk('worker/getRequest', async (data, thunkAPI) => {
	try {
		return await workerRequestService.getRequest()
	} catch (error: any) {
		const message = (error.response &&
			error.response.data &&
			error.response.data.message) ||
			error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})


// Craete Request
export const createRequest = createAsyncThunk('worker/createRequest', async (data, thunkAPI) => {
	try {
		return await workerRequestService.createRequest(data)
	} catch (error: any) {
		const message = (error.response &&
			error.response.data &&
			error.response.data.message) ||
			error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

// View Request
export const viewRequest = createAsyncThunk('worker/viewRequest', async (data, thunkAPI) => {
	try {
		return await workerRequestService.viewRequest(data)
	} catch (error: any) {
		const message = (error.response &&
			error.response.data &&
			error.response.data.message) ||
			error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})


// Delete Request
export const rejectRequest = createAsyncThunk('worker/rejectRequest', async (data, thunkAPI) => {
	try {
		return await workerRequestService.rejectRequest(data)
	} catch (error: any) {
		const message = (error.response &&
			error.response.data &&
			error.response.data.message) ||
			error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

// Update Request
export const approveRequest = createAsyncThunk('worker/approveRequest', async (data, thunkAPI) => {
	try {
		return await workerRequestService.approveRequest(data)
	} catch (error: any) {
		const message = (error.response &&
			error.response.data &&
			error.response.data.message) ||
			error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})




export const workerRequestSlice = createSlice({
	name: 'worker',
	initialState,
	reducers: {
		reset: (state) => {

			state.isLoading = false
			state.isSuccess = false
			state.isError = false
			state.message = ''

			state.createisLoading = false
			state.createisSuccess = false
			state.createisError = false
			state.createmessage = ''

			state.viewisLoading = false
			state.viewisSuccess = false
			state.viewisError = false
			state.viewmessage = ''


			state.rejectisLoading = false
			state.rejectisSuccess = false
			state.rejectisError = false
			state.rejectmessage = ''

			state.approveisLoading = false
			state.approveisSuccess = false
			state.approveisError = false
			state.approvemessage = ''


		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(getRequest.pending, (state) => {
				state.isLoading = true

			})
			.addCase(getRequest.fulfilled, (state: any, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.data = action.payload?.data
			})
			.addCase(getRequest.rejected, (state: any, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.data = null
			})

			.addCase(createRequest.pending, (state) => {
				state.createisLoading = true

			})
			.addCase(createRequest.fulfilled, (state: any, action) => {
				state.createisLoading = false
				state.createisSuccess = true
				state.createdata = action.payload?.data
			})
			.addCase(createRequest.rejected, (state: any, action) => {
				state.createisLoading = false
				state.createisError = true
				state.createmessage = action.payload
				state.createdata = null
			})


			.addCase(viewRequest.pending, (state) => {
				state.viewisLoading = true
			})
			.addCase(viewRequest.fulfilled, (state: any, action) => {
				state.viewisLoading = false
				state.viewisSuccess = true
				state.viewdata = action.payload?.data
			})
			.addCase(viewRequest.rejected, (state: any, action) => {
				state.viewisLoading = false
				state.viewisError = true
				state.viewmessage = action.payload
				state.viewdata = null
			})

			.addCase(rejectRequest.pending, (state) => {
				state.rejectisLoading = true
			})
			.addCase(rejectRequest.fulfilled, (state: any, action) => {
				state.rejectisLoading = false
				state.rejectisSuccess = true
				state.rejectdata = action.payload?.data
			})
			.addCase(rejectRequest.rejected, (state: any, action) => {
				state.rejectisLoading = false
				state.rejectisError = true
				state.rejectmessage = action.payload
				state.rejectdata = null
			})

			.addCase(approveRequest.pending, (state) => {
				state.approveisLoading = true
			})
			.addCase(approveRequest.fulfilled, (state: any, action) => {
				state.approveisLoading = false
				state.approveisSuccess = true
				state.approvedata = action.payload?.data
			})
			.addCase(approveRequest.rejected, (state: any, action) => {
				state.approveisLoading = false
				state.approveisError = true
				state.approvemessage = action.payload
				state.approvedata = null
			})


	},
})

export const { reset } = workerRequestSlice.actions
export default workerRequestSlice.reducer