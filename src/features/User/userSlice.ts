import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import userService from './userService'
 



const initialState = {

  data:   [],
  isError: false,
  isSuccess: false,
  isLoading: false, 
  message: '', 
  
  dataall:   [],
  isErrorall: false,
  isSuccessall: false,
  isLoadingall: false, 
  messageall: '', 

  privilegesdata:   [],
  privilegesisError: false,
  privilegesisSuccess: false,
  privilegesisLoading: false, 
  privilegesmessage: '', 

  deletedata:   [],
  deleteisError: false,
  deleteisSuccess: false,
  deleteisLoading: false, 
  deletemessage: '', 
  
  createdata:   [],
  createisError: false,
  createisSuccess: false,
  createisLoading: false, 
  createmessage: '', 
  
  forgetdata:   [],
  forgetisError: false,
  forgetisSuccess: false,
  forgetisLoading: false, 
  forgetmessage: '', 

  updatedata:   [],
  updateisError: false,
  updateisSuccess: false,
  updateisLoading: false, 
  updatemessage: '', 

  resetdata:   [],
  resetisError: false,
  resetisSuccess: false,
  resetisLoading: false, 
  resetmessage: '', 
  
}
 
 

// User Role 
export const userRole = createAsyncThunk('user/userRole', async (  data,thunkAPI) => {
  try {
    return await userService.userRole()
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
    return await userService.userprivileges()
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
 
// create privileges
export const createprivileges = createAsyncThunk('user/createprivileges', async ( data,thunkAPI) => {
  try {
    return await userService.createprivileges(data )
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()   
    
    return thunkAPI.rejectWithValue(message)
  }
})
 
// Forget Password
export const forgetPassword = createAsyncThunk('user/forgetPassword', async ( data,thunkAPI) => {
  try {
    return await userService.forgetPassword(data )
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()   
    
    return thunkAPI.rejectWithValue(message)
  }
})
 
// Update Password
export const updatePassword = createAsyncThunk('user/updatePassword', async ( data,thunkAPI) => {
  try {
    return await userService.updatePassword(data )
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()   
    
    return thunkAPI.rejectWithValue(message)
  }
})
 
// Reset Password
export const resetPassword = createAsyncThunk('user/resetPassword', async ( data,thunkAPI) => {
  try {
    return await userService.resetPassword(data )
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

      state.createisLoading = false
      state.createisSuccess = false
      state.createisError = false
      state.createmessage = '' 

      state.forgetisLoading = false
      state.forgetisSuccess = false
      state.forgetisError = false
      state.forgetmessage = '' 

      state.updateisLoading = false
      state.updateisSuccess = false
      state.updateisError = false
      state.updatemessage = '' 

      state.resetisLoading = false
      state.resetisSuccess = false
      state.resetisError = false
      state.resetmessage = '' 
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
      .addCase(createprivileges.pending, (state) => {
        state.createisLoading = true 
      })
      .addCase(createprivileges.fulfilled, (state, action) => {
        state.createisLoading = false
        state.createisSuccess = true
        state.createdata = action.payload 
      })
      .addCase(createprivileges.rejected, (state:any, action) => {
        state.createisLoading = false
        state.createisError = true
        state.createmessage = action.payload
        state.createdata = [] 
      })
     
      .addCase(forgetPassword.pending, (state) => {
        state.forgetisLoading = true 
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.forgetisLoading = false
        state.forgetisSuccess = true
        state.forgetdata = action.payload 
      })
      .addCase(forgetPassword.rejected, (state:any, action) => {
        state.forgetisLoading = false
        state.forgetisError = true
        state.forgetmessage = action.payload
        state.forgetdata = [] 
      })

      .addCase(updatePassword.pending, (state) => {
        state.updateisLoading = true 
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.updateisLoading = false
        state.updateisSuccess = true
        state.updatedata = action.payload 
      })
      .addCase(updatePassword.rejected, (state:any, action) => {
        state.updateisLoading = false
        state.updateisError = true
        state.updatemessage = action.payload
        state.updatedata = [] 
      })
      .addCase(resetPassword.pending, (state) => {
        state.resetisLoading = true 
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetisLoading = false
        state.resetisSuccess = true
        state.resetdata = action.payload 
      })
      .addCase(resetPassword.rejected, (state:any, action) => {
        state.resetisLoading = false
        state.resetisError = true
        state.resetmessage = action.payload
        state.resetdata = [] 
      })
     
      
  },
})

export const { reset } = userSlice.actions
export default userSlice.reducer