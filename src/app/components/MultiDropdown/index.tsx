import React, { useEffect, useRef, useState } from 'react'
import Input from '../Input'
import Styled from './styles'

export type Option = {
  key: string
  value: string
}

export type MultiDropdownProps = {
  className?: string
  options: Option[]
  value: Option[]
  onChange: (value: Option[]) => void
  disabled?: boolean
  getTitle: (value: Option[]) => string
}

const MultiDropdown: React.FC<MultiDropdownProps> = (props) => {
  let { className, options, value, disabled, onChange, getTitle, ...other } = props

  const [myOptions, setMyOptions] = useState(options)

  useEffect(() => {
    setMyOptions(options)
  }, [options])

  let [listIsOpen, setListIsOpen] = useState(false)

  const changeCurrentOptions = (option: Option) => {
    let fl = false

    value.forEach((val) => {
      if (val.value === option.value) fl = true
    })

    let newValue: Option[] = []

    if (fl) {
      value.forEach((val) => {
        if (val.value !== option.value) newValue.push(val)
      })
    } else {
      if (value.length === 0) newValue = [option]
      else newValue = [...value, option]
    }

    onChange(newValue)
  }

  const selectRef = useRef(null)

  const useClickHandler = (ref: any) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setListIsOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  useClickHandler(selectRef)

  const activeClass = (option: Option) => {
    return value.find((val) => option.key === val.key) ? true : false
  }

  return (
    <Styled.Select ref={selectRef} {...other}>
      <Input
        style={{ caretColor: 'transparent', cursor: 'pointer' }}
        onClick={() => !disabled && setListIsOpen(true)}
        disabled={disabled}
        value={value.length !== 0 && !listIsOpen ? getTitle(value) : ''}
        onChange={() => {}}
        placeholder={getTitle(value) ? getTitle(value) : 'Выберите статус'}
        afterSlot={
          <Styled.ArrowRight
            color="secondary"
            onClick={() => !disabled && setListIsOpen(!listIsOpen)}
            $active={listIsOpen}
          />
        }
      />

      <Styled.DropDown $active={listIsOpen}>
        {myOptions.map((option) => (
          <Styled.OptionEl
            key={option.key}
            $active={activeClass(option)}
            onClick={() => {
              changeCurrentOptions(option)
            }}
          >
            {option.value}
          </Styled.OptionEl>
        ))}
      </Styled.DropDown>
    </Styled.Select>
  )
}

export default MultiDropdown
