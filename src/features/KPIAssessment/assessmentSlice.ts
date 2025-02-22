import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import assessmentService from './assessmentService'
 



const initialState = {

  data:  [],
  isError: false,
  isSuccess: false,
  isLoading: false, 
  message: '', 

  viewdata:  [],
  viewisError: false,
  viewisSuccess: false,
  viewisLoading: false, 
  viewmessage: '', 

  createdata:  [],
  createisError: false,
  createisSuccess: false,
  createisLoading: false, 
  createmessage: '', 

  teamdata:  [],
  teamisError: false,
  teamisSuccess: false,
  teamisLoading: false, 
  teammessage: '', 

  hodreviewdata:  [],
  hodreviewisError: false,
  hodreviewisSuccess: false,
  hodreviewisLoading: false, 
  hodreviewmessage: '', 

  deletedata:  [],
  deleteisError: false,
  deleteisSuccess: false,
  deleteisLoading: false, 
  deletemessage: '', 
 
 allkpidata:  [],
 allkpiisError: false,
 allkpiisSuccess: false,
 allkpiisLoading: false, 
  allkpimessage: '', 
 
 editdata:  [],
 editisError: false,
 editisSuccess: false,
 editisLoading: false, 
 editmessage: '', 
 
}
 
 

// KPI Assessment 
export const getAssessment = createAsyncThunk('assessment/getAssessment', async ( data,thunkAPI) => {
  try {
    return await assessmentService.getAssessment(data)
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString() 
    
    return thunkAPI.rejectWithValue(message)
  }
})

 
// View KPI Assessment 
export const viewAssessment = createAsyncThunk('assessment/viewAssessment', async ( data,thunkAPI) => {
  try {
    return await assessmentService.viewAssessment(data)
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString() 
    
    return thunkAPI.rejectWithValue(message)
  }
})
 
// Create KPI Assessment 
export const createAssessment = createAsyncThunk('assessment/createAssessment', async ( data,thunkAPI) => {
  try {
    return await assessmentService.createAssessment(data)
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString() 
    
    return thunkAPI.rejectWithValue(message)
  }
})
// Team Assessment   
export const teamAssessment = createAsyncThunk('assessment/teamAssessment', async ( data,thunkAPI) => {
  try {
    return await assessmentService.teamAssessment(data)
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString() 
    
    return thunkAPI.rejectWithValue(message)
  }
})
 
