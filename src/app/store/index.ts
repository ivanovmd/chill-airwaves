import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { airportsSlice } from './airports/airportsSlice'
import { userSlice } from './userSlice'
import { listenerMiddleware } from './middlewares/listener'




export const store = configureStore({
  reducer: {
    [airportsSlice.reducerPath]: airportsSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  devTools: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => AppDispatch = useDispatch