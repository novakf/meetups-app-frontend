import React from 'react'
import { styled } from 'styled-components'
import { SpeakerType } from '../../../types'

const Speaker: React.FC<SpeakerType> = (speaker) => {
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
        <StyledInput>{speaker.MeetupsSpeakers?.startsAt}</StyledInput>
        <InputLabel>Конец выступления</InputLabel>
        <StyledInput>{speaker.MeetupsSpeakers?.endsAt}</StyledInput>
        <InputLabel>Тема выступления</InputLabel>
        <StyledInput>{speaker.MeetupsSpeakers?.reportTheme}</StyledInput>
      </SpeakerForm>
    </SpeakerContainer>
  )
}

const InputLabel = styled.div`
  color: #1e1e1e;
  font-size: 20px;
  margin-top: 30px;
`

const StyledInput = styled.div<{ $error?: boolean }>`
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
