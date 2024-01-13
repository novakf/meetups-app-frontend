import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const initialState = {
  status: [],
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
    setStartDateData(state, action) {
      state.Data.startDate = action.payload
    },
    setEndDateData(state, action) {
      state.Data.endDate = action.payload
    },
  },
})

export const filterData = () => useSelector((state: any) => state.meetupsFilterInfo.Data)

export const {
  setStatusData: setFilterDataAction,
  setStartDateData: setStartDataAction,
  setEndDateData: setEndDataAction,
} = dataSlice.actions

export default dataSlice.reducer
