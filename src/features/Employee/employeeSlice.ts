import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import employeeService from './employeeService'
 
 

 
const initialState = { 

  data:  [],
  isError: false,
  isSuccess: false,
  isLoading: false, 
  message: '', 

  uploaddata:  [],
  uploadisError: false,
  uploadisSuccess: false,
  uploadisLoading: false, 
  uploadmessage: '', 

  roledata:  [],
  roleisError: false,
  roleisSuccess: false,
  roleisLoading: false, 
  rolemessage: '', 

  userdata:  [],
  userisError: false,
  userisSuccess: false,
  userisLoading: false, 
  usermessage: '', 

  approvedata:  [],
  approveisError: false,
  approveisSuccess: false,
  approveisLoading: false, 
  approvemessage: '', 

  viewdata:  [],
  viewisError: false,
  viewisSuccess: false,
  viewisLoading: false, 
  viewmessage: '', 

  deleteEmpdata:  [],
  deleteEmpisError: false,
  deleteEmpisSuccess: false,
  deleteEmpisLoading: false, 
  deleteEmpmessage: '', 

  getroledata:  [],
  getroleisError: false,
  getroleisSuccess: false,
  getroleisLoading: false, 
  getrolemessage: '', 

  deleteroledata:  [],
  deleteroleisError: false,
  deleteroleisSuccess: false,
  deleteroleisLoading: false, 
  deleterolemessage: '', 

  createroledata:  [],
  createroleisError: false,
  createroleisSuccess: false,
  createroleisLoading: false, 
  createrolemessage: '', 
}
 

