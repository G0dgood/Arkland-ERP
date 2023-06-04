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

  privilegesdata:   [],
  privilegesisError: false,
  privilegesisSuccess: false,
  privilegesisLoading: false, 
  privilegesmessage: '',
  privilegeserror: '',

  deletedata:   [],
  deleteisError: false,
  deleteisSuccess: false,
  deleteisLoading: false, 
  deletemessage: '',
  deleteerror: '',
  
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
 
// User privileges
export const userprivileges = createAsyncThunk('user/userprivileges', async ( data,thunkAPI) => {
  try {
    return await userService.userprivileges( )
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()   
    
    return thunkAPI.rejectWithValue(message)
  }
})

// Delete privileges
export const deleteprivileges = createAsyncThunk('user/deleteprivileges', async ( data,thunkAPI) => {
  try {
    return await userService.deleteprivileges(data )
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()   
    
    return thunkAPI.rejectWithValue(message)
  }
})
 

 
 

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {  
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = '' 

      state.privilegesisLoading = false
      state.privilegesisSuccess = false
      state.privilegesisError = false
      state.privilegesmessage = '' 

      state.deleteisLoading = false
      state.deleteisSuccess = false
      state.deleteisError = false
      state.deletemessage = '' 
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

      .addCase(userprivileges.pending, (state) => {
        state.privilegesisLoading = true 
      })
      .addCase(userprivileges.fulfilled, (state, action) => {
        state.privilegesisLoading = false
        state.privilegesisSuccess = true
        state.privilegesdata = action.payload 
      })
      .addCase(userprivileges.rejected, (state:any, action) => {
        state.privilegesisLoading = false
        state.privilegesisError = true
        state.privilegesmessage = action.payload
        state.privilegesdata = [] 
      })

      .addCase(deleteprivileges.pending, (state) => {
        state.deleteisLoading = true 
      })
      .addCase(deleteprivileges.fulfilled, (state, action) => {
        state.deleteisLoading = false
        state.deleteisSuccess = true
        state.deletedata = action.payload 
      })
      .addCase(deleteprivileges.rejected, (state:any, action) => {
        state.deleteisLoading = false
        state.deleteisError = true
        state.deletemessage = action.payload
        state.deletedata = [] 
      })
     
      
  },
})

export const { reset } = userSlice.actions
export default userSlice.reducer