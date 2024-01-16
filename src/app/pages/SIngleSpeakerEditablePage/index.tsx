import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import Breadcrumbs from '../../components/Breadcrumbs'
import axios from 'axios'
import GenericFileUpload from './components/GenericFileUpload'
import GenericMessage from '../../components/Message'

type Props = {
  isNew?: boolean
}

type Speaker = {
  id?: number
  name?: string
  phone?: string
  email?: string
  avatarImg?: string
  organization?: string
  description?: string
}

let SpeakerInitial = {
  name: '',
  phone: '',
  email: '',
  organization: '',
  description: '',
}

const SingleSpeakerEditablePage: React.FC<Props> = (props) => {
  const [currentSpeaker, setCurrentSpeaker] = useState<Speaker>(SpeakerInitial)
  const [avatar, setAvatar] = useState<File>()

  const navigate = useNavigate()
  const location = useLocation()
  const speakerId = Number(location.pathname.split('/')[3])

  const [status, setStatus] = useState('')
  const [message, setMessage] = useState(false)
  const [messageText, setMessageText] = useState('')

  useEffect(() => {
    !props.isNew && getSpeaker(speakerId)
  }, [])

  const getSpeaker = (speakerId: number) => {
    axios
      .get(`http://localhost:3001/speakers/${speakerId}`)
      .then((result) => {
        setCurrentSpeaker(result.data)
        setAvatar(result.data.avatarImg)
      })
      .catch((error) => {
        console.log('GetSpeakerError', error)
      })
  }

  const createSpeaker = () => {
    var formData = new FormData()
    currentSpeaker.name && formData.append('name', currentSpeaker.name)
    currentSpeaker.organization && formData.append('organization', currentSpeaker.organization)
    currentSpeaker.phone && formData.append('phone', currentSpeaker.phone)
    currentSpeaker.email && formData.append('email', currentSpeaker.email)
    currentSpeaker.description && formData.append('description', currentSpeaker.description)
    avatar && formData.append('file', avatar)

    axios
      .post(`http://localhost:3001/speakers/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        navigate('/speakers/moderation')
      })
      .catch((error) => {
        console.log('AddSpeakerError', error)
      })
  }

  const saveSpeaker = () => {
    var formData = new FormData()
    currentSpeaker.name && formData.append('name', currentSpeaker.name)
    currentSpeaker.organization && formData.append('organization', currentSpeaker.organization)
    currentSpeaker.phone && formData.append('phone', currentSpeaker.phone)
    currentSpeaker.email && formData.append('email', currentSpeaker.email)
    currentSpeaker.description && formData.append('description', currentSpeaker.description)
    avatar && formData.append('file', avatar)

    axios
      .put(`http://localhost:3001/speakers/${speakerId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        getSpeaker(speakerId)
        setMessage(true)
        setMessageText('Данные успешно сохранены')
        setStatus('success')
      })
      .catch((error) => {
        console.log('AddSpeakerError', error)
      })
  }

  return (
    <Container>
      <FirstLine>
        <Breadcrumbs>
          <SLink to={'/'}>Домашняя страница</SLink>
          <SLink to={'/speakers/moderation'}>Модерация спикеров</SLink>
          <SLink to={`/speakers/moderation/${speakerId}`}>{props.isNew ? 'Новый спикер' : currentSpeaker?.name}</SLink>
        </Breadcrumbs>
      </FirstLine>
      <SpeakerContainer>
        <Banner>
          <AvatarContainer>
            <GenericFileUpload chosenFile={avatar} handleFile={setAvatar} />
          </AvatarContainer>
          <Name
            value={currentSpeaker.name}
            placeholder="Имя*"
            onChange={(e) => setCurrentSpeaker({ ...currentSpeaker, name: e.target.value })}
            $empty={currentSpeaker.name === ''}
          />
          <Organization
            placeholder="Организация (необязательное)"
            value={currentSpeaker.organization ? currentSpeaker.organization : ''}
            onChange={(e) => setCurrentSpeaker({ ...currentSpeaker, organization: e.target.value })}
            $empty={currentSpeaker.organization === ''}
          />
        </Banner>
        <Form>
          <Contacts>
            <Field>
              <InputLabel>Телефон*</InputLabel>
              <StyledInput
                value={currentSpeaker.phone}
                placeholder="Номер телефона"
                onChange={(e) => setCurrentSpeaker({ ...currentSpeaker, phone: e.target.value })}
              />
            </Field>
            <Field>
              <InputLabel>Почта*</InputLabel>
              <StyledInput
                value={currentSpeaker.email}
                placeholder="Почта"
                onChange={(e) => setCurrentSpeaker({ ...currentSpeaker, email: e.target.value })}
              />
            </Field>
          </Contacts>
          <InputLabel>Описание</InputLabel>
          <StyledTextArea
            placeholder="Описание"
            value={currentSpeaker.description ? currentSpeaker.description : ''}
            onChange={(e) => setCurrentSpeaker({ ...currentSpeaker, description: e.target.value })}
          />
          {props.isNew ? (
            <SubmitButton onClick={createSpeaker}>Подтвердить</SubmitButton>
          ) : (
            <SubmitButton onClick={saveSpeaker}>Сохранить</SubmitButton>
          )}
        </Form>
      </SpeakerContainer>
      <GenericMessage status={status} open={message} text={messageText} setOpen={setMessage}/>
    </Container>
  )
}

