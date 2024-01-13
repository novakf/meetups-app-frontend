import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import draftReducer from './slices/draftSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import meetupsFilterReducer from './slices/meetupsFilterSlice'
import speakersFilterReducer from './slices/speakersFilterSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const persistMeetupsConfigFilter = {
  key: 'filter',
  storage,
}

const persistSpeakersConfigFilter = {
  key: 'speakersFilter',
  storage,
}

const persistedReducer = persistReducer(persistConfig, draftReducer)
const persistedMeetupsFilter = persistReducer(persistMeetupsConfigFilter, meetupsFilterReducer)
const persistedSpeakersFilter = persistReducer(persistSpeakersConfigFilter, speakersFilterReducer)

export const store = configureStore({
  reducer: combineReducers({
    userInfo: userReducer,
    draftInfo: persistedReducer,
    meetupsFilterInfo: persistedMeetupsFilter,
    speakersFilterInfo: persistedSpeakersFilter,
  }),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
