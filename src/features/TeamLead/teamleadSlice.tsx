import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import teamleadService from './teamleadService'







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


// Get Teams
export const getTeamLead = createAsyncThunk('teamlead/getTeamLead', async (data, thunkAPI) => {
	try {
		return await teamleadService.getTeamLead(data)
	} catch (error: any) {
		const message = (error.response &&
			error.response.data &&
			error.response.data.message) ||
			error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})


// Craete Team
export const createTeamLead = createAsyncThunk('team/createTeamLead', async (data, thunkAPI) => {
	try {
		return await teamleadService.createTeamLead(data)
	} catch (error: any) {
		const message = (error.response &&
			error.response.data &&
			error.response.data.message) ||
			error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

// View Teams
export const viewTeamLead = createAsyncThunk('team/viewTeamLead', async (data, thunkAPI) => {
	try {
		return await teamleadService.viewTeamLead(data)
	} catch (error: any) {
		const message = (error.response &&
			error.response.data &&
			error.response.data.message) ||
			error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})


// Delete Teams
export const deleteTeamLead = createAsyncThunk('team/deleteTeamLead', async (data, thunkAPI) => {
	try {
		return await teamleadService.deleteTeamLead(data)
	} catch (error: any) {
		const message = (error.response &&
			error.response.data &&
			error.response.data.message) ||
			error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})






export const teamleadSlice = createSlice({
	name: 'teamlead',
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
			.addCase(getTeamLead.pending, (state) => {
				state.isLoading = true

			})
			.addCase(getTeamLead.fulfilled, (state: any, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.data = action.payload?.data
			})
			.addCase(getTeamLead.rejected, (state: any, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.data = null
			})

			.addCase(createTeamLead.pending, (state) => {
				state.createisLoading = true
			})
			.addCase(createTeamLead.fulfilled, (state: any, action) => {
				state.createisLoading = false
				state.createisSuccess = true
				state.createdata = action.payload?.data
			})
			.addCase(createTeamLead.rejected, (state: any, action) => {
				state.createisLoading = false
				state.createisError = true
				state.createmessage = action.payload
				state.createdata = null
			})


			.addCase(viewTeamLead.pending, (state) => {
				state.viewisLoading = true
			})
			.addCase(viewTeamLead.fulfilled, (state: any, action) => {
				state.viewisLoading = false
				state.viewisSuccess = true
				state.viewdata = action.payload?.data
			})
			.addCase(viewTeamLead.rejected, (state: any, action) => {
				state.viewisLoading = false
				state.viewisError = true
				state.viewmessage = action.payload
				state.viewdata = null
			})

			.addCase(deleteTeamLead.pending, (state) => {
				state.deleteisLoading = true
			})
			.addCase(deleteTeamLead.fulfilled, (state: any, action) => {
				state.deleteisLoading = false
				state.deleteisSuccess = true
				state.deletedata = action.payload?.data
			})
			.addCase(deleteTeamLead.rejected, (state: any, action) => {
				state.deleteisLoading = false
				state.deleteisError = true
				state.deletemessage = action.payload
				state.deletedata = null
			})



	},
})

export const { reset } = teamleadSlice.actions
export default teamleadSlice.reducer