import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import projectService from './projectService'
 
 

const initialState = {

  data:    [],
  isError: false,
  isSuccess: false,
  isLoading: false, 
  message: '', 

  viewdata:    [],
  viewisError: false,
  viewisSuccess: false,
  viewisLoading: false, 
  viewmessage: '', 

  createdata:    [],
  createisError: false,
  createisSuccess: false,
  createisLoading: false, 
  createmessage: '', 

  updatedata:    [],
  updateisError: false,
  updateisSuccess: false,
  updateisLoading: false, 
  updatemessage: '', 

  commencedata:    [],
  commenceisError: false,
  commenceisSuccess: false,
  commenceisLoading: false, 
  commencemessage: '', 

  completedata:    [],
  completeisError: false,
  completeisSuccess: false,
  completeisLoading: false, 
  completemessage: '', 

  suspenddata:    [],
  suspendisError: false,
  suspendisSuccess: false,
  suspendisLoading: false, 
  suspendmessage: '', 
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
// View Project
export const viewProject = createAsyncThunk('project/viewProject', async (data,thunkAPI) => {
  try {
    return await projectService.viewProject(data)
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
 
export const updateProject = createAsyncThunk('project/updateProject', async (data,thunkAPI) => {
  try {
    return await projectService.updateProject(data)
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})
export const commenceProject = createAsyncThunk('project/commenceProject', async (data,thunkAPI) => {
  try {
    return await projectService.commenceProject(data)
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})
export const completeProject = createAsyncThunk('project/completeProject', async (data,thunkAPI) => {
  try {
    return await projectService.completeProject(data)
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})
 
export const suspendProject = createAsyncThunk('project/suspendProject', async (data,thunkAPI) => {
  try {
    return await projectService.suspendProject(data)
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

      state.viewisLoading = false
      state.viewisSuccess = false
      state.viewisError = false
      state.viewmessage = '' 

      state.createisLoading = false
      state.createisSuccess = false
      state.createisError = false
      state.createmessage = '' 

      state.updateisLoading = false
      state.updateisSuccess = false
      state.updateisError = false
      state.updatemessage = '' 

      state.commenceisLoading = false
      state.commenceisSuccess = false
      state.commenceisError = false
      state.commencemessage = '' 

      state.completeisLoading = false
      state.completeisSuccess = false
      state.completeisError = false
      state.completemessage = '' 

      state.suspendisLoading = false
      state.suspendisSuccess = false
      state.suspendisError = false
      state.suspendmessage = '' 
      
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

      .addCase(viewProject.pending, (state) => {
        state.viewisLoading = true 
      })
      .addCase(viewProject.fulfilled, (state, action) => {
        state.viewisLoading = false
        state.viewisSuccess = true
        state.viewdata = action.payload.data 
      })
      .addCase(viewProject.rejected, (state:any, action) => {
        state.viewisLoading = false
        state.viewisError = true
        state.viewmessage = action.payload
        state.viewdata = '' 
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

      .addCase(updateProject.pending, (state) => {
        state.updateisLoading = true 
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.updateisLoading = false
        state.updateisSuccess = true
        state.updatedata = action.payload.data 
      })
      .addCase(updateProject.rejected, (state:any, action) => {
        state.updateisLoading = false
        state.updateisError = true
        state.updatemessage = action.payload
        state.updatedata = '' 
      })

      .addCase(commenceProject.pending, (state) => {
        state.commenceisLoading = true 
      })
      .addCase(commenceProject.fulfilled, (state, action) => {
        state.commenceisLoading = false
        state.commenceisSuccess = true
        state.commencedata = action.payload.data 
      })
      .addCase(commenceProject.rejected, (state:any, action) => {
        state.commenceisLoading = false
        state.commenceisError = true
        state.commencemessage = action.payload
        state.commencedata = '' 
      })
      
      .addCase(completeProject.pending, (state) => {
        state.completeisLoading = true 
      })
      .addCase(completeProject.fulfilled, (state, action) => {
        state.completeisLoading = false
        state.completeisSuccess = true
        state.completedata = action.payload.data 
      })
      .addCase(completeProject.rejected, (state:any, action) => {
        state.completeisLoading = false
        state.completeisError = true
        state.completemessage = action.payload
        state.completedata = '' 
      })

      .addCase(suspendProject.pending, (state) => {
        state.suspendisLoading = true 
      })
      .addCase(suspendProject.fulfilled, (state, action) => {
        state.suspendisLoading = false
        state.suspendisSuccess = true
        state.suspenddata = action.payload.data 
      })
      .addCase(suspendProject.rejected, (state:any, action) => {
        state.suspendisLoading = false
        state.suspendisError = true
        state.suspendmessage = action.payload
        state.suspenddata = '' 
      })
      
     
      
  },
})

export const { reset } = projectSlice.actions
export default projectSlice.reducer