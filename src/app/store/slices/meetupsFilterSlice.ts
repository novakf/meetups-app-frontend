import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const initialState = {
  status: [],
  organizator: '',
  startDate: '',
  endDate: '',
}

const dataSlice = createSlice({
  name: 'meetupsFilter',
  initialState: { Data: initialState },
  reducers: {
    setStatusData(state, action) {
      state.Data.status = action.payload
    },
    setOrgData(state, action) {
      state.Data.organizator = action.payload
    },
    setStartDateData(state, action) {
      state.Data.startDate = action.payload
    },
    setEndDateData(state, action) {
      state.Data.endDate = action.payload
    },
    clearFilterData(state) {
      state.Data.status = []
      state.Data.organizator = ''
      state.Data.startDate = ''
      state.Data.endDate = ''
    },
  },
})

export const filterData = () => useSelector((state: RootState) => state.meetupsFilterInfo.Data)

export const {
  setStatusData: setFilterDataAction,
  setOrgData: setOrgDataAction,
  setStartDateData: setStartDataAction,
  setEndDateData: setEndDataAction,
  clearFilterData: clearFilterDataAction,
} = dataSlice.actions

export default dataSlice.reducer
