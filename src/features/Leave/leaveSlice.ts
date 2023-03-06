import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import leaveService from './leaveService'



const initialState = {

  data:   [],
  isError: false,
  isSuccess: false,
  isLoading: false, 
  message: '',
  error: '',
  dataall:   [],
  isErrorall: false,
  isSuccessall: false,
  isLoadingall: false, 
  messageall: '',
  errorall: '',
  
}
 
 

// Leave 
export const createLeave = createAsyncThunk('leave/createLeave', async ( input,thunkAPI) => {
  try {
    return await leaveService.createLeave(input)
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
      console.log('error.response.data ',error.response.message)
      console.log('error.response.data ',error.response.data.message)
      console.log('error.response.data ',error.message)
      console.log('error.response.data ',error)
    
    return thunkAPI.rejectWithValue(message)
  }
})
 
// Get All Leave 
export const getCreateLeave = createAsyncThunk('leave/getCreateLeave', async ( data,thunkAPI) => {
  try {
    return await leaveService.getCreateLeave( )
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()   
    
    return thunkAPI.rejectWithValue(message)
  }
})
 

 
 

export const leaveSlice = createSlice({
  name: 'leave',
  initialState,
  reducers: {
    reset: (state) => {  
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = '' 
      state.isLoadingall = false
      state.isSuccessall = false
      state.isErrorall = false
      state.messageall = '' 
    },
    
  },
  extraReducers: (builder) => {
    builder 
      .addCase(createLeave.pending, (state) => {
        state.isLoading = true
        
      })
      .addCase(createLeave.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload 
      })
      .addCase(createLeave.rejected, (state:any, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = [] 
      })
      .addCase(getCreateLeave.pending, (state) => {
        state.isLoadingall = true
        
      })
      .addCase(getCreateLeave.fulfilled, (state, action) => {
        state.isLoadingall = false
        state.isSuccessall = true
        state.dataall = action.payload 
      })
      .addCase(getCreateLeave.rejected, (state:any, action) => {
        state.isLoadingall = false
        state.isErrorall = true
        state.messageall = action.payload
        state.dataall = [] 
      })
     
      
  },
})

export const { reset } = leaveSlice.actions
export default leaveSlice.reducer