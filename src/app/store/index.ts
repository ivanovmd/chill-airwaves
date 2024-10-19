import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { atcSlice } from './atc/atsSlice'
import { userSlice } from './userSlice'
import { listenerMiddleware } from './middlewares/listener'
import { userPreferencesSlice } from './userPreferences/userPreferencesSlice'
import { appSlice } from './appState/appSlice'

const persistConfig = {
  key: 'root',
  storage,
  // Optionally, you can blacklist or whitelist specific reducers
  // blacklist: ['someReducer'],
  // whitelist: ['someReducer'], 
}

const rootReducer = combineReducers({
  [atcSlice.reducerPath]: atcSlice.reducer,
  [userSlice.reducerPath]: userSlice.reducer,
  [userPreferencesSlice.reducerPath]: userPreferencesSlice.reducer,
  [appSlice.reducerPath]: appSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).prepend(listenerMiddleware.middleware),
  devTools: true
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => AppDispatch = useDispatch