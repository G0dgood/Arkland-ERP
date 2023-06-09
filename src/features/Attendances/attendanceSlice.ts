import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import attendanceService from './attendanceService'
 
 
 
 
  
 
const initialState = { 

  data:'',
  isError: false,
  isSuccess: false,
  isLoading: false, 
  message: '', 

  hrdata:'',
  hrisError: false,
  hrisSuccess: false,
  hrisLoading: false, 
  hrmessage: '', 
 
  hrgetattenddata:'',
  hrgetattendisError: false,
  hrgetattendisSuccess: false,
  hrgetattendisLoading: false, 
  hrgetattendmessage: '', 

  mydata:'',
  myisError: false,
  myisSuccess: false,
  myisLoading: false, 
  mymessage: '', 
 
}
 

export const createAttendance = createAsyncThunk('attendance/createAttendance', async (data,thunkAPI) => {
  try {
    return await attendanceService.createAttendance(data )
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})

export const hrcreateAttendance = createAsyncThunk('attendance/hrcreateAttendance', async (data,thunkAPI) => {
  try {
    return await attendanceService.hrcreateAttendance(data )
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})

export const hrgetAttendance = createAsyncThunk('attendance/hrgetAttendance', async (data,thunkAPI) => {
  try {
    return await attendanceService.hrgetAttendance(data )
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})
export const myAttendance = createAsyncThunk('attendance/myAttendance', async (data,thunkAPI) => {
  try {
    return await attendanceService.myAttendance(data )
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})

 
 

 
 


export const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    reset: (state) => {  

      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''  

      state.hrisLoading = false
      state.hrisSuccess = false
      state.hrisError = false
      state.hrmessage = ''  

      state.hrgetattendisLoading = false
      state.hrgetattendisSuccess = false
      state.hrgetattendisError = false
      state.hrgetattendmessage = ''  

      state.myisLoading = false
      state.myisSuccess = false
      state.myisError = false
      state.mymessage = ''  
    }, 
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(createAttendance.pending, (state) => {
        state.isLoading = true 
      })
      .addCase(createAttendance.fulfilled, (state:any, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload.data 
          
      })
      .addCase(createAttendance.rejected, (state:any, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = null 
      })


      .addCase(hrcreateAttendance.pending, (state) => {
        state.hrisLoading = true 
      })
      .addCase(hrcreateAttendance.fulfilled, (state:any, action) => {
        state.hrisLoading = false
        state.hrisSuccess = true
        state.hrdata = action.payload.data 
          
      })
      .addCase(hrcreateAttendance.rejected, (state:any, action) => {
        state.hrisLoading = false
        state.hrisError = true
        state.hrmessage = action.payload
        state.hrdata = null 
      })

      .addCase(hrgetAttendance.pending, (state) => {
        state.hrgetattendisLoading = true 
      })
      .addCase(hrgetAttendance.fulfilled, (state:any, action) => {
        state.hrgetattendisLoading = false
        state.hrgetattendisSuccess = true
        state.hrgetattenddata = action.payload.data 
          
      })
      .addCase(hrgetAttendance.rejected, (state:any, action) => {
        state.hrgetattendisLoading = false
        state.hrgetattendisError = true
        state.hrgetattendmessage = action.payload
        state.hrgetattenddata = null 
      })

      .addCase(myAttendance.pending, (state) => {
        state.myisLoading = true 
      })
      .addCase(myAttendance.fulfilled, (state:any, action) => {
        state.myisLoading = false
        state.myisSuccess = true
        state.mydata = action.payload.data 
          
      })
      .addCase(myAttendance.rejected, (state:any, action) => {
        state.myisLoading = false
        state.myisError = true
        state.mymessage = action.payload
        state.mydata = null 
      })
  
  },
})

export const { reset  } = attendanceSlice.actions
export default attendanceSlice.reducer