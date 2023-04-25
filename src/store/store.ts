import { configureStore } from '@reduxjs/toolkit'  
import leaveSlice from '../features/Leave/leaveSlice'
import authSlice from '../features/Auth/authSlice' 
import userSlice from '../features/User/userSlice'

export const store1 = configureStore({
  reducer: { 
     auth: authSlice,
    leave: leaveSlice, 
    userinfo: userSlice, 
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStater = ReturnType<typeof store1.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatcher = typeof store1.dispatch