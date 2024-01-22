import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const initialState = {
  message: false,
  messageText: '',
  status: '',
}

const dataSlice = createSlice({
  name: 'message',
  initialState: { Data: initialState },
  reducers: {
    setMessage(state, action) {
      state.Data.message = action.payload.message
      state.Data.messageText = action.payload.messageText
      if (action.payload.status) state.Data.status = action.payload.status
      else state.Data.status = 'success'
    },
  },
})

export const messageData = () => useSelector((state: RootState) => state.messageInfo.Data)

export const { setMessage: setMessageAction } = dataSlice.actions

export default dataSlice.reducer
