import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import draftReducer from './slices/draftSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import filterReducer from './slices/filterSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const persistConfigFilter = {
  key: 'filter',
  storage,
}

const persistedReducer = persistReducer(persistConfig, draftReducer)
const persistedFilter = persistReducer(persistConfigFilter, filterReducer)

export const store = configureStore({
  reducer: combineReducers({
    userInfo: userReducer,
    draftInfo: persistedReducer,
    filterInfo: persistedFilter,
  }),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
