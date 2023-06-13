import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import hodService from './hodService'
 
 



const initialState = {

  data:  [],
  isError: false,
  isSuccess: false,
  isLoading: false, 
  message: '', 

  createdata:  [],
  createisError: false,
  createisSuccess: false,
  createisLoading: false, 
  createmessage: '', 

  viewdata:  [],
  viewisError: false,
  viewisSuccess: false,
  viewisLoading: false, 
  viewmessage: '', 

  deletedeta:  [],
  deleteisError: false,
  deleteisSuccess: false,
  deleteisLoading: false, 
  deletemessage: '', 
 
  
}
 
 

// Get HOD 
export const getHOD= createAsyncThunk('hod/getHOD', async ( data,thunkAPI) => {
  try {
    return await hodService.getHOD(data)
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    
    return thunkAPI.rejectWithValue(message)
  }
})

 
 
export const createHOD = createAsyncThunk('hod/createHOD', async ( data,thunkAPI) => {
  try {
    return await hodService.createHOD(data)
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString() 
    
    return thunkAPI.rejectWithValue(message)
  }
})
 
// Delete  HOD
export const deleteHOD = createAsyncThunk('hod/deleteHOD', async ( data,thunkAPI) => {
  try {
    return await hodService.deleteHOD(data)
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString() 
    
    return thunkAPI.rejectWithValue(message)
  }
})

// View HOD  
export const viewHOD = createAsyncThunk('hod/viewHOD', async ( data,thunkAPI) => {
  try {
    return await hodService.viewHOD(data)
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString() 
    
    return thunkAPI.rejectWithValue(message)
  }
})
 
 
 

 
 

export const hodSlice = createSlice({
  name: 'hod',
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

      state.deleteisLoading = false
      state.deleteisSuccess = false
      state.deleteisError = false
      state.deletemessage = ''  

      state.viewisLoading = false
      state.viewisSuccess = false
      state.viewisError = false
      state.viewmessage = ''  
    },
    
  },
  extraReducers: (builder) => {
    builder 
      .addCase(getHOD.pending, (state) => {
        state.isLoading = true 
      })
      .addCase(getHOD.fulfilled, (state:any, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload.data 
      })
      .addCase(getHOD.rejected, (state:any, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = [] 
      })


      .addCase(createHOD.pending, (state) => {
        state.createisLoading = true 
      })
      .addCase(createHOD.fulfilled, (state:any, action) => {
        state.createisLoading = false
        state.createisSuccess = true
        state.createdata = action.payload.data 
      })
      .addCase(createHOD.rejected, (state:any, action) => {
        state.createisLoading = false
        state.createisError = true
        state.createmessage = action.payload
        state.createdata = [] 
      })

      .addCase(deleteHOD.pending, (state) => {
        state.deleteisLoading = true 
      })
      .addCase(deleteHOD.fulfilled, (state:any, action) => {
        state.deleteisLoading = false
        state.deleteisSuccess = true
        state.deletedata = action.payload.data 
      })
      .addCase(deleteHOD.rejected, (state:any, action) => {
        state.deleteisLoading = false
        state.deleteisError = true
        state.deletemessage = action.payload
        state.deletedata = [] 
      })

      .addCase(viewHOD.pending, (state) => {
        state.viewisLoading = true 
      })
      .addCase(viewHOD.fulfilled, (state:any, action) => {
        state.viewisLoading = false
        state.viewisSuccess = true
        state.viewdata = action.payload.data 
      })
      .addCase(viewHOD.rejected, (state:any, action) => {
        state.viewisLoading = false
        state.viewisError = true
        state.viewmessage = action.payload
        state.viewdata = [] 
      })

      
      
  },
})

export const { reset } = hodSlice.actions
export default hodSlice.reducer