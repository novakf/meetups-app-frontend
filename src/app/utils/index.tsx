import { KeyboardEvent } from "react"

export const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    return (e.target as HTMLElement).blur()
  }
}
