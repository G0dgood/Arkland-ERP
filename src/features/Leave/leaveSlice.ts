import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import leaveService from './leaveService'



const initialState = {

  data:    '',
  isError: false,
  isSuccess: false,
  isLoading: false, 
  message: '',
  error: '',

  allLeavedata:   [],
  allLeaveisError: false,
  allLeaveisSuccess: false,
  allLeaveisLoading: false, 
  allLeavemessage: '',
  allLeaveerror: '',
  
}
 
 

// Leave 
export const createLeave = createAsyncThunk('leave/createLeave', async ( data,thunkAPI) => {
  try {
    return await leaveService.createLeave(data)
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()   
    
    return thunkAPI.rejectWithValue(message)
  }
})
 
// Get My Leave 
export const getCreateLeave:any = createAsyncThunk('leave/getCreateLeave', async(data:any, thunkAPI) => {
  try {
    return await leaveService.getCreateLeave(data)
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

      state.allLeaveisLoading = false
      state.allLeaveisSuccess = false
      state.allLeaveisError = false
      state.allLeavemessage = '' 
    },
    
  },
  extraReducers: (builder) => {
    builder 
      .addCase(createLeave.pending, (state) => {
        state.isLoading = true 
      })
      .addCase(createLeave.fulfilled, (state:any, action) => {
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

      // GET LEAVE APPLICATIONS
      .addCase(getCreateLeave.pending, (state) => {
        state.allLeaveisLoading= true
        
      })
      .addCase(getCreateLeave.fulfilled, (state, action) => {
        state.allLeaveisLoading= false
        state.allLeaveisSuccess= true
        state.allLeavedata= action.payload?.data?.data 
      })
      .addCase(getCreateLeave.rejected, (state:any, action) => {
        state.allLeaveisLoading= false
        state.allLeaveisError= true
        state.allLeavemessage= action.payload
        state.allLeavedata= [] 
      })
     
      
  },
})

export const { reset } = leaveSlice.actions
export default leaveSlice.reducer