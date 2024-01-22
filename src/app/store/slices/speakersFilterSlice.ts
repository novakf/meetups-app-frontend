import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const initialState = {
  company: '',
}

const dataSlice = createSlice({
  name: 'speakersFilter',
  initialState: { Data: initialState },
  reducers: {
    setCompanyData(state, action) {
      state.Data.company = action.payload
    },
  },
})

export const filterData = () => useSelector((state: RootState) => state.speakersFilterInfo.Data)

export const {
  setCompanyData: setCompanyDataAction,
} = dataSlice.actions

export default dataSlice.reducer
