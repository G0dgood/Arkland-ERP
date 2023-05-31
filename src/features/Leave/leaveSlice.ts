import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import leaveService from './leaveService'



const initialState = {

  data:    '',
  isError: false,
  isSuccess: false,
  isLoading: false, 
  message: '',
  error: '',

  allLeavedata:   [],
  allLeaveisError: false,
  allLeaveisSuccess: false,
  allLeaveisLoading: false, 
  allLeavemessage: '',
  allLeaveerror: '',

  teamdata:   [],
  teamisError: false,
  teamisSuccess: false,
  teamisLoading: false, 
  teammessage: '',
  teamerror: '',

  teamviewdata:   [],
  teamviewisError: false,
  teamviewisSuccess: false,
  teamviewisLoading: false, 
  teamviewmessage: '',
  teamviewerror: '',
  
}
 
 

// Leave 
export const createLeave = createAsyncThunk('leave/createLeave', async ( data,thunkAPI) => {
  try {
    return await leaveService.createLeave(data)
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()   
    
    return thunkAPI.rejectWithValue(message)
  }
})
 
// Get My Leave 
export const getCreateLeave:any = createAsyncThunk('leave/getCreateLeave', async(data:any, thunkAPI) => {
  try {
    return await leaveService.getCreateLeave(data)
  } catch (error: any) { 
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()   
    
    return thunkAPI.rejectWithValue(message)
  }
})
 
// Get TEAM Leave
export const getTeamLeave:any = createAsyncThunk('leave/getTeamLeave', async(data:any, thunkAPI) => {
  try {
    return await leaveService.getTeamLeave(data)
  } catch (error: any) { 
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()   
    
    return thunkAPI.rejectWithValue(message)
  }
})
//  Hod View Leave
export const viewTeamLeave:any = createAsyncThunk('leave/viewTeamLeave', async(data:any, thunkAPI) => {
  try {
    return await leaveService.viewTeamLeave(data)
  } catch (error: any) { 
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()   
    
    return thunkAPI.rejectWithValue(message)
  }
})
 

 
 

export const leaveSlice = createSlice({
  name: 'leave',
  initialState,
  reducers: {
    reset: (state) => {  
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = '' 

      state.allLeaveisLoading = false
      state.allLeaveisSuccess = false
      state.allLeaveisError = false
      state.allLeavemessage = '' 

      state.teamisLoading = false
      state.teamisSuccess = false
      state.teamisError = false
      state.teammessage = '' 

      state.teamviewisLoading = false
      state.teamviewisSuccess = false
      state.teamviewisError = false
      state.teamviewmessage = '' 
    },
    
  },
  extraReducers: (builder) => {
    builder 
      .addCase(createLeave.pending, (state) => {
        state.isLoading = true 
      })
      .addCase(createLeave.fulfilled, (state:any, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload 
      })
      .addCase(createLeave.rejected, (state:any, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = [] 
      })

      // GET LEAVE APPLICATIONS
      .addCase(getCreateLeave.pending, (state) => {
        state.allLeaveisLoading= true
        
      })
      .addCase(getCreateLeave.fulfilled, (state, action) => {
        state.allLeaveisLoading= false
        state.allLeaveisSuccess= true
        state.allLeavedata= action.payload?.data
      })
      .addCase(getCreateLeave.rejected, (state:any, action) => {
        state.allLeaveisLoading= false
        state.allLeaveisError= true
        state.allLeavemessage= action.payload
        state.allLeavedata= [] 
      })
     
      // GET TEAM LEAVE  
      .addCase(getTeamLeave.pending, (state) => {
        state.teamisLoading= true
        
      })
      .addCase(getTeamLeave.fulfilled, (state, action) => {
        state.teamisLoading= false
        state.teamisSuccess= true
        state.teamdata= action.payload?.data
      })
      .addCase(getTeamLeave.rejected, (state:any, action) => {
        state.teamisLoading= false
        state.teamisError= true
        state.teammessage= action.payload
        state.teamdata= [] 
      })

      // VIEW HOD LEAVE  
      .addCase(viewTeamLeave.pending, (state) => {
        state.teamviewisLoading= true
        
      })
      .addCase(viewTeamLeave.fulfilled, (state, action) => {
        state.teamviewisLoading= false
        state.teamviewisSuccess= true
        state.teamviewdata= action.payload?.data
      })
      .addCase(viewTeamLeave.rejected, (state:any, action) => {
        state.teamviewisLoading= false
        state.teamviewisError= true
        state.teamviewmessage= action.payload
        state.teamviewdata= [] 
      })
     
      
  },
})

export const { reset } = leaveSlice.actions
export default leaveSlice.reducer