import React, { useState } from 'react'
import { styled } from 'styled-components'
import { SpeakerType } from '../../../types'
import axios from 'axios'
import { setDraftDataAction } from '../../../store/slices/draftSlice'
import { useDispatch } from 'react-redux'

const Speaker: React.FC<SpeakerType> = (speaker) => {
  const [start, setStart] = useState(speaker.MeetupsSpeakers?.startsAt ? speaker.MeetupsSpeakers.startsAt : '')
  const [end, setEnd] = useState(speaker.MeetupsSpeakers?.endsAt ? speaker.MeetupsSpeakers.endsAt : '')
  const [title, setTitle] = useState(speaker.MeetupsSpeakers?.reportTheme ? speaker.MeetupsSpeakers.reportTheme : '')

  const dispatch = useDispatch() 

  const saveSpeaker = (id: number, startsAt: string, endsAt: string, reportTheme: string) => {
    axios
      .put(`http://localhost:3001/meetups/speaker/${id}`, {
        startsAt,
        endsAt,
        reportTheme,
      })
      .then((res) => {
        console.log('res', res)
        dispatch(setDraftDataAction(res.data))
      })
      .catch((err) => console.log(err))
  }

  const deleteSpeaker = (id: number) => {
    axios
      .delete(`http://localhost:3001/meetups/speaker/${id}`)
      .then((res) => {
        dispatch(setDraftDataAction(res.data))
        console.log(res)
      })
      .catch((err) => console.log(err))
  }

  return (
    <SpeakerContainer>
      <SpeakerInfo>
        <AvatarContainer>
          <SpeakerAvatar src={speaker.avatarImg} />
        </AvatarContainer>
        <Info>
          <SpeakerName>{speaker.name}</SpeakerName>
          <SpeakerCompany>{speaker.organization}</SpeakerCompany>
        </Info>
      </SpeakerInfo>
      <SpeakerForm id={`${speaker.id}`}>
        <InputLabel style={{ marginTop: '0px' }}>Начало выступления</InputLabel>
        <StyledInput type="time" value={start} onChange={(e) => setStart(e.target.value)} />
        <InputLabel>Конец выступления</InputLabel>
        <StyledInput type="time" value={end} onChange={(e) => setEnd(e.target.value)} />
        <InputLabel>Тема выступления</InputLabel>
        <StyledInput
          style={{ marginTop: '0px' }}
          type="text"
          placeholder="Тема"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Action>
          <SaveButton type="button" onClick={() => saveSpeaker(speaker.id, start, end, title)}>
            Сохранить
          </SaveButton>
          <DeleteButton type="button" onClick={() => deleteSpeaker(speaker.id)}>
            Убрать
          </DeleteButton>
        </Action>
      </SpeakerForm>
    </SpeakerContainer>
  )
}

const Action = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  gap: 20px;
  justify-content: center;
`

const SaveButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #838383;
  font-size: 16px;

  &:hover {
    color: #00990d;
  }
`

const InputLabel = styled.div`
  color: #1e1e1e;
  font-size: 20px;
  margin-top: 30px;
`

const StyledInput = styled.input<{ $error?: boolean }>`
  margin-top: 15px;
  border: none;
  padding: 0px;
  outline: none;
  border-bottom: 2px solid #dddddd;
  padding: 6px 10px;
  font-size: 14px;
  transition: all 0.2s;
  width: 100%;

  height: 30px;

  &:focus {
    border-bottom: 2px solid #898989;
  }

  ${(p) => p.$error && `border-bottom: 2px solid #ff000082;`}
`

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #838383;
  font-size: 16px;

  &:hover {
    color: red;
  }
`

const SpeakerAvatar = styled.img`
  width: 100%;
`

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

const Info = styled.div``

const SpeakerForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 60%;
`

const SpeakerName = styled.div`
  font-size: 24px;
`

const SpeakerCompany = styled.div`
  font-size: 18px;
  color: #00ddff;
`

const SpeakerInfo = styled.div`
  display: flex;
  width: 300px;
  gap: 10px;
  height: fit-content;
  align-items: center;
`

const SpeakerContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`

export default Speaker
