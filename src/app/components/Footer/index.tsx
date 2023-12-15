import React from 'react'
import { styled } from 'styled-components'

const Footer: React.FC = () => {
  return <Container>@2023 novakf</Container>
}

const Container = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-top: 1px solid;
  background: #003963;
  border-top: 1px solid #d1d1d1;
  color: #e3e3e3;
`

export default Footer
