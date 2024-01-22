import React, { useEffect, useRef, useState } from 'react'
import Input from '../Input'
import ArrowRight from '../../icons/ArrowRight'
import { styled } from 'styled-components'

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
    <Select ref={selectRef} {...other}>
      <Input
        style={{ caretColor: 'transparent', cursor: 'pointer' }}
        onClick={() => !disabled && setListIsOpen(true)}
        disabled={disabled}
        value={value.length !== 0 && !listIsOpen ? getTitle(value) : ''}
        onChange={() => {}}
        placeholder={getTitle(value) ? getTitle(value) : 'Выберите статус'}
        afterSlot={
          <SArrowRight color="secondary" onClick={() => !disabled && setListIsOpen(!listIsOpen)} $active={listIsOpen} />
        }
      />

      <DropDown $active={listIsOpen}>
        {myOptions.map((option) => (
          <OptionEl
            key={option.key}
            $active={activeClass(option)}
            onClick={() => {
              changeCurrentOptions(option)
            }}
          >
            {option.value}
          </OptionEl>
        ))}
      </DropDown>
    </Select>
  )
}

const DropDown = styled.div<{ $active: boolean }>`
  opacity: 0;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 230px;
  width: 326px;
  transition: all 0.3s;
  pointer-events: none;
  transform: scaleY(0);
  transform-origin: top;

  ${(p) =>
    p.$active &&
    `opacity: 1;
    transform: scaleY(1);
   pointer-events: all;`}
`

const Select = styled.div`
  width: 300px;
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
  cursor: pointer !important;
`

const OptionEl = styled.div<{ $active: boolean }>`
  color: #000;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  display: flex;
  padding: 14px 12px;
  align-items: center;
  gap: var(--space-xxs, 8px);
  flex-shrink: 0;
  border-radius: var(--border-radius, 0px);
  border: 1px solid var(--input-border, #fff);
  background: var(--input-bg, #fff);
  cursor: pointer;

  ${(p) => p.$active && `color: #157bff`}
`

const SArrowRight = styled(ArrowRight)<{ $active: boolean }>`
  cursor: pointer;
  transition: 0.3s;
  margin-top: 4px;

  ${(props) =>
    props.$active &&
    `
    transform: rotate(90deg);
  `}
`

export default MultiDropdown
