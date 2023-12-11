import React, { useState } from 'react'
import { styled } from 'styled-components'

type Props = {
  error: boolean
  setError: (value: boolean) => void
}

const SignupForm: React.FC<Props> = ({ error, setError }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const handleClick = () => {
    setError(!error)
  }
  return (
    <>
      <Title>Создать аккаунт</Title>
      <InputLabel>Имя(*)</InputLabel>
      <StyledInput type="text" placeholder={'Иван Иванов'} value={name} onChange={(e) => setName(e.target.value)} />
      <InputLabel>Email(*)</InputLabel>
      <StyledInput
        type="text"
        placeholder={'example@mail.org'}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Passwords>
        <Pass>
          <InputLabel>Пароль(*)</InputLabel>
          <StyledInput
            type="text"
            placeholder={'****'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Pass>
        <Pass>
          <InputLabel>Повторите(*)</InputLabel>
          <StyledInput
            type="text"
            placeholder={'****'}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </Pass>
      </Passwords>
      <FormButton onClick={handleClick}>Создать аккаунт</FormButton>
    </>
  )
}

const Pass = styled.div`
  display: flex;
  flex-direction: column;
`

const Passwords = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
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
  margin-top: 20px;

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
  width: calc(100% - 24px);
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

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`
export default SignupForm
