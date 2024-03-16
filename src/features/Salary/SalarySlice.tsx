import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import salaryService from './SalaryService'



const initialState = {
	data: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',

	// viewdata: [],
	// viewisError: false,
	// viewisSuccess: false,
	// viewisLoading: false,
	// viewmessage: '',

	// getListChangedata: [],
	// getListChangeisError: false,
	// getListChangeisSuccess: false,
	// getListChangeisLoading: false,
	// getListChangemessage: '',

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
export const getSalary = createAsyncThunk('salary/getSalary', async (data, thunkAPI) => {
	try {
		return await salaryService.getSalary(data)
	} catch (error: any) {
		const message = (error.response &&
			error.response.data &&
			error.response.data.message) ||
			error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})


// Get Employee Payroll Details
// export const getEmployeePayrollDetails = createAsyncThunk('salary/getEmployeePayrollDetails', async (data, thunkAPI) => {
// 	try {
// 		return await payrollService.getEmployeePayrollDetails(data)
// 	} catch (error: any) {
// 		const message = (error.response &&
// 			error.response.data &&
// 			error.response.data.message) ||
// 			error.message || error.toString()
// 		return thunkAPI.rejectWithValue(message)
// 	}
// })
//Get List Change Requests
// export const getListChangeRequests = createAsyncThunk('payroll/getListChangeRequests', async (data, thunkAPI) => {
// 	try {
// 		return await payrollService.getListChangeRequests(data)
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






export const salarySlice = createSlice({
	name: 'salary',
	initialState,
	reducers: {
		reset: (state) => {

			state.isLoading = false
			state.isSuccess = false
			state.isError = false
			state.message = ''

			// state.viewisLoading = false
			// state.viewisSuccess = false
			// state.viewisError = false
			// state.viewmessage = ''

			// state.getListChangeisLoading = false
			// state.getListChangeisSuccess = false
			// state.getListChangeisError = false
			// state.getListChangemessage = ''

			// state.payRollApprovalisLoading = false
			// state.payRollApprovalisSuccess = false
			// state.payRollApprovalisError = false
			// state.payRollApprovalmessage = ''

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
			.addCase(getSalary.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getSalary.fulfilled, (state: any, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.data = action.payload?.data
			})
			.addCase(getSalary.rejected, (state: any, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
				state.data = null
			})

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
		// .addCase(getListChangeRequests.pending, (state) => {
		// 	state.getListChangeisLoading = true
		// })
		// .addCase(getListChangeRequests.fulfilled, (state: any, action) => {
		// 	state.getListChangeisLoading = false
		// 	state.getListChangeisSuccess = true
		// 	state.getListChangedata = action.payload?.data
		// })
		// .addCase(getListChangeRequests.rejected, (state: any, action) => {
		// 	state.getListChangeisLoading = false
		// 	state.getListChangeisError = true
		// 	state.getListChangemessage = action.payload
		// 	state.getListChangedata = null
		// })

		// Get Employee Payroll Details
		// .addCase(payRollEmployeeSalaryApproval.pending, (state) => {
		// 	state.payRollApprovalisLoading = true
		// })
		// .addCase(payRollEmployeeSalaryApproval.fulfilled, (state: any, action) => {
		// 	state.payRollApprovalisLoading = false
		// 	state.payRollApprovalisSuccess = true
		// 	state.payRollApprovaldata = action.payload?.data
		// })
		// .addCase(payRollEmployeeSalaryApproval.rejected, (state: any, action) => {
		// 	state.payRollApprovalisLoading = false
		// 	state.payRollApprovalisError = true
		// 	state.payRollApprovalmessage = action.payload
		// 	state.payRollApprovaldata = null
		// })


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

export const { reset } = salarySlice.actions
export default salarySlice.reducer