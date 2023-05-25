import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import projectService from './projectService'
 
 

const initialState = {

  data:    [],
  isError: false,
  isSuccess: false,
  isLoading: false, 
  message: '', 
}
  

// Project
export const allProject = createAsyncThunk('project/allProject', async (data,thunkAPI) => {
  try {
    return await projectService.allProject()
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})
 
 

export const projectSlice = createSlice({
  name: 'project',
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
      .addCase(allProject.pending, (state) => {
        state.isLoading = true
        
      })
      .addCase(allProject.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload.data.data  
      })
      .addCase(allProject.rejected, (state:any, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = '' 
      })
      
     
      
  },
})

export const { reset } = projectSlice.actions
export default projectSlice.reducer