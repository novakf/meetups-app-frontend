import React, { useEffect } from 'react'
import styled from 'styled-components'
import SuccessIcon from '../../icons/SuccessIcon'
import ErrorIcon from '../../icons/ErrorIcon'
import InfoIcon from '../../icons/InfoIcon'

type Props = {
  status?: string
  open: boolean
  text: string
  setOpen: (val: boolean) => void
}

const GenericMessage: React.FC<Props> = ({ status = 'info', ...props }) => {
  useEffect(() => {
    props.open && setTimeout(() => props.setOpen(false), 3000)
  }, [props.open])

  return (
    <Container>
      <MessageBox $open={props.open}>
        {status === 'success' && <SuccessIcon style={{ marginRight: '10px' }} />}
        {status === 'error' && <ErrorIcon style={{ marginRight: '10px' }} />}
        {status === 'info' && <InfoIcon style={{ marginRight: '10px' }} />}
        {props.text}
      </MessageBox>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  heigth: 40px;
  z-index: 10;
  pointer-events: none;
`

const MessageBox = styled.div<{ $open: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-size: 16px;
  width: fit-content;
  padding: 9px 12px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow:
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease-out;
  opacity: 0;
  margin-top: -40px;

  ${(props) =>
    props.$open &&
    `
      opacity: 1;
      margin-top: 30px
  `}
`

export default GenericMessage
