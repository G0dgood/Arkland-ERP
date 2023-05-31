import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import todosService from './todosService'





const initialState = {
	data: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',

	viewdata: [],
	viewisError: false,
	viewisSuccess: false,
	viewisLoading: false,
	viewmessage: '',

	createdata: [],
	createisError: false,
	createisSuccess: false,
	createisLoading: false,
	createmessage: '',

	deletedata: [],
	deleteisError: false,
	deleteisSuccess: false,
	deleteisLoading: false,
	deletemessage: '',
}


// Get Todos
export const getTodos = createAsyncThunk('auth/getTodos', async (data, thunkAPI) => {
	try {
		return await todosService.getTodos()
	} catch (error: any) {
		const message = (error.response &&
			error.response.data &&
			error.response.data.message) ||
			error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

// View Todos
export const viewTodos = createAsyncThunk('auth/viewTodos', async (data, thunkAPI) => {
	try {
		return await todosService.viewTodos(data)
	} catch (error: any) {
		const message = (error.response &&
			error.response.data &&
			error.response.data.message) ||
			error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})
// Craete Todos
export const createTodos = createAsyncThunk('auth/createTodos', async (data, thunkAPI) => {
	try {
		return await todosService.createTodos(data)
	} catch (error: any) {
		const message = (error.response &&
			error.response.data &&
			error.response.data.message) ||
			error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

// Delete Todos
export const deleteTodos = createAsyncThunk('auth/deleteTodos', async (data, thunkAPI) => {
	try {
		return await todosService.deleteTodos(data)
	} catch (error: any) {
		const message = (error.response &&
			error.response.data &&
			error.response.data.message) ||
			error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})





export const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		reset: (state) => {

			state.isLoading = false
			state.isSuccess = false
			state.isError = false
			state.message = ''

			state.viewisLoading = false
			state.viewisSuccess = false
			state.viewisError = false
			state.viewmessage = ''

			state.createisLoading = false
			state.createisSuccess = false
			state.createisError = false
			state.createmessage = ''

			state.deleteisLoading = false
			state.deleteisSuccess = false
			state.deleteisError = false
			state.deletemessage = ''

		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(getTodos.pending, (state) => {
				state.isLoading = true

			})
			.addCase(getTodos.fulfilled, (state: any, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.data = action.payload?.data
			})
			.addCase(getTodos.rejected, (state: any, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.data = null
			})

			.addCase(viewTodos.pending, (state) => {
				state.viewisLoading = true

			})
			.addCase(viewTodos.fulfilled, (state: any, action) => {
				state.viewisLoading = false
				state.viewisSuccess = true
				state.viewdata = action.payload?.data
			})
			.addCase(viewTodos.rejected, (state: any, action) => {
				state.viewisLoading = false
				state.viewisError = true
				state.viewmessage = action.payload
				state.viewdata = null
			})


			.addCase(createTodos.pending, (state) => {
				state.createisLoading = true
			})
			.addCase(createTodos.fulfilled, (state: any, action) => {
				state.createisLoading = false
				state.createisSuccess = true
				state.createdata = action.payload?.data
			})
			.addCase(createTodos.rejected, (state: any, action) => {
				state.createisLoading = false
				state.createisError = true
				state.createmessage = action.payload
				state.createdata = null
			})

			.addCase(deleteTodos.pending, (state) => {
				state.deleteisLoading = true
			})
			.addCase(deleteTodos.fulfilled, (state: any, action) => {
				state.deleteisLoading = false
				state.deleteisSuccess = true
				state.deletedata = action.payload?.data
			})
			.addCase(deleteTodos.rejected, (state: any, action) => {
				state.deleteisLoading = false
				state.deleteisError = true
				state.deletemessage = action.payload
				state.deletedata = null
			})

	},
})

export const { reset } = todosSlice.actions
export default todosSlice.reducer