import React from 'react'
import SuccessIcon from '../../icons/SuccessIcon'
import ErrorIcon from '../../icons/ErrorIcon'
import InfoIcon from '../../icons/InfoIcon'
import Styled from './styles'

type Props = {
  status?: string
  open: boolean
  text: string
}

const GenericMessage: React.FC<Props> = (props) => {
  return (
    <Styled.Container>
      <Styled.MessageBox $open={props.open}>
        {props.status === 'success' && <SuccessIcon style={{ marginRight: '10px' }} />}
        {props.status === 'error' && <ErrorIcon style={{ marginRight: '10px' }} />}
        {props.status === 'info' && <InfoIcon style={{ marginRight: '10px' }} />}
        {props.text}
      </Styled.MessageBox>
    </Styled.Container>
  )
}

export default GenericMessage
