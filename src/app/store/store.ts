import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import draftReducer from './slices/draftSlice'

export default configureStore({
  reducer: combineReducers({
    userInfo: userReducer,
    draftInfo: draftReducer,
  }),
})
