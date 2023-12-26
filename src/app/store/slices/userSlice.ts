import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { UserType } from '../../types'

type State = {
  userInfo: {
    Data: UserType
  }
}

const initialState = {
  id: -1,
  name: '',
  phone: '',
  email: '',
  password: '',
  avatarImg: '',
  role: 'участник',
}

const dataSlice = createSlice({
  name: 'user',
  initialState: { Data: initialState },
  reducers: {
    setData(state, { payload }) {
      state.Data = payload
    },
  },
})

export const userData = () => useSelector((state: State) => state.userInfo.Data)
export const isLoggedIn = () => useSelector((state: State) => state.userInfo.Data?.id !== -1 || !state.userInfo.Data)

export const { setData: setUserDataAction } = dataSlice.actions

export default dataSlice.reducer
