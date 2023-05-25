import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'  


 

const initialState = { 
  user:   null,
  isError: false,
  isSuccess: false,
  isLoading: false, 
  message: '', 
}
 

// Login user
export const login = createAsyncThunk('auth/login', async (data,thunkAPI) => {
  try {
    return await authService.login(data )
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})


// logout
// export const logout = createAsyncThunk('auth/logout', async () => {
//   authService.logout()
// })



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {  

      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = '' 
    },
    

    // logoutUser: state => {
    //   AsyncStorage.removeItem('user')
    //   state.user = null
    // }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
        
      })
      .addCase(login.fulfilled, (state:any, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload.data 
      })
      .addCase(login.rejected, (state:any, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null 
      })
      
  },
})

export const { reset  } = authSlice.actions
export default authSlice.reducer