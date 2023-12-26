import React, { useState } from 'react'
import { styled } from 'styled-components'

type Props = {
  error: boolean
  setError: (value: boolean) => void
}

const LoginForm: React.FC<Props> = ({ error, setError }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleClick = () => {
    setError(!error)
  }
  return (
    <>
      <RightTitle>Войти</RightTitle>
      <InputLabel>Email</InputLabel>
      <StyledInput
        type="text"
        placeholder={'example@mail.org'}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputLabel>Пароль</InputLabel>
      <StyledInput type="text" placeholder={'****'} value={password} onChange={(e) => setPassword(e.target.value)} />
      <FormButton onClick={handleClick}>Войти</FormButton>
    </>
  )
}

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
`

const InputLabel = styled.div`
  color: #a7a7a7;
`

const StyledInput = styled.input`
  border: none;
  padding: 0px;
  outline: none;
  width: 100%;
  border-bottom: 2px solid #dddddd;
  padding: 6px 10px;
  font-size: 14px;
  transition: all 0.2s;
  margin-bottom: 20px;

  height: 30px;

  &:focus {
    border-bottom: 2px solid #898989;
  }
`

const RightTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`

export default LoginForm
