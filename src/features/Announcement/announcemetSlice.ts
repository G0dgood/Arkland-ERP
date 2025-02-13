import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import announcementService from './announcementService'
 
 
  

const initialState = { 
  data:   [],
  isError: false,
  isSuccess: false,
  isLoading: false, 
  message: '', 

  viewdata:   [],
  viewisError: false,
  viewisSuccess: false,
  viewisLoading: false, 
  viewmessage: '', 

  createdata:   [],
  createisError: false,
  createisSuccess: false,
  createisLoading: false, 
  createmessage: '', 

  deletedata:   [],
  deleteisError: false,
  deleteisSuccess: false,
  deleteisLoading: false, 
  deletemessage: '', 

  medata:   [],
  meisError: false,
  meisSuccess: false,
  meisLoading: false, 
  memessage: '', 
}
 

// Get Announcement
export const getAnnouncement = createAsyncThunk('announcement/getAnnouncement', async (data,thunkAPI) => {
  try {
    return await announcementService.getAnnouncement(data)
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})

// View Announcement
export const viewAnnouncement = createAsyncThunk('announcement/viewAnnouncement', async (data,thunkAPI) => {
  try {
    return await announcementService.viewAnnouncement(data)
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})
// Craete Announcement
export const createAnnouncement = createAsyncThunk('announcement/createAnnouncement', async (data,thunkAPI) => {
  try {
    return await announcementService.createAnnouncement(data)
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})

// Delete Announcement
export const deleteAnnouncement = createAsyncThunk('announcement/deleteAnnouncement', async (data,thunkAPI) => {
  try {
    return await announcementService.deleteAnnouncement(data)
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})
// Delete Announcement
export const viewMeAnnouncement = createAsyncThunk('announcement/viewMeAnnouncement', async (data,thunkAPI) => {
  try {
    return await announcementService.viewMeAnnouncement(data)
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})


 


export const attendanceSlice = createSlice({
  name: 'announcement',
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

      state.deleteisLoading = false
      state.deleteisSuccess = false
      state.deleteisError = false
      state.deletemessage = '' 

      state.meisLoading = false
      state.meisSuccess = false
      state.meisError = false
      state.memessage = '' 

    }, 
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(getAnnouncement.pending, (state) => {
        state.isLoading = true
        
      })
      .addCase(getAnnouncement.fulfilled, (state:any, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload?.data 
      })
      .addCase(getAnnouncement.rejected, (state:any, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.data = null 
      })
      
      .addCase(viewAnnouncement.pending, (state) => {
        state.viewisLoading = true
        
      })
      .addCase(viewAnnouncement.fulfilled, (state:any, action) => {
        state.viewisLoading = false
        state.viewisSuccess = true
        state.viewdata = action.payload?.data 
      })
      .addCase(viewAnnouncement.rejected, (state:any, action) => {
        state.viewisLoading = false
        state.viewisError = true
        state.viewmessage = action.payload
        state.viewdata = null 
      })


      .addCase(createAnnouncement.pending, (state) => {
        state.createisLoading = true 
      })
      .addCase(createAnnouncement.fulfilled, (state:any, action) => {
        state.createisLoading = false
        state.createisSuccess = true
        state.createdata = action.payload 
      })
      .addCase(createAnnouncement.rejected, (state:any, action) => {
        state.createisLoading = false
        state.createisError = true
        state.createmessage = action.payload
        state.createdata = null 
      })
      
      .addCase(deleteAnnouncement.pending, (state) => {
        state.deleteisLoading = true 
      })
      .addCase(deleteAnnouncement.fulfilled, (state:any, action) => {
        state.deleteisLoading = false
        state.deleteisSuccess = true
        state.deletedata = action.payload 
      })
      .addCase(deleteAnnouncement.rejected, (state:any, action) => {
        state.deleteisLoading = false
        state.deleteisError = true
        state.deletemessage = action.payload 
        state.deletedata = null 
      })

      .addCase(viewMeAnnouncement.pending, (state) => {
        state.meisLoading = true 
      })
      .addCase(viewMeAnnouncement.fulfilled, (state:any, action) => {
        state.meisLoading = false
        state.meisSuccess = true
        state.medata = action.payload?.data 
      })
      .addCase(viewMeAnnouncement.rejected, (state:any, action) => {
        state.meisLoading = false
        state.meisError = true
        state.memessage = action.payload 
        state.medata = null 
      })
      
  },
})

export const { reset  } = attendanceSlice.actions
export default attendanceSlice.reducer