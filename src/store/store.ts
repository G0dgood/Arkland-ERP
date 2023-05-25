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
import announcementSlice from '../features/Announcement/announcemetSlice'
 

export const store1 = configureStore({
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
    announcement: announcementSlice, 
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStater = ReturnType<typeof store1.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatcher = typeof store1.dispatch


 
 