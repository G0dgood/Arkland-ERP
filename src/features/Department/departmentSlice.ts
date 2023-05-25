import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import employeeService from './departmentService'
 
 

 
const initialState = { 

  data:'',
  isError: false,
  isSuccess: false,
  isLoading: false, 
  message: '', 
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

 


export const authSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    reset: (state) => {  

      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = '' 
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
       
  },
})

export const { reset  } = authSlice.actions
export default authSlice.reducer