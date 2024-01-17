import { KeyboardEvent } from 'react'
import { useEffect } from 'react'
import { setMessageAction } from '../store/slices/messageSlice'
import { Dispatch } from '@reduxjs/toolkit'

type ParamsType = {
  messageText: string
  status?: string
}

export const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    return (e.target as HTMLElement).blur()
  }
}

export const setMessage = (params: ParamsType, dispatch: Dispatch) => {
  dispatch(setMessageAction({ ...params, message: true }))
  setTimeout(() => {
    dispatch(setMessageAction({ ...params, message: false }))
  }, 3000)
}

export const useInterval = (callback: () => void, delay: number) => {
  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(callback, delay)
      return () => clearInterval(id)
    }
  }, [callback])
}