// Hod Review Assessment      
//  @ts-ignore  
export const hodReviewAssessment = createAsyncThunk('assessment/hodReviewAssessment', async ( data:any ,thunkAPI) => {
  try {
    return await assessmentService.hodReviewAssessment(data )
  } catch (error: any) { 
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString() 
    
    return thunkAPI.rejectWithValue(message)
  }
})
// Hod Review Assessment      
//  @ts-ignore  
export const editAssessment = createAsyncThunk('assessment/editAssessment', async ( data:any ,thunkAPI) => {
  try {
    return await assessmentService.editAssessment(data )
  } catch (error: any) { 
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString() 
    
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteAssessment = createAsyncThunk('assessment/deleteAssessment', async ( data:any,thunkAPI) => {
  try {
    return await assessmentService.deleteAssessment(data )
  } catch (error: any) { 
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString() 
    
    return thunkAPI.rejectWithValue(message)
  }
})
 
export const allAssessment = createAsyncThunk('assessment/allAssessment', async ( data:any,thunkAPI) => {
  try {
    return await assessmentService.allAssessment(  )
  } catch (error: any) { 
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString() 
    
    return thunkAPI.rejectWithValue(message)
  }
})
 
 
 

export const assessmentSlice:any = createSlice({
  name: 'assessment',
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

      state.teamisLoading = false
      state.teamisSuccess = false
      state.teamisError = false
      state.teammessage = ''  

      state.hodreviewisLoading = false
      state.hodreviewisSuccess = false
      state.hodreviewisError = false
      state.hodreviewmessage = ''  

      state.deleteisLoading = false
      state.deleteisSuccess = false
      state.deleteisError = false
      state.deletemessage = ''  

      state.allkpiisLoading = false
      state.allkpiisSuccess = false
      state.allkpiisError = false
      state.allkpimessage = ''  

      state.editisLoading = false
      state.editisSuccess = false
      state.editisError = false
      state.editmessage = ''  
    },
    
  },
  extraReducers: (builder) => {
    builder 
      .addCase(getAssessment.pending, (state) => {
        state.isLoading = true 
      })
      .addCase(getAssessment.fulfilled, (state:any, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload?.data
      })
      .addCase(getAssessment.rejected, (state:any, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = [] 
      })


      .addCase(viewAssessment.pending, (state) => {
        state.viewisLoading = true 
      })
      .addCase(viewAssessment.fulfilled, (state:any, action) => {
        state.viewisLoading = false
        state.viewisSuccess = true
        state.viewdata = action.payload?.data
      })
      .addCase(viewAssessment.rejected, (state:any, action) => {
        state.viewisLoading = false
        state.viewisError = true
        state.viewmessage = action.payload
        state.viewdata = [] 
      })

      .addCase(createAssessment.pending, (state) => {
        state.createisLoading = true 
      })
      .addCase(createAssessment.fulfilled, (state:any, action) => {
        state.createisLoading = false
        state.createisSuccess = true
        state.createdata = action.payload?.data 
      })
      .addCase(createAssessment.rejected, (state:any, action) => {
        state.createisLoading = false
        state.createisError = true
        state.createmessage = action.payload
        state.createdata = [] 
      })

      .addCase(teamAssessment.pending, (state) => {
        state.teamisLoading = true 
      })
      .addCase(teamAssessment.fulfilled, (state:any, action) => {
        state.teamisLoading = false
        state.teamisSuccess = true
        state.teamdata = action.payload?.data  
      })
      .addCase(teamAssessment.rejected, (state:any, action) => {
        state.teamisLoading = false
        state.teamisError = true
        state.teammessage = action.payload
        state.teamdata = [] 
      })

      .addCase(hodReviewAssessment.pending, (state) => {
        state.hodreviewisLoading = true 
      })
      .addCase(hodReviewAssessment.fulfilled, (state:any, action) => {
        state.hodreviewisLoading = false
        state.hodreviewisSuccess = true
        state.hodreviewdata = action.payload  
      })
      .addCase(hodReviewAssessment.rejected, (state:any, action) => {
        state.hodreviewisLoading = false
        state.hodreviewisError = true
        state.hodreviewmessage = action.payload
        state.hodreviewdata = [] 
      })

      .addCase(deleteAssessment.pending, (state) => {
        state.deleteisLoading = true 
      })
      .addCase(deleteAssessment.fulfilled, (state:any, action) => {
        state.deleteisLoading = false
        state.deleteisSuccess = true
        state.deletedata = action.payload  
      })
      .addCase(deleteAssessment.rejected, (state:any, action) => {
        state.deleteisLoading = false
        state.deleteisError = true
        state.deletemessage = action.payload
        state.deletedata = [] 
      })

      .addCase(allAssessment.pending, (state) => {
        state.allkpiisLoading = true 
      })
      .addCase(allAssessment.fulfilled, (state:any, action) => {
        state.allkpiisLoading = false
        state.allkpiisSuccess = true
        state.allkpidata = action.payload  
      })
      .addCase(allAssessment.rejected, (state:any, action) => {
        state.allkpiisLoading = false
        state.allkpiisError = true
        state.allkpimessage = action.payload
        state.allkpidata = [] 
      })


      .addCase(editAssessment.pending, (state) => {
        state.editisLoading = true 
      })
      .addCase(editAssessment.fulfilled, (state:any, action) => {
        state.editisLoading = false
        state.editisSuccess = true
        state.editdata = action.payload  
      })
      .addCase(editAssessment.rejected, (state:any, action) => {
        state.editisLoading = false
        state.editisError = true
        state.editmessage = action.payload
        state.editdata = [] 
      })

     
     
      
  },
})

export const { reset } = assessmentSlice.actions
export default assessmentSlice.reducer