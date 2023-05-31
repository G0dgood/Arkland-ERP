import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import todosService from '../Todos/todosService'
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

  deletedeta:  [],
  deleteisError: false,
  deleteisSuccess: false,
  deleteisLoading: false, 
  deletemessage: '', 

  // teamdata:  [],
  // teamisError: false,
  // teamisSuccess: false,
  // teamisLoading: false, 
  // teammessage: '', 

 
  
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

 
 
export const createHOD = createAsyncThunk('assessment/createHOD', async ( data,thunkAPI) => {
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
export const deleteHOD = createAsyncThunk('assessment/deleteHOD', async ( data,thunkAPI) => {
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
// // Team Assessment   
// export const teamAssessment = createAsyncThunk('assessment/teamAssessment', async ( data,thunkAPI) => {
//   try {
//     return await assessmentService.teamAssessment(data)
//   } catch (error: any) {
//     const message = (error.response && 
//       error.response.data && 
//       error.response.data.message) ||
//       error.message ||error.toString() 
    
//     return thunkAPI.rejectWithValue(message)
//   }
// })
 
 
 

 
 

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

      // state.teamisLoading = false
      // state.teamisSuccess = false
      // state.teamisError = false
      // state.teammessage = ''  
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

      // .addCase(teamAssessment.pending, (state) => {
      //   state.teamisLoading = true 
      // })
      // .addCase(teamAssessment.fulfilled, (state:any, action) => {
      //   state.teamisLoading = false
      //   state.teamisSuccess = true
      //   state.teamdata = action.payload.data 
      // })
      // .addCase(teamAssessment.rejected, (state:any, action) => {
      //   state.teamisLoading = false
      //   state.teamisError = true
      //   state.teammessage = action.payload
      //   state.teamdata = [] 
      // })

     
     
      
  },
})

export const { reset } = hodSlice.actions
export default hodSlice.reducer