import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import WeeklyReportService from './WeeklyReportService'
 

const initialState: any = {

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

  HODdata: [],
  HODisError: false,
  HODisSuccess: false,
  HODisLoading: false, 
  HODmessage: '', 

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
  
}
 

// All weekly Report 
export const allweeklyReport = createAsyncThunk('weeklyreport/allweeklyReport', async (data,thunkAPI) => {
  try {
    return await WeeklyReportService.allweeklyReport(data)
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})

// Create Weekly Report
export const createweeklyReport = createAsyncThunk('weeklyreport/createweeklyReport', async (data,thunkAPI) => {
  try {
    return await WeeklyReportService.createweeklyReport(data)
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})
 
// Get HOD Weekly Report
export const getHODWeeklyReport = createAsyncThunk('weeklyreport/getHODWeeklyReport', async (data,thunkAPI) => {
  try {
    return await WeeklyReportService.getHODWeeklyReport()
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})
 
// View Weekly Report
export const viewWeeklyReport = createAsyncThunk('weeklyreport/viewWeeklyReport', async (data,thunkAPI) => {
  try {
    return await WeeklyReportService.viewWeeklyReport(data)
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})

// Delete Weekly Report
export const deleteWeeklyReport = createAsyncThunk('weeklyreport/deleteWeeklyReport', async (data,thunkAPI) => {
  try {
    return await WeeklyReportService.deleteWeeklyReport(data)
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})

 
// Update Weekly Report
export const updateWeeklyReport = createAsyncThunk('weeklyreport/updateWeeklyReport', async (data,thunkAPI) => {
  try {
    return await WeeklyReportService.updateWeeklyReport(data)
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})
 
 
  

export const WeeklyReportSlice = createSlice({
  name: 'weeklyreport',
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

      state.HODisLoading = false
      state.HODisSuccess = false
      state.HODisError = false
      state.HODmessage = '' 

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
                
    },
  },
  extraReducers: (builder) => {
    builder 
      .addCase(allweeklyReport.pending, (state) => {
        state.isLoading = true
        
      })
      .addCase(allweeklyReport.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload?.data?.data 
      })
      .addCase(allweeklyReport.rejected, (state:any, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = [] 
      }) 

      .addCase(createweeklyReport.pending, (state) => {
        state.createisLoading = true
        
      })
      .addCase(createweeklyReport.fulfilled, (state, action) => {
        state.createisLoading = false
        state.createisSuccess = true
        state.createdata = action.payload?.data  
      })
      .addCase(createweeklyReport.rejected, (state:any, action) => {
        state.createisLoading = false
        state.createisError = true
        state.createmessage = action.payload
        state.createdata = [] 
      }) 

      .addCase(getHODWeeklyReport.pending, (state) => {
        state.HODisLoading = true
        
      })
      .addCase(getHODWeeklyReport.fulfilled, (state, action) => {
        state.HODisLoading = false
        state.HODisSuccess = true
        state.HODdata = action.payload?.data  
      })
      .addCase(getHODWeeklyReport.rejected, (state:any, action) => {
        state.HODisLoading = false
        state.HODisError = true
        state.HODmessage = action.payload
        state.HODdata = [] 
      }) 

      .addCase(viewWeeklyReport.pending, (state) => {
        state.viewisLoading = true
        
      })
      .addCase(viewWeeklyReport.fulfilled, (state, action) => {
        state.viewisLoading = false
        state.viewisSuccess = true
        state.viewdata = action.payload?.data   
      })
      .addCase(viewWeeklyReport.rejected, (state:any, action) => {
        state.viewisLoading = false
        state.viewisError = true
        state.viewmessage = action.payload
        state.viewdata = [] 
      }) 

      .addCase(deleteWeeklyReport.pending, (state) => {
        state.deleteisLoading = true
        
      })
      .addCase(deleteWeeklyReport.fulfilled, (state, action) => {
        state.deleteisLoading = false
        state.deleteisSuccess = true
        state.deletedata = action.payload?.data  
      })
      .addCase(deleteWeeklyReport.rejected, (state:any, action) => {
        state.deleteisLoading = false
        state.deleteisError = true
        state.deletemessage = action.payload
        state.deletedata = [] 
      }) 

      .addCase(updateWeeklyReport.pending, (state) => {
        state.updateisLoading = true
        
      })
      .addCase(updateWeeklyReport.fulfilled, (state, action) => {
        state.updateisLoading = false
        state.updateisSuccess = true
        state.updatedata = action.payload?.data 
      })
      .addCase(updateWeeklyReport.rejected, (state:any, action) => {
        state.updateisLoading = false
        state.updateisError = true
        state.updatemessage = action.payload
        state.updatedata = [] 
      }) 
      
  },
})

export const { reset } = WeeklyReportSlice.actions
export default WeeklyReportSlice.reducer