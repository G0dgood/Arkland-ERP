import { configureStore } from '@reduxjs/toolkit'  
import leaveSlice from '../features/Leave/leaveSlice'

export const store = configureStore({
  reducer: { 
    leave: leaveSlice, 
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStater = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatcher = typeof store.dispatch