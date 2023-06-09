import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import NotificationService from './NotificationService'
 
 
 

const initialState = {

  data:    [],
  isError: false,
  isSuccess: false,
  isLoading: false, 
  message: '', 


  
}
  

// Notifications
export const allNotifications = createAsyncThunk('notification/allNotifications', async (data,thunkAPI) => {
  try {
    return await NotificationService.allNotifications(data)
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})
 
 

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    reset: (state) => {  
      // state.isLoading = false
      // state.isSuccess = false
      // state.isError = false
      // state.message = '' 
      
    },
    
  },
  extraReducers: (builder) => {
    builder 
      .addCase(allNotifications.pending, (state) => {
        state.isLoading = true
        
      })
      .addCase(allNotifications.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload.data   
      })
      .addCase(allNotifications.rejected, (state:any, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = '' 
      })
      
     
      
  },
})

export const { reset } = NotificationSlice.actions
export default NotificationSlice.reducer