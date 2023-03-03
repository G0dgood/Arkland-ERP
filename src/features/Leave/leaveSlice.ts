import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import leaveService from './leaveService'



const initialState = {

  data:   [],
  isError: false,
  isSuccess: false,
  isLoading: false, 
  message: '',
  error: '',
  
}
 
 

// Create
export const createLeave = createAsyncThunk('leave/createLeave', async ( input,thunkAPI) => {
  try {
    return await leaveService.createLeave(input)
  } catch (error:any) {
    const message =
      error.response &&
        error.response.data ?
        error.response.data.errors[0].message :
        error.message 
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
     
      
  },
})

export const { reset } = leaveSlice.actions
export default leaveSlice.reducer