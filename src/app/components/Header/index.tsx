import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo-bmstu.png'
import PopupForm from '../PopupForm'
import { Link, useLocation } from 'react-router-dom'
import BurgerMenuIcon from '../../icons/BurgerMenuIcon'
import ModalMenu from './components/ModalMenu'
import { setUserDataAction, userData } from '../../store/slices/userSlice'
import UserContainer from './components/UserContainer'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import GenericMessage from '../Message'

const Header: React.FC = () => {
  const [loginOpen, setLoginOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)
  const [modalMenuOpen, setModalMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const [status, setStatus] = useState('')
  const [message, setMessage] = useState(false)
  const [messageText, setMessageText] = useState('')

  const user = userData()

  const dispatch = useDispatch()

  useEffect(() => {
    axios
      .get('http://localhost:3001/users/me', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        dispatch(setUserDataAction(res.data))
        setLoading(false)
      })
      .catch(function (error) {
        console.log('UserInfoError', error)
        setLoading(false)
      })
  }, [])

  const { pathname } = useLocation()

  return (
    <Container>
      <Content>
        <Left>
          <Logo to="/">
            <LogoImg src={logo} />
            Митапы.
          </Logo>
          <Column>|</Column>
          <Links>
            <Tab>
              <Link to={'/speakers'}>Спикеры</Link>
              <Border $isActive={'/speakers' === pathname} />
            </Tab>
            {user && user.id !== -1 && (
              <Tab>
                <Link to={'/profile/meetups'}>{user.role === 'модератор' ? 'Текущие заявки' : 'Мои заявки'}</Link>
                <Border $isActive={'/profile/meetups' === pathname} />
              </Tab>
            )}
            {user?.role === 'модератор' && (
              <Tab>
                <Link to={'/speakers/moderation'}>Модерация</Link>
                <Border $isActive={'/speakers/moderation' === pathname} />
              </Tab>
            )}
          </Links>
        </Left>

        {!loading &&
          (user && user.id !== -1 ? (
            <UserContainer user={user} setMessage={setMessage} setMessageText={setMessageText} setStatus={setStatus} />
          ) : (
            <Action>
              <LoginButton onClick={() => setLoginOpen(true)}>Войти</LoginButton>
              <SignupButton onClick={() => setSignupOpen(true)}>Создать аккаунт</SignupButton>
            </Action>
          ))}

        <BurgerMenu>
          <StyledBurgerMenuIcon $open={modalMenuOpen} onClick={() => setModalMenuOpen(!modalMenuOpen)}>
            <BurgerMenuIcon />
          </StyledBurgerMenuIcon>
          <ModalMenu open={modalMenuOpen} onClose={() => setModalMenuOpen(false)} />
        </BurgerMenu>
      </Content>
      <PopupForm open={loginOpen} onClose={() => setLoginOpen(false)} type="Login" />
      <PopupForm open={signupOpen} onClose={() => setSignupOpen(false)} type="Signup" />
      <GenericMessage status={status} open={message} text={messageText} setOpen={setMessage}/>
    </Container>
  )
}

const Tab = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`

const Border = styled.div<{
  $isActive: boolean
}>`
  margin-top: 15px;
  height: 1px;
  width: 100%;
  border-bottom: 2px solid #004dff59;
  margin-left: auto;
  margin-right: auto;
  opacity: 0;
  transition: all 0.3s;

  ${(props) =>
    props.$isActive &&
    `
    opacity: 1;
    `};
`

const StyledBurgerMenuIcon = styled.div<{ $open: boolean }>`
  transition: all 0.2s;

  ${(props) => props.$open && `transform: rotate(-90deg);`}
`

const BurgerMenu = styled.div`
  @media (min-width: 751px) {
    display: none;
  }
`

const Column = styled.div`
  font-size: 40px;
  margin-right: 20px;
  color: #000;
  font-weight: 100;
  align-items: center;

  @media (max-width: 750px) {
    display: none;
  }
`

const Links = styled.div`
  display: flex;
  gap: 15px;

  a {
    text-decoration: none;
    color: #000;
  }

  @media (max-width: 750px) {
    display: none;
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

  @media (max-width: 750px) {
    display: none;
  }
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
  padding: 0 50px;
  border-bottom: 1px solid #f1f1f1;
  position: fixed;
  background: #fff;
  z-index: 10;
  width: calc(100% - 80px);
  width: calc(100% - 81px);
`

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`

export default Header
