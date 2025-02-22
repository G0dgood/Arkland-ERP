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

  viewroledata:  [],
  viewroleisError: false,
  viewroleisSuccess: false,
  viewroleisLoading: false, 
  viewrolemessage: '', 

  editroledata:  [],
  editroleisError: false,
  editroleisSuccess: false,
  editroleisLoading: false, 
  editrolemessage: '', 

  terminationsdata:  [],
  terminationsisError: false,
  terminationsisSuccess: false,
  terminationsisLoading: false, 
  terminationsmessage: '', 

  viewterminationsdata:  [],
  viewterminationsisError: false,
  viewterminationsisSuccess: false,
  viewterminationsisLoading: false, 
  viewterminationsmessage: '',
  
  approveterminationsdata:  [],
  approveterminationsisError: false,
  approveterminationsisSuccess: false,
  approveterminationsisLoading: false, 
  approveterminationsmessage: '', 

  rejectterminationsdata:  [],
  rejectterminationsisError: false,
  rejectterminationsisSuccess: false,
  rejectterminationsisLoading: false, 
  rejectterminationsmessage: '', 

  warningdata:  [],
  warningisError: false,
  warningisSuccess: false,
  warningisLoading: false, 
  warningmessage: '', 

  viewwarningdata:  [],
  viewwarningisError: false,
  viewwarningisSuccess: false,
  viewwarningisLoading: false, 
  viewwarningmessage: '', 

  createwarningdata:  [],
  createwarningisError: false,
  createwarningisSuccess: false,
  createwarningisLoading: false, 
  createwarningmessage: '', 

  createemployeedata:  [],
  createemployeeisError: false,
  createemployeeisSuccess: false,
  createemployeeisLoading: false, 
  createemployeemessage: '', 

  updateemployeedata:  [],
  updateemployeeisError: false,
  updateemployeeisSuccess: false,
  updateemployeeisLoading: false, 
  updateemployeemessage: '', 
  
  viewPrevilagedata:  [],
  viewPrevilageisError: false,
  viewPrevilageisSuccess: false,
  viewPrevilageisLoading: false, 
  viewPrevilagemessage: '', 

  updateWarningdata:  [],
  updateWarningisError: false,
  updateWarningisSuccess: false,
  updateWarningisLoading: false, 
  updateWarningmessage: '', 


  deactivateWarningdata:  [],
  deactivateWarningisError: false,
  deactivateWarningisSuccess: false,
  deactivateWarningisLoading: false, 
  deactivateWarningmessage: '', 

  responsedata:  [],
  responseisError: false,
  responseisSuccess: false,
  responseisLoading: false, 
  responsemessage: '', 

  Terminationsdata:  [],
  TerminationsisError: false,
  TerminationsisSuccess: false,
  TerminationsisLoading: false, 
  Terminationsmessage: '', 

  teanTerminationsdata:  [],
  teanTerminationsisError: false,
  teanTerminationsisSuccess: false,
  teanTerminationsisLoading: false, 
  teanTerminationsmessage: '', 
}
 

export const allEmployee = createAsyncThunk('employee/allEmployee', async (data,thunkAPI) => {
  try {
    return await employeeService.allEmployee(data)
  } catch (error: any) {
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message ||error.toString()  
    return thunkAPI.rejectWithValue(message)
  }
})

 

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

