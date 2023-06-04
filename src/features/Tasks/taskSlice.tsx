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


	// deletedata: [],
	// deleteisError: false,
	// deleteisSuccess: false,
	// deleteisLoading: false,
	// deletemessage: '',
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

// View Todos
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


// // Delete Todos
// export const deleteTodos = createAsyncThunk('task/deleteTodos', async (data, thunkAPI) => {
// 	try {
// 		return await taskService.deleteTodos(data)
// 	} catch (error: any) {
// 		const message = (error.response &&
// 			error.response.data &&
// 			error.response.data.message) ||
// 			error.message || error.toString()
// 		return thunkAPI.rejectWithValue(message)
// 	}
// })





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


			// state.deleteisLoading = false
			// state.deleteisSuccess = false
			// state.deleteisError = false
			// state.deletemessage = ''

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
				state.createisLoading = true
			})
			.addCase(viewTask.fulfilled, (state: any, action) => {
				state.createisLoading = false
				state.createisSuccess = true
				state.createdata = action.payload?.data
			})
			.addCase(viewTask.rejected, (state: any, action) => {
				state.createisLoading = false
				state.createisError = true
				state.createmessage = action.payload
				state.createdata = null
			})

		// .addCase(deleteTodos.pending, (state) => {
		// 	state.deleteisLoading = true
		// })
		// .addCase(deleteTodos.fulfilled, (state: any, action) => {
		// 	state.deleteisLoading = false
		// 	state.deleteisSuccess = true
		// 	state.deletedata = action.payload?.data
		// })
		// .addCase(deleteTodos.rejected, (state: any, action) => {
		// 	state.deleteisLoading = false
		// 	state.deleteisError = true
		// 	state.deletemessage = action.payload
		// 	state.deletedata = null
		// })

	},
})

export const { reset } = taskSlice.actions
export default taskSlice.reducer