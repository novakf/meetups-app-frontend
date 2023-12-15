import React from 'react'
import Breadcrumbs from '../../components/Breadcrumbs'
import { styled } from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import speakers from '../../mocks/speakers'

const SingleSpeakerPage: React.FC = () => {
  const location = useLocation()
  const speakerId = Number(location.pathname.split('/')[2])

  let currentSpeaker: any = speakers.find((speaker) => speaker.id === speakerId)

  return (
    <Container>
      <Breadcrumbs>
        <SLink to={'/'}>Домашняя страница</SLink>
        <SLink to={'/speakers'}>Спикеры</SLink>
        <SLink to={'/speakers/'}>{currentSpeaker.name}</SLink>
      </Breadcrumbs>

      <SpeakerContainer>
        <Banner>
          <AvatarContainer>
            <Avatar src={currentSpeaker.avatar_img} />
          </AvatarContainer>
          <MainInfo>
            <Name>{currentSpeaker.name}</Name>
            <CompanyName>{currentSpeaker.organization}</CompanyName>
          </MainInfo>
        </Banner>
        <Info>
          <About>
            <Title>Обо мне</Title>
            <Text>{currentSpeaker.description}</Text>
          </About>
          <Contacts>
            <ContactsContainer>
              <TitleSmall>Телефон:</TitleSmall>
              <Text>{currentSpeaker.phone}</Text>
              <TitleSmall>Почта:</TitleSmall>
              <Email>{currentSpeaker.email}</Email>
            </ContactsContainer>
          </Contacts>
        </Info>
      </SpeakerContainer>
    </Container>
  )
}

const SpeakerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`

const Email = styled.div`
  font-size: 16px;
  color: #525252;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const TitleSmall = styled.div`
  font-size: 16px;
  margin-bottom: 4px;
  color: #535c65;
  font-weight: 600;
`

const ContactsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  border-radius: 10px;
  box-shadow: 0px 4px 15px 0px #39393942;
  padding: 10px;
  background: white;
`

const Contacts = styled.div`
  width: 40%;
`

const Text = styled.div`
  font-size: 16px;
  color: #525252;
  margin-bottom: 10px;
`

const Title = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
`

const About = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`

const Info = styled.div`
  display: flex;
  gap: 20px;
`

const CompanyName = styled.div`
  font-size: 25px;
  color: #00ddff;
`

const Name = styled.div`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #2c2e51;
`

const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
`

const Avatar = styled.img`
  width: 100%;
`

const AvatarContainer = styled.div`
  display: flex;
  height: 180px;
  width: 180px;
  overflow: hidden;
  border-radius: 50%;
  margin: 0;
`

const Banner = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 1px solid #c9c9c9;
  padding-bottom: 30px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  padding: 101px 40px 20px 40px;
  margin: 0 auto;
  min-height: calc(100vh - 162px);
`

const SLink = styled(Link)`
  text-decoration: none;
  color: #000;

  &:hover {
    color: #535353;
  }
`

export default SingleSpeakerPage
