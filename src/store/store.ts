import { configureStore } from '@reduxjs/toolkit'  
import leaveSlice from '../features/Leave/leaveSlice'
import authSlice from '../features/Auth/authSlice' 
import userSlice from '../features/User/userSlice' 
import employeeSlice from '../features/Employee/employeeSlice'
import assessmentSlice from '../features/KPIAssessment/assessmentSlice'
import departmentSlice from '../features/Department/departmentSlice' 
import projectSlice from '../features/Project/projectSlice'
import NotificationSlice from '../features/Notification/NotificationSlice'
import WeeklyReportSlice from '../features/WeeklyReport/WeeklyReportSlice'
import hodSlice from '../features/HOD/hodSlice'
import announcementSlice  from '../features/Announcement/announcemetSlice'  
import attendanceSlice from '../features/Attendances/attendanceSlice'
 
 
 
 

export const store:any = configureStore({
  reducer: { 
     auth: authSlice,
    leave: leaveSlice, 
    userinfo: userSlice, 
    employee: employeeSlice, 
    assessment: assessmentSlice, 
    department: departmentSlice, 
    project: projectSlice, 
    notification: NotificationSlice, 
    Weeklyreport: WeeklyReportSlice, 
    hod: hodSlice, 
    attendance: attendanceSlice, 
    announcement: announcementSlice, 
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


 

 
 