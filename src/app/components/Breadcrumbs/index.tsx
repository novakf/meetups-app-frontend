import React, { ReactNode } from 'react'
import Styled from './styles'

type Props = {
  children: ReactNode[] | ReactNode
}

const Breadcrumbs: React.FC<Props> = ({ children }) => {
  return (
    <Styled.Container>
      {Array.isArray(children) ? (
        children.map((child, i) => {
          return (
            <Styled.Section key={i}>
              {child}
              {i !== children.length - 1 && <Styled.ArrowRight />}
            </Styled.Section>
          )
        })
      ) : (
        <Styled.Section>{children}</Styled.Section>
      )}
    </Styled.Container>
  )
}

export default Breadcrumbs
