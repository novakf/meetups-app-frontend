import React, { ReactNode } from 'react'
import { styled } from 'styled-components'

type Props = {
  children: ReactNode[]
}

const Popover: React.FC<Props> = (props) => {
  return <Container>
    
    {props.children}
    </Container>
}

const Container = styled.div``

export default Popover
