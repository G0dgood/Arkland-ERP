import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
 
 
 
 

const initialState = {
 
 
  isLoading: false,  
}
  

 
 

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    reset: (state) => {  
      state.isLoading = false 
      
    },
    
  },
 
})

export const { reset } = NotificationSlice.actions
export default NotificationSlice.reducer