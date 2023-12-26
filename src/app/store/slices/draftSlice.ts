import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { MeetupsType } from '../../types'

type State = {
  draftInfo: {
    Data: MeetupsType
  }
}

const initialState = {
  id: -1,
  status: '',
  date: '',
  place: '',
  title: '',
  description: '',
  preview: '',
  updatedAt: '',
  confirmedAt: '',
  createdAt: '',
  creatorLogin: '',
  moderatorLogin: '',
  speakers: [],
  MeetupsSpeakers: [],
}

const dataSlice = createSlice({
  name: 'draft',
  initialState: { Data: initialState },
  reducers: {
    setData(state, { payload }) {
      state.Data = payload
    },
  },
})

export const draftData = () => useSelector((state: State) => state.draftInfo.Data)
export const hasDraft = () => useSelector((state: State) => state.draftInfo.Data?.id !== -1 || !state.draftInfo.Data)

export const { setData: setDraftDataAction } = dataSlice.actions

export default dataSlice.reducer
