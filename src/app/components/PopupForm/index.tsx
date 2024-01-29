import React, { useState } from 'react'
import Modal from '../Modal'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import BmstuLogo from '../../icons/BmstuLogo'
import Styled from './styles'

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
    <>
      <Modal open={open} onClose={handleClose}>
        <Styled.Content>
          <Styled.Left>
            <Styled.LeftTitle>Добро пожаловать!</Styled.LeftTitle>
            <Styled.ImageContainer $error={error}></Styled.ImageContainer>

            {formType === 'Login' ? (
              <Styled.Hint>
                Нет аккаунта?{' '}
                <Styled.ChangeContentButton onClick={() => setFormType('Signup')}>
                  Создать аккаунт
                </Styled.ChangeContentButton>
              </Styled.Hint>
            ) : (
              <Styled.Hint>
                Уже создали?{' '}
                <Styled.ChangeContentButton onClick={() => setFormType('Login')}>Войти</Styled.ChangeContentButton>
              </Styled.Hint>
            )}
            <BmstuLogo
              style={{ width: '50%', height: '100%', position: 'absolute', top: '0', zIndex: '0', left: '0' }}
            />
          </Styled.Left>
          <Styled.Right>
            {formType === 'Login' ? (
              <LoginForm setError={setError} onSubmit={handleClose} />
            ) : (
              <SignupForm setError={setError} onSubmit={handleClose} />
            )}

            {formType === 'Login' ? (
              <Styled.Hint style={{ display: window.innerWidth < 500 ? 'flex' : 'none' }}>
                Нет аккаунта?{' '}
                <Styled.ChangeContentButton onClick={() => setFormType('Signup')}>
                  Создать аккаунт
                </Styled.ChangeContentButton>
              </Styled.Hint>
            ) : (
              <Styled.Hint style={{ display: window.innerWidth < 500 ? 'flex' : 'none' }}>
                Уже создали?{' '}
                <Styled.ChangeContentButton onClick={() => setFormType('Login')}>Войти</Styled.ChangeContentButton>
              </Styled.Hint>
            )}
          </Styled.Right>
        </Styled.Content>
      </Modal>
    </>
  )
}

export default PopupForm
