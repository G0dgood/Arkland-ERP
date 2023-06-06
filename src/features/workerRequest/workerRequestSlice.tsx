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


	deletedata: [],
	deleteisError: false,
	deleteisSuccess: false,
	deleteisLoading: false,
	deletemessage: '',

	updatedata: [],
	updateisError: false,
	updateisSuccess: false,
	updateisLoading: false,
	updatemessage: '',

	notedata: [],
	noteisError: false,
	noteisSuccess: false,
	noteisLoading: false,
	notemessage: '',
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
export const deleteRequest = createAsyncThunk('worker/deleteRequest', async (data, thunkAPI) => {
	try {
		return await workerRequestService.deleteRequest(data)
	} catch (error: any) {
		const message = (error.response &&
			error.response.data &&
			error.response.data.message) ||
			error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

// Update Request
export const updateRequest = createAsyncThunk('worker/updateRequest', async (data, thunkAPI) => {
	try {
		return await workerRequestService.updateRequest(data)
	} catch (error: any) {
		const message = (error.response &&
			error.response.data &&
			error.response.data.message) ||
			error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})
// Note Request
export const noteRequest = createAsyncThunk('worker/noteRequest', async (data, thunkAPI) => {
	try {
		return await workerRequestService.noteRequest(data)
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


			state.deleteisLoading = false
			state.deleteisSuccess = false
			state.deleteisError = false
			state.deletemessage = ''

			state.updateisLoading = false
			state.updateisSuccess = false
			state.updateisError = false
			state.updatemessage = ''

			state.noteisLoading = false
			state.noteisSuccess = false
			state.noteisError = false
			state.notemessage = ''

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

			.addCase(deleteRequest.pending, (state) => {
				state.deleteisLoading = true
			})
			.addCase(deleteRequest.fulfilled, (state: any, action) => {
				state.deleteisLoading = false
				state.deleteisSuccess = true
				state.deletedata = action.payload?.data
			})
			.addCase(deleteRequest.rejected, (state: any, action) => {
				state.deleteisLoading = false
				state.deleteisError = true
				state.deletemessage = action.payload
				state.deletedata = null
			})

			.addCase(updateRequest.pending, (state) => {
				state.updateisLoading = true
			})
			.addCase(updateRequest.fulfilled, (state: any, action) => {
				state.updateisLoading = false
				state.updateisSuccess = true
				state.updatedata = action.payload?.data
			})
			.addCase(updateRequest.rejected, (state: any, action) => {
				state.updateisLoading = false
				state.updateisError = true
				state.updatemessage = action.payload
				state.updatedata = null
			})
			.addCase(noteRequest.pending, (state) => {
				state.noteisLoading = true
			})
			.addCase(noteRequest.fulfilled, (state: any, action) => {
				state.noteisLoading = false
				state.noteisSuccess = true
				state.notedata = action.payload?.data
			})
			.addCase(noteRequest.rejected, (state: any, action) => {
				state.noteisLoading = false
				state.noteisError = true
				state.notemessage = action.payload
				state.notedata = null
			})

	},
})

export const { reset } = workerRequestSlice.actions
export default workerRequestSlice.reducer