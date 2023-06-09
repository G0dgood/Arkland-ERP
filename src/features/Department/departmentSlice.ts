import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import employeeService from './departmentService'
 
 

 
const initialState = { 

  data:'',
  isError: false,
  isSuccess: false,
  isLoading: false, 
  message: '', 

  viewdata:'',
  viewisError: false,
  viewisSuccess: false,
  viewisLoading: false, 
  viewmessage: '', 

  createdata:'',
  createisError: false,
  createisSuccess: false,
  createisLoading: false, 
  createmessage: '', 

  deletedata:'',
  deleteisError: false,
  deleteisSuccess: false,
  deleteisLoading: false, 
  deletemessage: '', 
}
 

export const allDepartments = createAsyncThunk('departments/allDepartments', async (data,thunkAPI) => {
  try {
    return await employeeService.allDepartments(data )
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})

export const viewDepartments = createAsyncThunk('departments/viewDepartments', async (data,thunkAPI) => {
  try {
    return await employeeService.viewDepartments(data )
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})


export const createDepartments = createAsyncThunk('departments/createDepartments', async (data,  thunkAPI) => {
  try {
    return await employeeService.createDepartments(data )
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteDepartments = createAsyncThunk('departments/deleteDepartments', async (data,  thunkAPI) => {
  try {
    return await employeeService.deleteDepartments(data )
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})

 


export const departmentSlice = createSlice({
  name: 'departments',
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
      // state.viewmessage = '' 
      
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
      .addCase(allDepartments.pending, (state) => {
        state.isLoading = true 
      })
      .addCase(allDepartments.fulfilled, (state:any, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload.data 
          
      })
      .addCase(allDepartments.rejected, (state:any, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = null 
      })

      .addCase(viewDepartments.pending, (state) => {
        state.viewisLoading = true 
      })
      .addCase(viewDepartments.fulfilled, (state:any, action) => {
        state.viewviewisLoading = false
        state.viewisSuccess = true
        state.viewdata = action.payload.data  
      })
      .addCase(viewDepartments.rejected, (state:any, action) => {
        state.viewisLoading = false
        state.viewisError = true
        state.viewmessage = action.payload
        state.viewdata = null 
      })


      .addCase(createDepartments.pending, (state) => {
        state.createisLoading = true 
      })
      .addCase(createDepartments.fulfilled, (state:any, action) => {
        state.createisLoading = false
        state.createisSuccess = true
        state.createdata = action.payload 
          
      })
      .addCase(createDepartments.rejected, (state:any, action) => {
        state.createisLoading = false
        state.createisError = true
        state.createmessage = action.payload
        state.createdata = null 
      })

      .addCase(deleteDepartments.pending, (state) => {
        state.deleteisLoading = true 
      })
      .addCase(deleteDepartments.fulfilled, (state:any, action) => {
        state.deleteisLoading = false
        state.deleteisSuccess = true
        state.deletedata = action.payload 
          
      })
      .addCase(deleteDepartments.rejected, (state:any, action) => {
        state.deleteisLoading = false
        state.deleteisError = true
        state.deletemessage = action.payload
        state.deletedata = null 
      })
       
  },
})

export const { reset  } = departmentSlice.actions
export default departmentSlice.reducer