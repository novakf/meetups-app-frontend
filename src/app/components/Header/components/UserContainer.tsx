import React from 'react'
import { styled } from 'styled-components'
import { UserType } from '../../../types'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setDataAction } from '../../../slices/userSlice'

const UserContainer: React.FC<UserType> = (user) => {
  const dispatch = useDispatch()

  const exitAccount = () => {
    axios
      .post('http://localhost:3001/auth/logout', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        dispatch(setDataAction(undefined))
        
      })
      .catch(function (error) {
        console.log('UserLogoutError', error)
      })
  }

  return (
    <Container>
      <a href="">
        <AvatarContainer>
          <Avatar src={user.avatarImg} />
        </AvatarContainer>
      </a>
      <UserInfo>
        <UserName>{user.name}</UserName>
        <UserAction>
          <SettingsButton>Настройки</SettingsButton>
          <ExitButton onClick={exitAccount}>Выйти</ExitButton>
        </UserAction>
      </UserInfo>
    </Container>
  )
}

const SettingsButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #838383;

  &:hover {
    color: #000000;
  }
`

const ExitButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #838383;

  &:hover {
    color: red;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  transition: width 0.3s;
  transition: all 0.3s;

  @media (max-width: 575px) {
    width: 40px;
    margin-left: 10px;
  }
`

const UserName = styled.div``

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 50%;
  border: 1px solid #d5d5d5;
  height: 40px;
  width: 40px;
  overflow: hidden;
  background: rgb(224, 224, 224);
`

const Avatar = styled.img`
  width: 100%;
`

const UserInfo = styled.div`
  display: flex;
  margin-left: 10px;
  flex-direction: column;

  @media (max-width: 575px) {
    display: none;
  }
`

const UserAction = styled.div`
  display: flex;
  gap: 10px;
  width: 125px;

  @media (max-width: 575px) {
    display: none;
  }
`

export default UserContainer
