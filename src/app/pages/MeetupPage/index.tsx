import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import Breadcrumbs from '../../components/Breadcrumbs'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Speaker from './components/Speaker'
import { draftData } from '../../store/slices/draftSlice'
import Draft from './components/Draft'
import { Meetup, Service } from '../../../../generated/api'

const MeetupPage: React.FC = () => {
  const [meetup, setMeetup] = useState<Meetup | null>(null)

  const id = Number(useLocation().pathname.split('/')[3])
  const draft = draftData()

  const navigate = useNavigate()

  useEffect(() => {
    Service.meetupsControllerGetById(id)
      .then((res) => setMeetup(res))
      .catch((err) => console.log(err))
  }, [])

  return id === draft?.id ? (
    <Draft />
  ) : (
    <Container>
      <FirstLine>
        <Breadcrumbs>
          <SLink to={'/'}>Домашняя страница</SLink>
          <SLink to={'/profile/meetups'}>Мои митапы</SLink>
          <SLink to={`/profile/meetups/${meetup?.id}`}>{meetup?.title}</SLink>
        </Breadcrumbs>
      </FirstLine>

      {meetup ? (
        <Constructor>
          <Block>
            <InputLabelSpeakers>Основная информация</InputLabelSpeakers>
            <InputLabel>Заголовок</InputLabel>
            <StyledInput>{meetup?.title}</StyledInput>
            <InputLabel>Место</InputLabel>
            <StyledInput>{meetup.place}</StyledInput>
            <InputLabel>Дата проведения</InputLabel>
            <StyledInput>{meetup.date}</StyledInput>
            <InputLabel>Описание</InputLabel>
            <StyledTextArea value={meetup.description} readOnly />
          </Block>
          <div style={{ width: '45%' }}>
            <InputLabelSpeakers>Участвующие спикеры</InputLabelSpeakers>
            {meetup?.speakers?.map((speaker) => {
              return <Speaker speaker={speaker} key={speaker.id} />
            })}
            <SaveButton onClick={() => navigate('/profile/meetups')}>{'< Вернуться'}</SaveButton>
          </div>
        </Constructor>
      ) : (
        <NotFound>Митап не найден</NotFound>
      )}
    </Container>
  )
}

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

const Block = styled.div`
  width: 45%;
  padding-right: 70px;
  border-right: 2px solid #e5e5e5;
`

const SaveButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #838383;
  font-size: 20px;

  &:hover {
    color: #001d8d;
  }

  margin-top: 20px;
`

const NotFound = styled.div`
  text-align: center;
  font-size: 16px;
  color: #525252;
  margin-top: 20px;
`

const Constructor = styled.div`
  display: flex;
  justify-content: space-between;
`

const InputLabel = styled.div`
  color: #1e1e1e;
  font-size: 20px;
  margin-top: 30px;
`

const InputLabelSpeakers = styled.div`
  color: #1e1e1e;
  font-size: 25px;

  padding-top: 30px;
`

const StyledInput = styled.div<{ $error?: boolean }>`
  margin-top: 15px;
  border: none;
  padding: 0px;
  outline: none;
  border-bottom: 2px solid #dddddd;
  padding: 6px 10px;
  font-size: 16px;
  transition: all 0.2s;
  width: 100%;

  height: 30px;

  &:focus {
    border-bottom: 2px solid #898989;
  }

  ${(p) => p.$error && `border-bottom: 2px solid #ff000082;`}
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

export default MeetupPage
