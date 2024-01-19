import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { styled } from 'styled-components'
import { setUserDataAction } from '../../../store/slices/userSlice'
import { handleKeyPress, useMessage } from '../../../utils'
import { Service } from '../../../../../generated/api'

type Props = {
  setError: (value: boolean) => void
  onSubmit: () => void
}

const LoginForm: React.FC<Props> = ({ setError, onSubmit }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailErr, setEmailErr] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (emailErr) setError(true)
    else setError(false)
  }, [emailErr])

  const emailValid = (email: string) => {
    return !/\S+@\S+\.\S+/.test(email) && email.length > 0
  }

  const blurEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmailErr(emailValid(e.target.value))

  const submit = () => {
    Service.authControllerLogin({ email, password })
      .then((res) => {
        dispatch(setUserDataAction(res.user))
        if (res.status === 'ok') {
          useMessage({ messageText: 'Успешный вход в аккаунт' }, dispatch)
        }
        onSubmit()
      })
      .catch(function (error) {
        useMessage({ messageText: error.response.data.message, status: 'error' }, dispatch)
      })
  }

  return (
    <>
      <RightTitle>Войти</RightTitle>
      <InputLabel>Email</InputLabel>
      <StyledInput
        $error={emailErr}
        type="text"
        onBlur={blurEmail}
        placeholder={'example@mail.org'}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => handleKeyPress(e)}
      />
      <ErrorText $error={emailErr}>Неверный формат</ErrorText>
      <InputLabel>Пароль</InputLabel>
      <StyledInput
        $error={false}
        type="text"
        placeholder={'****'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => handleKeyPress(e)}
      />
      <FormButton onClick={submit} disabled={!password || !email || emailValid(email)}>
        Войти
      </FormButton>
    </>
  )
}

const ErrorText = styled.div<{ $error: boolean }>`
  opacity: 0;
  color: #d30000;
  margin: 10px 0;
  font-size: 12px;

  ${(p) => p.$error && `opacity: 1;`}
`

const FormButton = styled.button`
  border: none;
  border-radius: 10px;
  background: #003983;
  padding: 10px 0;
  font-size: 20px;
  color: #fff;
  margin-top: auto;
  cursor: pointer;

  &:hover {
    background: #00275b;
  }

  &:active {
    background: #01367d;
  }

  &:disabled {
    background: #cbcbcb;
    cursor: not-allowed;
  }
`

const InputLabel = styled.div`
  color: #a7a7a7;
`

const StyledInput = styled.input<{ $error: boolean }>`
  border: none;
  padding: 0px;
  outline: none;
  border-bottom: 2px solid #dddddd;
  padding: 6px 10px;
  font-size: 14px;
  transition: all 0.2s;

  height: 30px;

  &:focus {
    border-bottom: 2px solid #898989;
  }

  ${(p) => p.$error && `border-bottom: 2px solid #ff000082;`}
`

const RightTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`

export default LoginForm
