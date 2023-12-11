import React, { useState } from 'react'
import Modal from '../Modal'
import { styled } from 'styled-components'
import robot from '../../assets/robot.png'
import angryRobot from '../../assets/angry-robot.png'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'

type Props = {
  open: boolean
  onClose: () => void
  type: string
}

const PopupForm: React.FC<Props> = ({ open, onClose, type }) => {
  const handleClose = () => {
    onClose?.()
  }
  const [error, setError] = useState(false)
  const [formType, setFormType] = useState(type)

  return (
    <Modal open={open} onClose={handleClose}>
      <Content>
        <Left>
          <LeftTitle>Добро пожаловать!</LeftTitle>
          <ImageContainer $error={error}></ImageContainer>

          {formType === 'Login' ? (
            <Hint>
              Нет аккаунта?{' '}
              <ChangeContentButton onClick={() => setFormType('Signup')}>Создать аккаунт</ChangeContentButton>
            </Hint>
          ) : (
            <Hint>
              Уже создали? <ChangeContentButton onClick={() => setFormType('Login')}>Войти</ChangeContentButton>
            </Hint>
          )}
        </Left>
        <Right>
          {formType === 'Login' ? (
            <LoginForm error={error} setError={setError} />
          ) : (
            <SignupForm error={error} setError={setError} />
          )}
        </Right>
      </Content>
    </Modal>
  )
}

const Hint = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const ChangeContentButton = styled.div`
  cursor: pointer;
  text-decoration: underline;
`

const ImageContainer = styled.div<{ $error: boolean }>`
  display: flex;
  justify-content: center;
  height: 215px;
  width: 200px;
  background-image: url('${(props) => (!props.$error ? robot : angryRobot)}');
  background-size: 200px;
  background-repeat: no-repeat;
  margin-left: auto;
  margin-right: auto;

  transition: all 0.3s;
`

const Content = styled.div`
  display: flex;
`

const LeftTitle = styled.div`
  font-size: 24px;
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  background: #ebebeb;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  padding: 24px;
  gap: 40px;
  justify-content: space-between;
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  border-radius: 10px;
  padding: 24px;
`

export default PopupForm
