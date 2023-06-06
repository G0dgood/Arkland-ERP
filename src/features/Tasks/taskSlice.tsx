import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import taskService from './taskService'






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
export const getTask = createAsyncThunk('task/getTask', async (data, thunkAPI) => {
	try {
		return await taskService.getTask()
	} catch (error: any) {
		const message = (error.response &&
			error.response.data &&
			error.response.data.message) ||
			error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})


// Craete Task
export const createTask = createAsyncThunk('task/createTask', async (data, thunkAPI) => {
	try {
		return await taskService.createTask(data)
	} catch (error: any) {
		const message = (error.response &&
			error.response.data &&
			error.response.data.message) ||
			error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

// View Task
export const viewTask = createAsyncThunk('task/viewTask', async (data, thunkAPI) => {
	try {
		return await taskService.viewTask(data)
	} catch (error: any) {
		const message = (error.response &&
			error.response.data &&
			error.response.data.message) ||
			error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})


// Delete Task
export const deleteTask = createAsyncThunk('task/deleteTask', async (data, thunkAPI) => {
	try {
		return await taskService.deleteTask(data)
	} catch (error: any) {
		const message = (error.response &&
			error.response.data &&
			error.response.data.message) ||
			error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

// Update Task
export const updateTask = createAsyncThunk('task/updateTask', async (data, thunkAPI) => {
	try {
		return await taskService.updateTask(data)
	} catch (error: any) {
		const message = (error.response &&
			error.response.data &&
			error.response.data.message) ||
			error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})
// Note Task
export const noteTask = createAsyncThunk('task/noteTask', async (data, thunkAPI) => {
	try {
		return await taskService.noteTask(data)
	} catch (error: any) {
		const message = (error.response &&
			error.response.data &&
			error.response.data.message) ||
			error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})





export const taskSlice = createSlice({
	name: 'task',
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
			.addCase(getTask.pending, (state) => {
				state.isLoading = true

			})
			.addCase(getTask.fulfilled, (state: any, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.data = action.payload?.data
			})
			.addCase(getTask.rejected, (state: any, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.data = null
			})

			.addCase(createTask.pending, (state) => {
				state.createisLoading = true

			})
			.addCase(createTask.fulfilled, (state: any, action) => {
				state.createisLoading = false
				state.createisSuccess = true
				state.createdata = action.payload?.data
			})
			.addCase(createTask.rejected, (state: any, action) => {
				state.createisLoading = false
				state.createisError = true
				state.createmessage = action.payload
				state.createdata = null
			})


			.addCase(viewTask.pending, (state) => {
				state.viewisLoading = true
			})
			.addCase(viewTask.fulfilled, (state: any, action) => {
				state.viewisLoading = false
				state.viewisSuccess = true
				state.viewdata = action.payload?.data
			})
			.addCase(viewTask.rejected, (state: any, action) => {
				state.viewisLoading = false
				state.viewisError = true
				state.viewmessage = action.payload
				state.viewdata = null
			})

			.addCase(deleteTask.pending, (state) => {
				state.deleteisLoading = true
			})
			.addCase(deleteTask.fulfilled, (state: any, action) => {
				state.deleteisLoading = false
				state.deleteisSuccess = true
				state.deletedata = action.payload?.data
			})
			.addCase(deleteTask.rejected, (state: any, action) => {
				state.deleteisLoading = false
				state.deleteisError = true
				state.deletemessage = action.payload
				state.deletedata = null
			})

			.addCase(updateTask.pending, (state) => {
				state.updateisLoading = true
			})
			.addCase(updateTask.fulfilled, (state: any, action) => {
				state.updateisLoading = false
				state.updateisSuccess = true
				state.updatedata = action.payload?.data
			})
			.addCase(updateTask.rejected, (state: any, action) => {
				state.updateisLoading = false
				state.updateisError = true
				state.updatemessage = action.payload
				state.updatedata = null
			})
			.addCase(noteTask.pending, (state) => {
				state.noteisLoading = true
			})
			.addCase(noteTask.fulfilled, (state: any, action) => {
				state.noteisLoading = false
				state.noteisSuccess = true
				state.notedata = action.payload?.data
			})
			.addCase(noteTask.rejected, (state: any, action) => {
				state.noteisLoading = false
				state.noteisError = true
				state.notemessage = action.payload
				state.notedata = null
			})

	},
})

export const { reset } = taskSlice.actions
export default taskSlice.reducer