const Field = styled.div`
  width: 45%;
`

const Contacts = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const InputLabel = styled.div`
  color: #1e1e1e;
  font-size: 20px;
  margin-top: 30px;
`

const StyledTextArea = styled.textarea`
  margin-top: 15px;
  border: 1px solid #cfcfcf;
  border-radius: 10px;
  padding: 0px;
  outline: none;
  border-bottom: 2px solid #dddddd;
  padding: 6px 10px;
  font-size: 14px;
  transition: all 0.2s;
  width: 100%;

  height: 50px;

  &:focus {
    border-bottom: 2px solid #898989;
  }
`

const SubmitButton = styled.button`
  border: none;
  border-radius: 10px;
  background: #003983;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-top: auto;
  cursor: pointer;
  width: 200px;

  &:hover {
    background: #00275b;
  }

  &:active {
    background: #01367d;
  }

  &:disabled {
    background: #dddddd;
    cursor: not-allowed;
    color: #353535;
  }
`

const StyledInput = styled.input<{ $error?: boolean }>`
  margin-top: 10px;
  border: none;
  padding: 0px;
  outline: none;
  border-bottom: 2px solid #dddddd;
  padding: 6px 10px;
  font-size: 16px;
  transition: all 0.2s;

  height: 30px;

  &:focus {
    border-bottom: 2px solid #898989;
  }

  ${(p) => p.$error && `border-bottom: 2px solid #ff000082;`}
`

const Organization = styled.input<{ $empty: boolean }>`
  font-size: 25px;
  color: #00ddff;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 10px;
  transition: 0.3s;
  margin-top: 10px;

  &:hover {
    border: 1px solid #dbdbdb;
  }

  &:focus {
    border: 1px solid #a3a3a3;
  }

  ${(props) => props.$empty && 'border-bottom: 1px solid #dbdbdb'}
`

const Name = styled.input<{ $empty: boolean }>`
  font-size: 34px;
  font-weight: bold;
  margin-top: 15px;
  color: #2c2e51;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 10px;
  transition: 0.3s;

  &:hover {
    border: 1px solid #dbdbdb;
  }

  &:focus {
    border: 1px solid #a3a3a3;
  }

  ${(props) => props.$empty && 'border-bottom: 1px solid #dbdbdb'}
`

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  border-right: 2px solid #dddddd;
  padding: 20px;
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding-left: 20px;
`

const SpeakerContainer = styled.div`
  display: flex;
  margin-top: 50px;
`

const AvatarContainer = styled.div`
  display: flex;
  height: 180px;
  width: 180px;
  overflow: hidden;
  border-radius: 90px;
  margin: 0;
  border: 1px solid #e9e9e9;
`

const SLink = styled(Link)`
  text-decoration: none;
  color: #000;

  &:hover {
    color: #535353;
  }
`

const FirstLine = styled.div`
  display: flex;
  justify-content: space-between;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  padding: 101px 40px 20px 40px;
  margin: 0 auto;
`

export default SingleSpeakerEditablePage