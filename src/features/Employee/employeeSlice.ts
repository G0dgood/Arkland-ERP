import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import employeeService from './employeeService'
 
 

 
const initialState = { 

  data:  [],
  isError: false,
  isSuccess: false,
  isLoading: false, 
  message: '', 

  uploaddata:  [],
  uploadisError: false,
  uploadisSuccess: false,
  uploadisLoading: false, 
  uploadmessage: '', 

  roledata:  [],
  roleisError: false,
  roleisSuccess: false,
  roleisLoading: false, 
  rolemessage: '', 
}
 

export const allEmployee = createAsyncThunk('employee/allEmployee', async (data,thunkAPI) => {
  try {
    return await employeeService.allEmployee(data )
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})

  // @ts-ignore
export const uploadEmployee = createAsyncThunk('employee/uploadEmployee', async (data,setProgress, thunkAPI) => {
  try {
    return await employeeService.uploadEmployee(data, setProgress)
    
  } catch (error: any) { 
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})
export const createEmployeeRole = createAsyncThunk('employee/createEmployeeRole', async (data, thunkAPI) => {
  try {
    return await employeeService.createEmployeeRole(data)
    
  } catch (error: any) { 
    console.log('error',error)
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})

 


export const authSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    reset: (state) => {  

      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = '' 
      
      state.uploadisLoading = false
      state.uploadisSuccess = false
      state.uploadisError = false
      state.uploadmessage = '' 

      state.roleisLoading = false
      state.roleisSuccess = false
      state.roleisError = false
      state.rolemessage = '' 
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(allEmployee.pending, (state) => {
        state.isLoading = true 
      })
      .addCase(allEmployee.fulfilled, (state:any, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload.data.data  
      })
      .addCase(allEmployee.rejected, (state:any, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload 
        state.data = '' 
      })

      .addCase(uploadEmployee.pending, (state) => {
        state.uploadisLoading = true 
      })
      .addCase(uploadEmployee.fulfilled, (state:any, action) => {
        state.uploadisLoading = false
        state.uploadisSuccess = true
        state.uploaddata = action.payload  
          console.log('uploaddata',action.payload)
      })
      .addCase(uploadEmployee.rejected, (state:any, action) => {
        state.uploadisLoading = false
        state.uploadisError = true
        state.uploadmessage = action.payload  
        state.uploaddata = '' 
      })
      

      .addCase(createEmployeeRole.pending, (state) => {
        state.roleisLoading = true 
      })
      .addCase(createEmployeeRole.fulfilled, (state:any, action) => {
        state.roleisLoading = false
        state.roleisSuccess = true
        state.roledata = action.payload    
      })
      .addCase(createEmployeeRole.rejected, (state:any, action) => {
        state.roleisLoading = false
        state.roleisError = true
        state.rolemessage = action.payload  
          console.log('actionpayload2',action)
        state.roledata = '' 
      })
       
  },
})

export const { reset  } = authSlice.actions
export default authSlice.reducer