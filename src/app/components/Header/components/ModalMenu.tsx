import React, { ReactNode, useState } from 'react'
import { styled } from 'styled-components'
import PopupForm from '../../PopupForm'
import { Link } from 'react-router-dom'

type Props = {
  open: boolean
  onClose: () => void
  children?: ReactNode[]
}

const ModalMenu: React.FC<Props> = ({ open, onClose, children }) => {
  const [loginOpen, setLoginOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)

  const handleClick = () => {
    onClose?.()
  }

  return (
    <ModalWrapper $open={open} onClick={handleClick}>
      <ModalContent
        $open={open}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <SignupButton onClick={() => setSignupOpen(true)}>Авторизация</SignupButton>
        <SLink onClick={handleClick} to="/speakers">
          Спикеры
        </SLink>
      </ModalContent>
      <PopupForm open={loginOpen} onClose={() => setLoginOpen(false)} type="Login" />
      <PopupForm open={signupOpen} onClose={() => setSignupOpen(false)} type="Signup" />
    </ModalWrapper>
  )
}

const SLink = styled(Link)`
  text-decoration: none;
  color: #000;
  font-size: 20px;
`

const Action = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
`

const LoginButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 15px;
  transition: all 0.3s;
  border-radius: 14px;
  padding: 5px 14px 7px 14px;

  &:hover {
    background: #efefef;
  }
`

const SignupButton = styled.button`
  background: #0064ff;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  color: #fff;
  padding: 5px 14px 7px 14px;
  transition: all 0.2s;

  &:hover {
    background: #0042a7;
  }
`

const ModalContent = styled.div<{ $open: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #e3e3e3;
  margin-left: auto;
  border-bottom-left-radius: 5px;
  background-color: white;
  padding: 10px 30px 10px 20px;
  transition: all 0.3s;
  opacity: 0;
  margin-right: -150px;
  gap: 10px;

  ${(props) => props.$open && 'opacity: 1; margin-right: 0;'}
`

const ModalWrapper = styled.div<{ $open: boolean }>`
  z-index: 10;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  height: 100vh;
  width: 100vw;
  background-color: #00000021;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
  transition: 0.2s;
  margin-top: 70px;

  ${(props) =>
    props.$open &&
    `
      opacity: 1;
      pointer-events: all;
  `}
`

export default ModalMenu
