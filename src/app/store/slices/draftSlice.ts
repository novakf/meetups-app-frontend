import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Meetup } from '../../../../generated/api'

const initialState: Meetup = {
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

export const draftData = () => useSelector((state: RootState) => state.draftInfo.Data)
export const hasDraft = () => useSelector((state: RootState) => state.draftInfo.Data?.id !== -1 || !state.draftInfo.Data)

export const { setData: setDraftDataAction } = dataSlice.actions

export default dataSlice.reducer
