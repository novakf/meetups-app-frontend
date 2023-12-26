import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../../components/Breadcrumbs'
import { Link, useLocation } from 'react-router-dom'
import { styled } from 'styled-components'
import speakersMock from '../../mocks/speakers'
import SearchIcon from '../../icons/SearchIcon'
import { SpeakerType } from '../../types'

const SpeakersPage: React.FC = () => {
  let companyQuery = useLocation().search.split('company=')[1]
    ? (useLocation().search.split('company=')[1] as string)
    : ''
  const [company, setCompany] = useState(companyQuery)
  const [searchValue, setSearchValue] = useState(companyQuery)
  const [speakers, setSpeakers] = useState<SpeakerType[]>([])
  const [response, setResponse] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`http://localhost:3001/speakers/?company=${company}`)
      .then((response) => {
        if (!response) {
          setResponse(true)
        }
        return response.text()
      })
      .then((data) => {
        setSpeakers(JSON.parse(data).speakers)
        setLoading(false)
      })
      .catch((error) => {
        console.log("SpeakersError", error)
        if (!response) setSpeakers(speakersMock)
      })
  }, [])

  const handleOrgEnter = (event: React.KeyboardEvent) => {
    let value = (event.target as HTMLInputElement).value
    if (event.key === 'Enter') {
      setCompany(value)
      window.location.href = `?company=${value}`
    }
  }

  return (
    <Container>
      <Breadcrumbs>
        <SLink to={'/'}>Домашняя страница</SLink>
        <SLink to={'/speakers'}>Спикеры</SLink>
      </Breadcrumbs>

      <SearchContainer>
        <input
          placeholder="Введите название компании"
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
          onKeyDown={handleOrgEnter}
        />
        <button
          onClick={() => {
            setCompany(searchValue)
            window.location.href = `?company=${searchValue}`
          }}
        >
          <SearchIcon />
        </button>
      </SearchContainer>

      {speakers[0] ? (
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
                </SpeakerCard>
              )
            )
          })}
        </SpeakersContainer>
      ) : (
        <NotFound>{!loading && 'Спикеры не найдены'}</NotFound>
      )}
    </Container>
  )
}

const NotFound = styled.div`
  text-align: center;
  font-size: 16px;
  color: #525252;
`

const SearchContainer = styled.div`
  display: flex;
  padding: 30px 0;
  height: 50px;
  gap: 10px;

  input {
    font-size: 16px;
    display: flex;
    width: 100%;
    align-items: center;
    gap: 8px;
    border: 0.5px solid #f1f1f1;
    border-radius: 5px;
    outline: none;
    padding: 0 10px;
    &::placeholder {
      color: #afadb5;
    }
    &:hover {
      border: 0.5px solid #545455;
    }
    transition: border-color 700ms;
    &:focus {
      border: 0.5px solid #afadb591;
    }
  }

  button {
    color: #3b3b3b;
    font-family: Roboto;
    font-size: 18px;
    font-weight: 400;
    padding: 0px 20px;
    border-radius: 5px;
    border: none;
    background: transparent;

    transition: background 300ms;
    &:hover:not(:disabled) {
      background: #efefef;
      cursor: pointer;
    }

    &:active:not(:disabled) {
      background: #d1d1d1;
    }
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

const SLink = styled(Link)`
  text-decoration: none;
  color: #000;

  &:hover {
    color: #535353;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  padding: 101px 40px 20px 40px;
  margin: 0 auto;
`

export default SpeakersPage