export const allEmployee = createAsyncThunk('employee/allEmployee', async (data,thunkAPI) => {
  try {
    return await employeeService.allEmployee(  )
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})

//   // @ts-ignore
// export const uploadEmployee = createAsyncThunk('employee/uploadEmployee', async (data,setProgress, thunkAPI) => {
//   try {
//     return await employeeService.uploadEmployee(data, setProgress)
    
//   } catch (error: any) { 
//     const message = (error.response && 
//       error.response.data && 
//       error.response.data.message) ||
//       error.message ||error.toString()  
//     return thunkAPI.rejectWithValue(message)
//   }
// })

export const createEmployeeRole = createAsyncThunk('employee/createEmployeeRole', async (data, thunkAPI) => {
  try {
    return await employeeService.createEmployeeRole(data)
    
  } catch (error: any) {  
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})

export const userEmployees = createAsyncThunk('employee/userEmployees', async (data, thunkAPI) => {
  try {
    return await employeeService.userEmployees(data)
    
  } catch (error: any) {  
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})

export const hrApproveEmployees = createAsyncThunk('employee/hrApproveEmployees', async (data, thunkAPI) => {
  try {
    return await employeeService.hrApproveEmployees(data)
    
  } catch (error: any) {   
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message || error.toString()   
    return thunkAPI.rejectWithValue(message)
  }
})

export const hrViewEmployees = createAsyncThunk('employee/hrViewEmployees', async (data, thunkAPI) => {
  try {
    return await employeeService.hrViewEmployees(data)
    
  } catch (error: any) {   
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message || error.toString()   
    return thunkAPI.rejectWithValue(message)
  }
})


export const deleteEmployees = createAsyncThunk('employee/deleteEmployees', async (data, thunkAPI) => {
  try {
    return await employeeService.deleteEmployees(data)
    
  } catch (error: any) {   
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message || error.toString()   
    return thunkAPI.rejectWithValue(message)
  }
})

export const getRole = createAsyncThunk('employee/getRole', async (data, thunkAPI) => {
  try {
    return await employeeService.getRole(data)
    
  } catch (error: any) {   
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message || error.toString()   
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteRole = createAsyncThunk('employee/deleteRole', async (data, thunkAPI) => {
  try {
    return await employeeService.deleteRole(data)
    
  } catch (error: any) {   
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message || error.toString()   
    return thunkAPI.rejectWithValue(message)
  }
})


 


export const authSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    reset: (state) => {  

      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = '' 
      
      state.uploadisLoading = false
      state.uploadisSuccess = false
      state.uploadisError = false
      state.uploadmessage = '' 

      state.roleisLoading = false
      state.roleisSuccess = false
      state.roleisError = false
      state.rolemessage = '' 

      state.userisLoading = false
      state.userisSuccess = false
      state.userisError = false
      state.usermessage = '' 

      state.approveisLoading = false
      state.approveisSuccess = false
      state.approveisError = false
      state.approvemessage = '' 

      state.viewisLoading = false
      state.viewisSuccess = false
      state.viewisError = false
      state.viewmessage = '' 

      state.deleteEmpisLoading = false
      state.deleteEmpisSuccess = false
      state.deleteEmpisError = false
      state.deleteEmpmessage = '' 

      state.getroleisLoading = false
      state.getroleisSuccess = false
      state.getroleisError = false
      state.getrolemessage = '' 

      state.deleteroleisLoading = false
      state.deleteroleisSuccess = false
      state.deleteroleisError = false
      state.deleterolemessage = '' 

      state.createroleisLoading = false
      state.createroleisSuccess = false
      state.createroleisError = false
      state.createrolemessage = '' 
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(allEmployee.pending, (state) => {
        state.isLoading = true 
      })
      .addCase(allEmployee.fulfilled, (state:any, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload?.data  
      })
      .addCase(allEmployee.rejected, (state:any, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload 
        state.data = '' 
      })

      // .addCase(uploadEmployee.pending, (state) => {
      //   state.uploadisLoading = true 
      // })
      // .addCase(uploadEmployee.fulfilled, (state:any, action) => {
      //   state.uploadisLoading = false
      //   state.uploadisSuccess = true
      //   state.uploaddata = action.payload   
      // })
      // .addCase(uploadEmployee.rejected, (state:any, action) => {
      //   state.uploadisLoading = false
      //   state.uploadisError = true
      //   state.uploadmessage = action.payload  
      //   state.uploaddata = '' 
      // })
       

      .addCase(userEmployees.pending, (state) => {
        state.userisLoading = true 
      })
      .addCase(userEmployees.fulfilled, (state:any, action) => {
        state.userisLoading = false
        state.userisSuccess = true
        state.userdata = action.payload?.data    
      })
      .addCase(userEmployees.rejected, (state:any, action) => {
        state.userisLoading = false
        state.userisError = true
        state.usermessage = action.payload   
        state.userdata = '' 
      })

      .addCase(hrApproveEmployees.pending, (state) => {
        state.approveisLoading = true 
      })
      .addCase(hrApproveEmployees.fulfilled, (state:any, action) => {
        state.approveisLoading = false
        state.approveisSuccess = true
        state.approvedata = action.payload    
      })
      .addCase(hrApproveEmployees.rejected, (state:any, action) => {
        state.approveisLoading = false
        state.approveisError = true
        state.approvemessage = action.payload    
        state.approvedata = '' 
      })

      .addCase(hrViewEmployees.pending, (state) => {
        state.viewisLoading = true 
      })
      .addCase(hrViewEmployees.fulfilled, (state:any, action) => {
        state.viewisLoading = false
        state.viewisSuccess = true
        state.viewdata = action.payload?.data    
      })
      .addCase(hrViewEmployees.rejected, (state:any, action) => {
        state.viewisLoading = false
        state.viewisError = true
        state.viewmessage = action.payload    
        state.viewdata = '' 
      })

      .addCase(deleteEmployees.pending, (state) => {
        state.deleteEmpisLoading = true 
      })
      .addCase(deleteEmployees.fulfilled, (state:any, action) => {
        state.deleteEmpisLoading = false
        state.deleteEmpisSuccess = true
        state.deleteEmpdata = action.payload?.data    
      })
      .addCase(deleteEmployees.rejected, (state:any, action) => {
        state.deleteEmpisLoading = false
        state.deleteEmpisError = true
        state.deleteEmpmessage = action.payload    
        state.deleteEmpdata = '' 
      })

      .addCase(getRole.pending, (state) => {
        state.getroleisLoading = true 
      })
      .addCase(getRole.fulfilled, (state:any, action) => {
        state.getroleisLoading = false
        state.getroleisSuccess = true
        state.getroledata = action.payload?.data    
      })
      .addCase(getRole.rejected, (state:any, action) => {
        state.getroleisLoading = false
        state.getroleisError = true
        state.getrolemessage = action.payload    
        state.getroledata = '' 
      })
       
      .addCase(deleteRole.pending, (state) => {
        state.deleteroleisLoading = true 
      })
      .addCase(deleteRole.fulfilled, (state:any, action) => {
        state.deleteroleisLoading = false
        state.deleteroleisSuccess = true
        state.deleteroledata = action.payload?.data    
      })
      .addCase(deleteRole.rejected, (state:any, action) => {
        state.deleteroleisLoading = false
        state.deleteroleisError = true
        state.deleterolemessage = action.payload    
        state.deleteroledata = '' 
      })
       
      .addCase(createEmployeeRole.pending, (state) => {
        state.createroleisLoading = true 
      })
      .addCase(createEmployeeRole.fulfilled, (state:any, action) => {
        state.createroleisLoading = false
        state.createroleisSuccess = true
        state.createroledata = action.payload    
      })
      .addCase(createEmployeeRole.rejected, (state:any, action) => {
        state.createroleisLoading = false
        state.createroleisError = true
        state.createrolemessage = action.payload    
        state.createroledata = '' 
      })
       
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer