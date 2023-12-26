import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'

export default configureStore({
  reducer: combineReducers({
    userInfo: userReducer,
  }),
})
