import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import userService from './userService'
 



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
 
 

// User Role 
export const userRole = createAsyncThunk('user/userRole', async (  data,thunkAPI) => {
  try {
    return await userService.userRole( )
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})
 
// Get All Leave 
// export const getCreateLeave = createAsyncThunk('leave/getCreateLeave', async ( data,thunkAPI) => {
//   try {
//     return await leaveService.getCreateLeave( )
//   } catch (error: any) {
//     const message = (error.response && 
//       error.response.data && 
//       error.response.data.message) ||
//       error.message ||error.toString()   
    
//     return thunkAPI.rejectWithValue(message)
//   }
// })
 

 
 

export const userSlice = createSlice({
  name: 'user',
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
      .addCase(userRole.pending, (state) => {
        state.isLoading = true
        
      })
      .addCase(userRole.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload 
      })
      .addCase(userRole.rejected, (state:any, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = [] 
      })
      // .addCase(getCreateLeave.pending, (state) => {
      //   state.isLoadingall = true
        
      // })
      // .addCase(getCreateLeave.fulfilled, (state, action) => {
      //   state.isLoadingall = false
      //   state.isSuccessall = true
      //   state.dataall = action.payload 
      // })
      // .addCase(getCreateLeave.rejected, (state:any, action) => {
      //   state.isLoadingall = false
      //   state.isErrorall = true
      //   state.messageall = action.payload
      //   state.dataall = [] 
      // })
     
      
  },
})

export const { reset } = userSlice.actions
export default userSlice.reducer