export const viewRole = createAsyncThunk('employee/viewRole', async (data, thunkAPI) => {
  try {
    return await employeeService.viewRole(data)
    
  } catch (error: any) {   
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message || error.toString()   
    return thunkAPI.rejectWithValue(message)
  }
})
export const editRole = createAsyncThunk('employee/editRole', async (data, thunkAPI) => {
  try {
    return await employeeService.editRole(data)
    
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
export const getTerminations = createAsyncThunk('employee/getTerminations', async (data, thunkAPI) => {
  try {
    return await employeeService.getTerminations(data)
    
  } catch (error: any) {   
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message || error.toString()   
    return thunkAPI.rejectWithValue(message)
  }
})
export const viewTerminations = createAsyncThunk('employee/viewTerminations', async (data, thunkAPI) => {
  try {
    return await employeeService.viewTerminations(data)
    
  } catch (error: any) {   
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message || error.toString()   
    return thunkAPI.rejectWithValue(message)
  }
})
export const approveTerminations = createAsyncThunk('employee/approveTerminations', async (data, thunkAPI) => {
  try {
    return await employeeService.approveTerminations(data)
    
  } catch (error: any) {   
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message || error.toString()   
    return thunkAPI.rejectWithValue(message)
  }
})
export const rejectTerminations = createAsyncThunk('employee/rejectTerminations', async (data, thunkAPI) => {
  try {
    return await employeeService.rejectTerminations(data)
    
  } catch (error: any) {   
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message || error.toString()   
    return thunkAPI.rejectWithValue(message)
  }
})
export const getWarning = createAsyncThunk('employee/getWarning', async (data, thunkAPI) => {
  try {
    return await employeeService.getWarning(data)
    
  } catch (error: any) {   
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message || error.toString()   
    return thunkAPI.rejectWithValue(message)
  }
})
export const viewWarning = createAsyncThunk('employee/viewWarning', async (data, thunkAPI) => {
  try {
    return await employeeService.viewWarning(data)
    
  } catch (error: any) {   
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message || error.toString()   
    return thunkAPI.rejectWithValue(message)
  }
})
 // @ts-ignore
export const createWarning = createAsyncThunk('employee/createWarning', async (data,input, thunkAPI) => {
  try {
    return await employeeService.createWarning(data )
    
  } catch (error: any) {   
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message || error.toString()   
    return thunkAPI.rejectWithValue(message)
  }
})
 // @ts-ignore
export const createEmployee:any = createAsyncThunk('employee/createEmployee', async (data, thunkAPI) => {
  try {
     // @ts-ignore
    return await employeeService.createEmployee(data )
    
  } catch (error: any) {   
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message || error.toString()   
    return thunkAPI.rejectWithValue(message)
  }
})
 // @ts-ignore
export const updateEmployee:any = createAsyncThunk('employee/updateEmployee', async (data, thunkAPI) => {
  try {
     // @ts-ignore
    return await employeeService.updateEmployee(data )
    
  } catch (error: any) {   
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message || error.toString()   
    return thunkAPI.rejectWithValue(message)
  }
})

 
 // @ts-ignore
export const viewPrevilage:any = createAsyncThunk('employee/viewPrevilage', async (data, thunkAPI) => {
  try {
     // @ts-ignore
    return await employeeService.viewPrevilage(data )
    
  } catch (error: any) {   
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message || error.toString()   
    return thunkAPI.rejectWithValue(message)
  }
})
 // @ts-ignore
export const updateWarning:any = createAsyncThunk('employee/updateWarning', async (data, thunkAPI) => {
  try {
     // @ts-ignore
    return await employeeService.updateWarning(data )
    
  } catch (error: any) {   
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message || error.toString()   
    return thunkAPI.rejectWithValue(message)
  }
})
 // @ts-ignore
export const deactivateWarning:any = createAsyncThunk('employee/deactivateWarning', async (data, thunkAPI) => {
  try {
     // @ts-ignore
    return await employeeService.deactivateWarning(data )
    
  } catch (error: any) {   
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message || error.toString()   
    return thunkAPI.rejectWithValue(message)
  }
})
 
export const responseWarning:any = createAsyncThunk('employee/responseWarning', async (data, thunkAPI) => {
  try {
     // @ts-ignore
    return await employeeService.responseWarning(data )
    
  } catch (error: any) {   
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message || error.toString()   
    return thunkAPI.rejectWithValue(message)
  }
})
export const createTerminations:any = createAsyncThunk('employee/createTerminations', async (data, thunkAPI) => {
  try {
     // @ts-ignore
    return await employeeService.createTerminations(data )
    
  } catch (error: any) {   
    const message = (error.response && 
      error.response.data && 
      error.response.data.message) ||
      error.message || error.toString()   
    return thunkAPI.rejectWithValue(message)
  }
})
export const teanCreateTerminations:any = createAsyncThunk('employee/teanCreateTerminations', async (data, thunkAPI) => {
  try {
     // @ts-ignore
    return await employeeService.teanCreateTerminations(data )
    
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

      state.viewroleisLoading = false
      state.viewroleisSuccess = false
      state.viewroleisError = false
      state.viewrolemessage = '' 

      state.editroleisLoading = false
      state.editroleisSuccess = false
      state.editroleisError = false
      state.editrolemessage = '' 
      
      state.terminationsisLoading = false
      state.terminationsisSuccess = false
      state.terminationsisError = false
      state.terminationsmessage = '' 

      state.viewterminationsisLoading = false
      state.viewterminationsisSuccess = false
      state.viewterminationsisError = false
      state.viewterminationsmessage = '' 

      state.approveterminationsisLoading = false
      state.approveterminationsisSuccess = false
      state.approveterminationsisError = false
      state.approveterminationsmessage = '' 

      state.rejectterminationsisLoading = false
      state.rejectterminationsisSuccess = false
      state.rejectterminationsisError = false
      state.rejectterminationsmessage = '' 

      state.warningisLoading = false
      state.warningisSuccess = false
      state.warningisError = false
      state.warningmessage = '' 

      state.viewwarningisLoading = false
      state.viewwarningisSuccess = false
      state.viewwarningisError = false
      state.viewwarningmessage = '' 

      state.createwarningisLoading = false
      state.createwarningisSuccess = false
      state.createwarningisError = false
      state.createwarningmessage = '' 

      state.createemployeeisLoading = false
      state.createemployeeisSuccess = false
      state.createemployeeisError = false
      state.createemployeemessage = '' 

      state.updateemployeeisLoading = false
      state.updateemployeeisSuccess = false
      state.updateemployeeisError = false
      state.updateemployeemessage = '' 

      state.viewPrevilageisLoading = false
      state.viewPrevilageisSuccess = false
      state.viewPrevilageisError = false
      state.viewPrevilagemessage = '' 

      state.updateWarningisLoading = false
      state.updateWarningisSuccess = false
      state.updateWarningisError = false
      state.updateWarningmessage = '' 

      state.deactivateWarningisLoading = false
      state.deactivateWarningisSuccess = false
      state.deactivateWarningisError = false
      state.deactivateWarningmessage = '' 

      state.responseisLoading = false
      state.responseisSuccess = false
      state.responseisError = false
      state.responsemessage = '' 

      state.TerminationsisLoading = false
      state.TerminationsisSuccess = false
      state.TerminationsisError = false
      state.Terminationsmessage = '' 

      state.teanTerminationsisLoading = false
      state.teanTerminationsisSuccess = false
      state.teanTerminationsisError = false
      state.teanTerminationsmessage = '' 

      
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

        .addCase(createTerminations.pending, (state) => {
        state.TerminationsisLoading = true 
      })
      .addCase(createTerminations.fulfilled, (state:any, action) => {
        state.TerminationsisLoading = false
        state.TerminationsisSuccess = true
        state.Terminationsdata = action.payload?.data  
      })
      .addCase(createTerminations.rejected, (state:any, action) => {
        state.TerminationsisLoading = false
        state.TerminationsisError = true
        state.Terminationsmessage = action.payload  
        state.Terminationsdata = '' 
      })
       
        .addCase(teanCreateTerminations.pending, (state) => {
        state.teanTerminationsisLoading = true 
      })
      .addCase(teanCreateTerminations.fulfilled, (state:any, action) => {
        state.teanTerminationsisLoading = false
        state.teanTerminationsisSuccess = true
        state.teanTerminationsdata = action.payload?.data  
      })
      .addCase(teanCreateTerminations.rejected, (state:any, action) => {
        state.teanTerminationsisLoading = false
        state.teanTerminationsisError = true
        state.teanTerminationsmessage = action.payload  
        state.teanTerminationsdata = '' 
      })
       
       

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

      .addCase(viewRole.pending, (state) => {
        state.viewroleisLoading = true 
      })
      .addCase(viewRole.fulfilled, (state:any, action) => {
        state.viewroleisLoading = false
        state.viewroleisSuccess = true
        state.viewroledata = action.payload?.data    
      })
      .addCase(viewRole.rejected, (state:any, action) => {
        state.viewroleisLoading = false
        state.viewroleisError = true
        state.viewrolemessage = action.payload    
        state.viewroledata = '' 
      })

      .addCase(editRole.pending, (state) => {
        state.editroleisLoading = true 
      })
      .addCase(editRole.fulfilled, (state:any, action) => {
        state.editroleisLoading = false
        state.editroleisSuccess = true
        state.editroledata = action.payload?.data    
      })
      .addCase(editRole.rejected, (state:any, action) => {
        state.editroleisLoading = false
        state.editroleisError = true
        state.editrolemessage = action.payload    
        state.editroledata = '' 
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

      .addCase(getTerminations.pending, (state) => {
        state.terminationsisLoading = true 
      })
      .addCase(getTerminations.fulfilled, (state:any, action) => {
        state.terminationsisLoading = false
        state.terminationsisSuccess = true
        state.terminationsdata = action.payload    
      })
      .addCase(getTerminations.rejected, (state:any, action) => {
        state.terminationsisLoading = false
        state.terminationsisError = true
        state.terminationsmessage = action.payload    
        state.terminationsdata = '' 
      })

      .addCase(viewTerminations.pending, (state) => {
        state.viewterminationsisLoading = true 
      })
      .addCase(viewTerminations.fulfilled, (state:any, action) => {
        state.viewterminationsisLoading = false
        state.viewterminationsisSuccess = true
        state.viewterminationsdata = action.payload    
      })
      .addCase(viewTerminations.rejected, (state:any, action) => {
        state.viewterminationsisLoading = false
        state.viewterminationsisError = true
        state.viewterminationsmessage = action.payload    
        state.viewterminationsdata = '' 
      })

      .addCase(approveTerminations.pending, (state) => {
        state.approveterminationsisLoading = true 
      })
      .addCase(approveTerminations.fulfilled, (state:any, action) => {
        state.approveterminationsisLoading = false
        state.approveterminationsisSuccess = true
        state.approveterminationsdata = action.payload    
      })
      .addCase(approveTerminations.rejected, (state:any, action) => {
        state.approveterminationsisLoading = false
        state.approveterminationsisError = true
        state.approveterminationsmessage = action.payload    
        state.approveterminationsdata = '' 
      })

      .addCase(rejectTerminations.pending, (state) => {
        state.rejectterminationsisLoading = true 
      })
      .addCase(rejectTerminations.fulfilled, (state:any, action) => {
        state.rejectterminationsisLoading = false
        state.rejectterminationsisSuccess = true
        state.rejectterminationsdata = action.payload    
      })
      .addCase(rejectTerminations.rejected, (state:any, action) => {
        state.rejectterminationsisLoading = false
        state.rejectterminationsisError = true
        state.rejectterminationsmessage = action.payload    
        state.rejectterminationsdata = '' 
      })

      .addCase(getWarning.pending, (state) => {
        state.warningisLoading = true 
      })
      .addCase(getWarning.fulfilled, (state:any, action) => {
        state.warningisLoading = false
        state.warningisSuccess = true
        state.warningdata = action.payload     
      })
      .addCase(getWarning.rejected, (state:any, action) => {
        state.warningisLoading = false
        state.warningisError = true
        state.warningmessage = action.payload    
        state.warningdata = '' 
      })

      .addCase(viewWarning.pending, (state) => {
        state.viewwarningisLoading = true 
      })
      .addCase(viewWarning.fulfilled, (state:any, action) => {
        state.viewwarningisLoading = false
        state.viewwarningisSuccess = true
        state.viewwarningdata = action.payload    
      })
      .addCase(viewWarning.rejected, (state:any, action) => {
        state.viewwarningisLoading = false
        state.viewwarningisError = true
        state.viewwarningmessage = action.payload    
        state.viewwarningdata = '' 
      })

      .addCase(createWarning.pending, (state) => {
        state.createwarningisLoading = true 
      })
      .addCase(createWarning.fulfilled, (state:any, action) => {
        state.createwarningisLoading = false
        state.createwarningisSuccess = true
        state.createwarningdata = action.payload    
      })
      .addCase(createWarning.rejected, (state:any, action) => {
        state.createwarningisLoading = false
        state.createwarningisError = true
        state.createwarningmessage = action.payload    
        state.createwarningdata = '' 
      })

      .addCase(createEmployee.pending, (state) => {
        state.createemployeeisLoading = true 
      })
      .addCase(createEmployee.fulfilled, (state:any, action) => {
        state.createemployeeisLoading = false
        state.createemployeeisSuccess = true
        state.createemployeedata = action.payload    
      })
      .addCase(createEmployee.rejected, (state:any, action) => {
        state.createemployeeisLoading = false
        state.createemployeeisError = true
        state.createemployeemessage = action.payload    
        state.createemployeedata = '' 
      })

      .addCase(updateEmployee.pending, (state) => {
        state.updateemployeeisLoading = true 
      })
      .addCase(updateEmployee.fulfilled, (state:any, action) => {
        state.updateemployeeisLoading = false
        state.updateemployeeisSuccess = true
        state.updateemployeedata = action.payload    
      })
      .addCase(updateEmployee.rejected, (state:any, action) => {
        state.updateemployeeisLoading = false
        state.updateemployeeisError = true
        state.updateemployeemessage = action.payload    
        state.updateemployeedata = '' 
      })

      .addCase(viewPrevilage.pending, (state) => {
        state.viewPrevilageisLoading = true 
      })
      .addCase(viewPrevilage.fulfilled, (state:any, action) => {
        state.viewPrevilageisLoading = false
        state.viewPrevilageisSuccess = true
        state.viewPrevilagedata = action.payload?.data     
      })
      .addCase(viewPrevilage.rejected, (state:any, action) => {
        state.viewPrevilageisLoading = false
        state.viewPrevilageisError = true
        state.viewPrevilagemessage = action.payload   
        state.viewPrevilagedata = '' 
      })

      .addCase(updateWarning.pending, (state) => {
        state.updateWarningisLoading = true 
      })
      .addCase(updateWarning.fulfilled, (state:any, action) => {
        state.updateWarningisLoading = false
        state.updateWarningisSuccess = true
        state.updateWarningdata = action.payload?.data     
      })
      .addCase(updateWarning.rejected, (state:any, action) => {
        state.updateWarningisLoading = false
        state.updateWarningisError = true
        state.updateWarningmessage = action.payload   
        state.updateWarningdata = '' 
      })
      .addCase(deactivateWarning.pending, (state) => {
        state.deactivateWarningisLoading = true 
      })
      .addCase(deactivateWarning.fulfilled, (state:any, action) => {
        state.deactivateWarningisLoading = false
        state.deactivateWarningisSuccess = true
        state.deactivateWarningdata = action.payload?.data     
      })
      .addCase(deactivateWarning.rejected, (state:any, action) => {
        state.deactivateWarningisLoading = false
        state.deactivateWarningisError = true
        state.deactivateWarningmessage = action.payload   
        state.deactivateWarningdata = '' 
      })
      .addCase(responseWarning.pending, (state) => {
        state.responseisLoading = true 
      })
      .addCase(responseWarning.fulfilled, (state:any, action) => {
        state.responseisLoading = false
        state.responseisSuccess = true
        state.responsedata = action.payload?.data     
      })
      .addCase(responseWarning.rejected, (state:any, action) => {
        state.responseisLoading = false
        state.responseisError = true
        state.responsemessage = action.payload   
        state.responsedata = '' 
      })
       
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer