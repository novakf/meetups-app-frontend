import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo-bmstu.png'
import PopupForm from '../PopupForm'
import { Link, useLocation } from 'react-router-dom'
import BurgerMenuIcon from '../../icons/BurgerMenuIcon'
import ModalMenu from './components/ModalMenu'
import { setUserDataAction, userData } from '../../store/slices/userSlice'
import UserContainer from './components/UserContainer'
import { useDispatch } from 'react-redux'
import GenericMessage from '../Message'
import { messageData } from '../../store/slices/messageSlice'
import { Service } from '../../../../generated/api'
import Styled from './styles'

const Header: React.FC = () => {
  const [loginOpen, setLoginOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)
  const [modalMenuOpen, setModalMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const message = messageData()

  const user = userData()

  const dispatch = useDispatch()

  useEffect(() => {
    Service.usersControllerGetCurrentUser()
      .then((res) => {
        dispatch(setUserDataAction(res))
        setLoading(false)
      })
      .catch(function (error) {
        console.log('UserInfoError', error)
        setLoading(false)
      })
  }, [])

  const { pathname } = useLocation()

  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.Left>
          <Styled.Logo to="/">
            <Styled.LogoImg src={logo} />
            Митапы.
          </Styled.Logo>
          <Styled.Column>|</Styled.Column>
          <Styled.Links>
            <Styled.Tab>
              <Link to={'/speakers'}>Спикеры</Link>
              <Styled.Border $isActive={'/speakers' === pathname} />
            </Styled.Tab>
            {user && user.id !== -1 && (
              <Styled.Tab>
                <Link to={'/profile/meetups'}>{user.role === 'модератор' ? 'Текущие заявки' : 'Мои заявки'}</Link>
                <Styled.Border $isActive={'/profile/meetups' === pathname} />
              </Styled.Tab>
            )}
            {user?.role === 'модератор' && (
              <Styled.Tab>
                <Link to={'/speakers/moderation'}>Модерация спикеров</Link>
                <Styled.Border $isActive={'/speakers/moderation' === pathname} />
              </Styled.Tab>
            )}
          </Styled.Links>
        </Styled.Left>

        {!loading &&
          (user && user.id !== -1 ? (
            <UserContainer user={user} />
          ) : (
            <Styled.Action>
              <Styled.LoginButton onClick={() => setLoginOpen(true)}>Войти</Styled.LoginButton>
              <Styled.SignupButton onClick={() => setSignupOpen(true)}>Создать аккаунт</Styled.SignupButton>
            </Styled.Action>
          ))}

        <Styled.BurgerMenu>
          <Styled.BurgerMenuButton $open={modalMenuOpen} onClick={() => setModalMenuOpen(!modalMenuOpen)}>
            <BurgerMenuIcon />
          </Styled.BurgerMenuButton>
          <ModalMenu open={modalMenuOpen} onClose={() => setModalMenuOpen(false)} />
        </Styled.BurgerMenu>
      </Styled.Content>
      <PopupForm open={loginOpen} onClose={() => setLoginOpen(false)} type="Login" />
      <PopupForm open={signupOpen} onClose={() => setSignupOpen(false)} type="Signup" />
      <GenericMessage status={message.status} open={message.message} text={message.messageText} />
    </Styled.Container>
  )
}

export default Header
