import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import { SpeakerType } from '../../../types'
import { draftData, setDraftDataAction } from '../../../store/slices/draftSlice'
import { useDispatch } from 'react-redux'
import { userData } from '../../../store/slices/userSlice'

type Props = {
  company: string
  speakers: SpeakerType[]
}

const Speakers: React.FC<Props> = ({ company, speakers }) => {
  const dispatch = useDispatch()

  const draft = draftData()
  const user = userData()

  const getSpeakers = () => {
    axios
      .get(`http://localhost:3001/speakers/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        //  dispatch(setDraftDataAction(res.data.meetup))
      })
      .catch((error) => {
        console.log('SpeakersError', error)
      })
  }

  const addSpeaker = (id: number) => {
    axios
      .post(`http://localhost:3001/speakers/${id}`)
      .then((res) => {
        getSpeakers()
        dispatch(setDraftDataAction(res.data))
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const deleteSpeaker = (id: number) => {
    axios
      .delete(`http://localhost:3001/meetups/speaker/${id}`)
      .then((res) => {
        getSpeakers()
        dispatch(setDraftDataAction(res.data))
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return (
    <SpeakersContainer>
      {speakers.map((speaker) => {
        return (
          (speaker.organization?.toLocaleLowerCase().includes(company.toLocaleLowerCase()) ||
            (!company && !speaker.organization)) && (
            <SpeakerCard key={speaker.id}>
              <LinkToSpeaker to={`/speakers/${speaker.id}`}>
                <ImageContainer>
                  <Avatar src={speaker.avatarImg} />
                </ImageContainer>
                <Content>
                  <Name>{speaker.name}</Name>
                  <Info>{speaker.organization}</Info>
                </Content>
              </LinkToSpeaker>

              {user &&
                user.id !== -1 &&
                (draft?.speakers?.some((element) => {
                  if (element.id === speaker.id) return true
                  return false
                }) ? (
                  <DeleteButton onClick={() => deleteSpeaker(speaker.id)}>Убрать из митапа</DeleteButton>
                ) : (
                  <AddButton onClick={() => addSpeaker(speaker.id)}>Добавить в митап</AddButton>
                ))}
            </SpeakerCard>
          )
        )
      })}
    </SpeakersContainer>
  )
}

const DeleteButton = styled.button`
  background: none;
  border: 1px solid #ff9d9d;
  padding: 8px 20px;
  border-radius: 15px;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s;

  &:hover {
    background: #ff9d9d;
  }
`

const AddButton = styled.button`
  background: none;
  border: 1px solid #91ff94;
  padding: 8px 20px;
  border-radius: 15px;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s;
  &:hover {
    background: #91ff94;
  }
`

const Info = styled.div`
  color: #00ddff;
  height: 18px;
`

const Name = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  color: #000;
  text-overflow: ellipsis;
  font-family: Roboto;
  font-size: 26px;
  font-style: normal;
  font-weight: 500;
  padding: 0 0 8px 0;
  text-align: center;
`

const Avatar = styled.img`
  width: 100%;
  transition: transform 0.3s ease-out;
  background: #afadb5;
`

const Content = styled.div`
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const ImageContainer = styled.div`
  display: flex;
  height: 170px;
  width: 170px;
  overflow: hidden;
  border-radius: 50%;
  margin: 0;
`

const LinkToSpeaker = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: inherit;
  width: 220px;
  align-items: center;
`

const SpeakerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  &:hover {
    ${Avatar} {
      transform: scale(1.16);
    }
  }
`

const SpeakersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 30px 0;
  gap: 60px;

  @media (max-width: 751px) {
    justify-content: center;
  }
`

export default Speakers
