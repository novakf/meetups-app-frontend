import React, { useState } from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo-bmstu.png'
import PopupForm from '../PopupForm'
import { Link } from 'react-router-dom'

const Header = () => {
  const [loginOpen, setLoginOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)

  return (
    <Container>
      <Left>
        <Logo to="/">
          <LogoImg src={logo} />
          Митапы.
        </Logo>
        <Column>|</Column>
        <Links>
          <Link to="/speakers">Спикеры</Link>
          <Link to="/meetups">Мои заявки</Link>
        </Links>
      </Left>
      <Action>
        <LoginButton onClick={() => setLoginOpen(true)}>Войти</LoginButton>
        <SignupButton onClick={() => setSignupOpen(true)}>Создать аккаунт</SignupButton>
      </Action>
      <PopupForm open={loginOpen} onClose={() => setLoginOpen(false)} type="Login" />
      <PopupForm open={signupOpen} onClose={() => setSignupOpen(false)} type="Signup" />
    </Container>
  )
}

const Column = styled.div`
  font-size: 40px;
  margin-right: 20px;
  color: #000;
  font-weight: 100;
  align-items: center;
`

const Links = styled.div`
  display: flex;
  gap: 15px;

  a {
    text-decoration: none;
    color: #000;
  }
`

const Left = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
`

const Action = styled.div`
  display: flex;
  gap: 10px;
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

const LogoImg = styled.img`
  width: 36px;
`

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  margin-right: 30px;
  text-decoration: none;
  color: #000;
`

const Container = styled.div`
  display: flex;
  height: 70px;
  align-items: center;
  padding: 0 40px;
  justify-content: space-between;
  border-bottom: 1px solid #f1f1f1;
  position: fixed;
  background: #fff;
  z-index: 10;
  width: calc(100% - 84px);
`

export default Header
