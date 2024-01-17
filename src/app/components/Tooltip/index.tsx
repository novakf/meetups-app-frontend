import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'

type Props = {
  children: ReactNode[] | ReactNode
  title: JSX.Element
  disabled?: boolean
}

const Tooltip: React.FC<Props> = (props) => {
  const { children, title } = props
  const [open, setOpen] = useState(false)

  let timeout: ReturnType<typeof setTimeout>

  const showTip = () => {
    timeout = setTimeout(() => setOpen(true), 500)
  }

  const hideTip = () => {
    clearTimeout(timeout)
    setOpen(false)
  }

  return (
    <TooltipWrapper onMouseEnter={showTip} onMouseLeave={hideTip}>
      {children}
      <Tip $open={open}>{title}</Tip>
    </TooltipWrapper>
  )
}

const TooltipWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
`

const Tip = styled.div<{ $open: boolean }>`
  position: absolute;
  top: calc(100% + 6px);
  font-size: 12px;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  border: 1px solid #ddd;
  z-index: 10;
  pointer-events: none;
  transition: opacity 0.1s, transform 0.15s !important;
  opacity: 0;
  padding: 1px 7px;
  transform-origin: top;
  transform: scale(0);

  ${(p) =>
    p.$open &&
    `
    opacity: 1;
    transform: scale(1);
  `}
`

export default Tooltip
