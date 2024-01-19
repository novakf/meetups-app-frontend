import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../../components/Breadcrumbs'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import BinIcon from '../../icons/BinIcon'
import PlusIcon from '../../icons/PlusIcon'
import { useMessage } from '../../utils'
import { useDispatch } from 'react-redux'
import { Service, Speaker } from '../../../../generated/api'

const SpeakersEditablePage: React.FC = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([])

  const dispatch = useDispatch()

  useEffect(() => {
    getSpeakers()
  }, [])

  const getSpeakers = () => {
    Service.speakersControllerGetByCompany()
      .then((res) => {
        setSpeakers(res.speakers)
      })
      .catch((error) => {
        console.log('SpeakersError', error)
      })
  }

  const deleteSpeaker = (id: number) => {
    Service.speakersControllerDelete(id)
      .then(() => {
        getSpeakers()
        // setSpeakers(res.data.speakers)
        useMessage({ messageText: 'Спикер успешно удален' }, dispatch)
      })
      .catch((error) => {
        console.log('SpeakersError', error)
      })
  }

  return (
    <Container>
      <FirstLine>
        <Breadcrumbs>
          <SLink to={'/'}>Домашняя страница</SLink>
          <SLink to={'/speakers/moderation'}>Модерация спикеров</SLink>
        </Breadcrumbs>
        <SLink to={`/speakers/moderation/new`}>
          <AddButton>
            <div>Добавить спикера</div>
            <PlusIcon />
          </AddButton>
        </SLink>
      </FirstLine>

      <Table>
        <RowExample>
          <Cell>№</Cell>
          <Cell>Имя</Cell>
          <Cell>Телефон</Cell>
          <Cell>Почта</Cell>
          <Cell>Организация</Cell>
          <Cell>Описание</Cell>
          <Cell>Фото</Cell>
          <Cell></Cell>
        </RowExample>
        {speakers.map((speaker, i) => (
          <RowLink to={`/speakers/moderation/${speaker.id}`} key={speaker.id}>
            <Row>
              <Cell>{++i}</Cell>
              <Cell>{speaker.name}</Cell>
              <Cell>{speaker.phone}</Cell>
              <Cell>{speaker.email}</Cell>
              <Cell>{speaker.organization ? speaker.organization : '-'}</Cell>
              <Cell>{speaker.description ? speaker.description : '-'}</Cell>
              <Cell>
                <AvatarContainer style={{ margin: 'auto' }}>
                  <SpeakerAvatar src={speaker.avatarImg} />
                </AvatarContainer>
              </Cell>
              <Cell>
                <DeleteButton
                  onClick={(e) => {
                    e.preventDefault()
                    deleteSpeaker(speaker.id)
                  }}
                >
                  <BinIcon />
                </DeleteButton>
              </Cell>
            </Row>
          </RowLink>
        ))}
      </Table>
    </Container>
  )
}

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s;
  background: none;
  border-radius: 15px;
  border: 1px solid #d5d5d5;
  padding: 0 15px;
  font-size: 14px;
  height: 40px;

  &:hover {
    path {
      fill: green;
    }
    border-color: green;
  }

  svg {
    width: 24px;
  }
`

const DeleteButton = styled.button`
  cursor: pointer;
  transition: all 0.3s;
  background: none;
  border: none;
  padding: 0;

  &:hover {
    path {
      stroke: red;
    }
  }

  svg {
    width: 30px;
  }
`

const SpeakerAvatar = styled.img`
  width: 100%;
`

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid #d5d5d5;
  height: 60px;
  width: 60px;
  overflow: hidden;
  background: rgb(224, 224, 224);
`

const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #a9a9a9;
  text-align: center;
  padding-bottom: 10px;
`

const Table = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`

const RowExample = styled.div`
  display: grid;
  grid-template-columns: 2% 17% 10% 14% 13% 30% 7% 7%;
  border: 15px;
  padding-top: 10px;
  font-weight: 700;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 2% 17% 10% 14% 13% 30% 7% 7%;
  border: 15px;
  padding-top: 10px;
  cursor: pointer;

  &:hover {
    background: #f1f1f1;
  }
`

const RowLink = styled(Link)`
  text-decoration: none;
  color: #000;
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

export default SpeakersEditablePage
