import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../../components/Breadcrumbs'
import { styled } from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import speakersMock from '../../mocks/speakers'
import { SpeakerType } from '../../types'
import axios from 'axios'
import { draftData } from '../../store/slices/draftSlice'
import { isLoggedIn, userData } from '../../store/slices/userSlice'

const SingleSpeakerPage: React.FC = () => {
  const [response, setResponse] = useState(false)
  const [currentSpeaker, setCurrentSpeaker] = useState<SpeakerType | undefined>()
  const [loading, setLoading] = useState(true)

  const location = useLocation()
  const speakerId = Number(location.pathname.split('/')[2])

  const draft = draftData()
  const user = userData()
  const loggedIn = isLoggedIn()

  useEffect(() => {
    setLoading(true)
    axios
      .get(`http://localhost:3001/speakers/${speakerId}`)
      .then((response) => {
        if (response) {
          setResponse(true)
        }
        return response
      })
      .then((result) => {
        setCurrentSpeaker(result.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log('SpeakerError', error)
        setLoading(false)
        if (!response) setCurrentSpeaker(speakersMock.find((speaker) => speaker.id === speakerId))
      })
  }, [])

  const draftSpeakersCount = draft?.speakers?.length

  return currentSpeaker ? (
    <Container>
      <FirstLine>
        <Breadcrumbs>
          <SLink to={'/'}>Домашняя страница</SLink>
          <SLink to={'/speakers'}>Спикеры</SLink>
          <SLink to={'/speakers/'}>{currentSpeaker.name}</SLink>
        </Breadcrumbs>
        {loggedIn && (
          <CartContainer $empty={!Boolean(draft)}>
            {user && (
              <>
                <Cart to={'/profile/draft'} $disabled={!Boolean(draft)}>
                  Моя заявка
                </Cart>
                <Count>{draftSpeakersCount}</Count>
              </>
            )}
          </CartContainer>
        )}
      </FirstLine>
      <SpeakerContainer>
        <Banner>
          <AvatarContainer>
            <Avatar src={currentSpeaker.avatarImg} />
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
  ) : (
    <Container>
      <Error>{!loading && 'Спикер не найден'}</Error>
    </Container>
  )
}

const CartContainer = styled.div<{ $empty: boolean }>`
  display: flex;

  ${(p) =>
    p.$empty &&
    `
    opacity: 0.4;
  `}
`

const Count = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: #5dc2ff;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  text-align: center;
  top: -10px;
  left: -20px;
  z-index: 2;
`

const FirstLine = styled.div`
  display: flex;
  justify-content: space-between;
`

const Cart = styled(Link)<{ $disabled: boolean }>`
  display: flex;
  text-decoration: none;
  padding: 8px 20px;
  border-radius: 15px;
  border: 1px solid #d5d5d5;
  gap: 10px;
  width: fit-content;
  z-index: 1;
  color: #000;

  &:hover {
    border: 1px solid #878787;
  }

  ${(p) =>
    p.$disabled &&
    `
    pointer-events: none;
  `}
`

const Error = styled.div`
  display: flex;
  justify-content: center;
  font-size: 16px;
`

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

  @media (max-width: 500px) {
    width: 100%;
  }
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

  @media (max-width: 500px) {
    width: 100%;
  }
`

const Info = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`

const CompanyName = styled.div`
  font-size: 25px;
  color: #00ddff;

  @media (max-width: 500px) {
    font-size: 18px;
  }
`

const Name = styled.div`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #2c2e51;

  @media (max-width: 500px) {
    font-size: 30px;
  }
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
  max-height: 180px;
  max-width: 180px;
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
  text-wrap: nowrap;

  &:hover {
    color: #535353;
  }
`

export default SingleSpeakerPage
