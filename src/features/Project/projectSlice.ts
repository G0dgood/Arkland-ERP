import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import projectService from './projectService'
 
 

const initialState = {

  data:    [],
  isError: false,
  isSuccess: false,
  isLoading: false, 
  message: '', 

  createdata:    [],
  createisError: false,
  createisSuccess: false,
  createisLoading: false, 
  createmessage: '', 
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
 
export const createProject = createAsyncThunk('project/createProject', async (data,thunkAPI) => {
  try {
    return await projectService.createProject(data)
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

      state.createisLoading = false
      state.createisSuccess = false
      state.createisError = false
      state.createmessage = '' 
      
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
        state.data = action.payload.data 
      })
      .addCase(allProject.rejected, (state:any, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = '' 
      })

      .addCase(createProject.pending, (state) => {
        state.createisLoading = true
        
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.createisLoading = false
        state.createisSuccess = true
        state.createdata = action.payload.data 
      })
      .addCase(createProject.rejected, (state:any, action) => {
        state.createisLoading = false
        state.createisError = true
        state.createmessage = action.payload
        state.createdata = '' 
      })
      
     
      
  },
})

export const { reset } = projectSlice.actions
export default projectSlice.reducer