import React from 'react'
import { styled } from 'styled-components'

type Props = {
  isDraft: boolean
}

const MeetupPage: React.FC<Props> = ({ isDraft }) => {
  return (
    <Container>
      
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  padding: 101px 40px 20px 40px;
  margin: 0 auto;
`

export default MeetupPage
