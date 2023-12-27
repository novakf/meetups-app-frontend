import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import Breadcrumbs from '../../components/Breadcrumbs'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Speaker from './Speaker'
import { MeetupsType } from '../../types'

const MeetupPage: React.FC = () => {
  const [meetup, setMeetup] = useState<MeetupsType | null>(null)

  const id = useLocation().pathname.split('/')[3]

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`http://localhost:3001/meetups/${id}`)
      .then((res) => setMeetup(res.data))
      .catch((err) => console.log(err))
  }, [])

  return (
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
          <InputLabel>Заголовок</InputLabel>
          <StyledInput>{meetup?.title}</StyledInput>
          <InputLabel>Место</InputLabel>
          <StyledInput>{meetup.place}</StyledInput>
          <InputLabel>Дата проведения</InputLabel>
          <StyledInput>{meetup.date}</StyledInput>
          <InputLabel>Описание</InputLabel>
          <StyledInput>{meetup.description}</StyledInput>
          <InputLabelSpeakers>Участвующие спикеры</InputLabelSpeakers>
          {meetup?.speakers?.map((speaker) => {
            return <Speaker {...speaker} key={speaker.id} />
          })}
          <SaveButton onClick={() => navigate('/profile/meetups')}>{"< Вернуться"}</SaveButton>
        </Constructor>
      ) : (
        <NotFound>Митап не найден</NotFound>
      )}
    </Container>
  )
}

const SaveButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #838383;
  font-size: 20px;

  &:hover {
    color: #00990d;
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
  margin: 0 auto;
  width: 60%;
`

const InputLabel = styled.div`
  color: #1e1e1e;
  font-size: 20px;
  margin-top: 30px;
`

const InputLabelSpeakers = styled.div`
  color: #1e1e1e;
  font-size: 25px;
  margin-top: 30px;

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
