import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import PayparametersService from './PayparametersService'
 



const initialState = {
	// data: [],
	// isError: false,
	// isSuccess: false,
	// isLoading: false,
	// message: '',

	payparameterDetailsdata: [],
	payparameterDetailsisError: false,
	payparameterDetailsisSuccess: false,
	payparameterDetailsisLoading: false,
	payparameterDetailsmessage: '',

	getparameterdata: [],
	getparameterisError: false,
	getparameterisSuccess: false,
	getparameterisLoading: false,
	getparametermessage: '',

	// payRollApprovaldata: [],
	// payRollApprovalisError: false,
	// payRollApprovalisSuccess: false,
	// payRollApprovalisLoading: false,
	// payRollApprovalmessage: '',

	// createdata: [],
	// createisError: false,
	// createisSuccess: false,
	// createisLoading: false,
	// createmessage: '',


	// deletedata: [],
	// deleteisError: false,
	// deleteisSuccess: false,
	// deleteisLoading: false,
	// deletemessage: '',


}


// Get Employee
export const getPayparameters = createAsyncThunk('payparameter/getPayparameters', async (data, thunkAPI) => {
	try {
		return await PayparametersService.getPayparameters(data)
	} catch (error: any) {
		const message = (error.response &&
			error.response.data &&
			error.response.data.message) ||
			error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})


// Get Pay parameter Details
export const getPayparameterDetails = createAsyncThunk('payparameter/getPayparameterDetails', async (data, thunkAPI) => {
	try {
		return await PayparametersService.getPayparameterDetails(data)
	} catch (error: any) {
		const message = (error.response &&
			error.response.data &&
			error.response.data.message) ||
			error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})
//Get List Change Requests
// export const getparameterRequests = createAsyncThunk('payroll/getparameterRequests', async (data, thunkAPI) => {
// 	try {
// 		return await payrollService.getparameterRequests(data)
// 	} catch (error: any) {
// 		const message = (error.response &&
// 			error.response.data &&
// 			error.response.data.message) ||
// 			error.message || error.toString()
// 		return thunkAPI.rejectWithValue(message)
// 	}
// })

//PayRoll Employee Salary Approval
// export const payRollEmployeeSalaryApproval = createAsyncThunk('payroll/payRollEmployeeSalaryApproval', async (data, thunkAPI) => {
// 	try {
// 		return await payrollService.payRollEmployeeSalaryApproval(data)
// 	} catch (error: any) {
// 		const message = (error.response &&
// 			error.response.data &&
// 			error.response.data.message) ||
// 			error.message || error.toString()
// 		return thunkAPI.rejectWithValue(message)
// 	}
// })

// View Teams
// export const viewTeamLead = createAsyncThunk('team/viewTeamLead', async (data, thunkAPI) => {
// 	try {
// 		return await payrollService.viewTeamLead(data)
// 	} catch (error: any) {
// 		const message = (error.response &&
// 			error.response.data &&
// 			error.response.data.message) ||
// 			error.message || error.toString()
// 		return thunkAPI.rejectWithValue(message)
// 	}
// })


// Delete Teams
// export const deleteTeamLead = createAsyncThunk('team/deleteTeamLead', async (data, thunkAPI) => {
// 	try {
// 		return await payrollService.deleteTeamLead(data)
// 	} catch (error: any) {
// 		const message = (error.response &&
// 			error.response.data &&
// 			error.response.data.message) ||
// 			error.message || error.toString()
// 		return thunkAPI.rejectWithValue(message)
// 	}
// })






export const PayparametersSlice = createSlice({
	name: 'payparameter',
	initialState,
	reducers: {
		reset: (state) => {

			// state.isLoading = false
			// state.isSuccess = false
			// state.isError = false
			// state.message = ''

			// state.viewisLoading = false
			// state.viewisSuccess = false
			// state.viewisError = false
			// state.viewmessage = ''

			state.getparameterisLoading = false
			state.getparameterisSuccess = false
			state.getparameterisError = false
			state.getparametermessage = ''

			state.payparameterDetailsisLoading = false
			state.payparameterDetailsisSuccess = false
			state.payparameterDetailsisError = false
			state.payparameterDetailsmessage = ''

			// state.createisLoading = false
			// state.createisSuccess = false
			// state.createisError = false
			// state.createmessage = ''


			// state.deleteisLoading = false
			// state.deleteisSuccess = false
			// state.deleteisError = false
			// state.deletemessage = ''



		},
	},

	extraReducers: (builder) => {
		builder
			// .addCase(getEmployeePayroll.pending, (state) => {
			// 	state.isLoading = true
			// })
			// .addCase(getEmployeePayroll.fulfilled, (state: any, action) => {
			// 	state.isLoading = false
			// 	state.isSuccess = true
			// 	state.data = action.payload?.data
			// })
			// .addCase(getEmployeePayroll.rejected, (state: any, action) => {
			// 	state.isLoading = false
			// 	state.isError = true
			// 	state.message = action.payload
			// 	state.data = null
			// })

			// Get Employee Payroll Details
			// .addCase(getEmployeePayrollDetails.pending, (state) => {
			// 	state.viewisLoading = true
			// })
			// .addCase(getEmployeePayrollDetails.fulfilled, (state: any, action) => {
			// 	state.viewisLoading = false
			// 	state.viewisSuccess = true
			// 	state.viewdata = action.payload?.data
			// })
			// .addCase(getEmployeePayrollDetails.rejected, (state: any, action) => {
			// 	state.viewisLoading = false
			// 	state.viewisError = true
			// 	state.viewmessage = action.payload
			// 	state.viewdata = null
			// })

			// Get Employee Payroll Details
			.addCase(getPayparameters.pending, (state) => {
				state.getparameterisLoading = true
			})
			.addCase(getPayparameters.fulfilled, (state: any, action) => {
				state.getparameterisLoading = false
				state.getparameterisSuccess = true
				state.getparameterdata = action.payload?.data
			})
			.addCase(getPayparameters.rejected, (state: any, action) => {
				state.getparameterisLoading = false
				state.getparameterisError = true
				state.getparametermessage = action.payload
				state.getparameterdata = null
			})

			// Get Pay parameter Details
			.addCase(getPayparameterDetails.pending, (state) => {
				state.payparameterDetailsisLoading = true
			})
			.addCase(getPayparameterDetails.fulfilled, (state: any, action) => {
				state.payparameterDetailsisLoading = false
				state.payparameterDetailsisSuccess = true
				state.payparameterDetailsdata = action.payload?.data
			})
			.addCase(getPayparameterDetails.rejected, (state: any, action) => {
				state.payparameterDetailsisLoading = false
				state.payparameterDetailsisError = true
				state.payparameterDetailsmessage = action.payload
				state.payparameterDetailsdata = null
			})


		// .addCase(viewTeamLead.pending, (state) => {
		// 	state.viewisLoading = true
		// })
		// .addCase(viewTeamLead.fulfilled, (state: any, action) => {
		// 	state.viewisLoading = false
		// 	state.viewisSuccess = true
		// 	state.viewdata = action.payload?.data
		// })
		// .addCase(viewTeamLead.rejected, (state: any, action) => {
		// 	state.viewisLoading = false
		// 	state.viewisError = true
		// 	state.viewmessage = action.payload
		// 	state.viewdata = null
		// })

		// .addCase(deleteTeamLead.pending, (state) => {
		// 	state.deleteisLoading = true
		// })
		// .addCase(deleteTeamLead.fulfilled, (state: any, action) => {
		// 	state.deleteisLoading = false
		// 	state.deleteisSuccess = true
		// 	state.deletedata = action.payload?.data
		// })
		// .addCase(deleteTeamLead.rejected, (state: any, action) => {
		// 	state.deleteisLoading = false
		// 	state.deleteisError = true
		// 	state.deletemessage = action.payload
		// 	state.deletedata = null
		// })



	},
})

export const { reset } = PayparametersSlice.actions
export default PayparametersSlice.reducer