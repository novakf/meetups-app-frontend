import React, { ReactNode } from 'react'
import ArrowRight from '../../icons/ArrowRight'
import { styled } from 'styled-components'

type Props = {
  children: ReactNode[] | ReactNode
}

const Breadcrumbs: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      {Array.isArray(children) ? (
        children.map((child, i) => {
          return (
            <Section key={i}>
              {child}
              {i !== children.length - 1 && <ArrowRight />}
            </Section>
          )
        })
      ) : (
        <Section>{children}</Section>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  background: #f7f7f7;
  padding: 8px 20px;
  border-radius: 15px;
  gap: 10px;
  width: fit-content;
  z-index: 1;

  @media (max-width: 751px) {
  }
`

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;

  @media (max-width: 751px) {
    font-size: 12px;
  }
`

export default Breadcrumbs
