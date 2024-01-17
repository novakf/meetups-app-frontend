import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import { userData } from '../../../store/slices/userSlice'
import axios from 'axios'
import { MeetupsType } from '../../../types'
import { filterData } from '../../../store/slices/meetupsFilterSlice'
import RejectIcon from '../../../icons/RejectIcon'
import AcceptIcon from '../../../icons/AcceptIcon'
import { useDispatch } from 'react-redux'
import { setMessage, useInterval } from '../../../utils'
import Tooltip from '../../../components/Tooltip'

const MeetupsTable: React.FC = () => {
  const user = userData()
  const filter = filterData()

  const dispatch = useDispatch()

  const [meetups, setMeetups] = useState<MeetupsType[]>([])
  // const [fetch, setFetch] = useState(true)

  const getStatus = () => {
    let arr: string[] = []
    filter.status.forEach((status: any) => arr.push(status.value))

    return arr
  }

  useEffect(() => {
    getMeetups()
  }, [filter.status, filter.endDate, filter.startDate])

  useInterval(() => getMeetups(), 2000)

  const getMeetups = () => {
    axios
      .get(`http://localhost:3001/meetups`, {
        params: { status: getStatus(), startDate: filter.startDate, endDate: filter.endDate },
      })
      .then((res) => setMeetups(res.data))
      .catch((err) => console.log(err))
  }

  const acceptMeetup = (id: number) => {
    axios
      .put(`http://localhost:3001/meetups/complete/moderator/${id}`, { status: 'утвержден' })
      .then(() => {
        getMeetups()
        setMessage({ messageText: 'Митап успешно утвержден' }, dispatch)
      })
      .catch((err) => console.log(err))
  }

  const rejectMeetup = (id: number) => {
    axios
      .put(`http://localhost:3001/meetups/complete/moderator/${id}`, { status: 'отклонен' })
      .then(() => {
        getMeetups()
        setMessage({ messageText: 'Митап успешно отклонен' }, dispatch)
      })
      .catch((err) => console.log(err))
  }

  return (
    <Table>
      <RowExample $moder={user.role === 'модератор'}>
        <Cell>№</Cell>
        {user.role === 'модератор' && <Cell style={{ textAlign: 'start' }}>Организатор</Cell>}
        <Cell style={{ textAlign: 'start' }}>Название</Cell>
        <Cell style={{ textAlign: 'start' }}>Место проведения</Cell>
        <Cell>Спикеры</Cell>
        <Cell>Дата проведения</Cell>
        <Cell>Дата создания</Cell>
        <Cell>Статус заявки</Cell>
      </RowExample>
      {meetups.map((meetup, i) => {
        let dateCreate = new Date()
        let date = new Date()
        if (meetup.createdAt) dateCreate = new Date(meetup.createdAt)
        if (meetup.date) date = new Date(meetup.date)
        let created = dateCreate.toLocaleDateString('ru-RU')
        let dateStr = date.toLocaleDateString('ru-RU')
        return (
          meetup.creatorLogin?.toLocaleLowerCase().includes(filter.organizator.toLocaleLowerCase()) && (
            <RowLink to={`/profile/meetups/${meetup.id}`} key={meetup.id}>
              <Row $moder={user.role === 'модератор'}>
                <Cell>{++i}</Cell>
                {user.role === 'модератор' && <Cell style={{ textAlign: 'start' }}>{meetup.creatorLogin}</Cell>}
                <Cell style={{ textAlign: 'start' }}>{meetup.title}</Cell>
                <Cell style={{ textAlign: 'start' }}>{meetup.place}</Cell>
                <Cell>{meetup.speakers?.length}</Cell>
                <Cell>{dateStr}</Cell>
                <Cell>{created}</Cell>
                {meetup.status === 'сформирован' ? (
                  <ActionCell style={{ color: '#000' }}>
                    <div>{meetup.status}</div>
                    <ButtonGroup
                      onClick={(e) => {
                        e.preventDefault()
                      }}
                    >
                      <Tooltip title={<div>Утвердить</div>}>
                        <ClearButton
                          onClick={(e) => {
                            e.preventDefault()
                            acceptMeetup(meetup.id)
                          }}
                        >
                          <AcceptIcon />
                        </ClearButton>
                      </Tooltip>
                      <Tooltip title={<div>Отклонить</div>}>
                        <ClearButton
                          onClick={(e) => {
                            e.preventDefault()
                            rejectMeetup(meetup.id)
                          }}
                        >
                          <RejectIcon />
                        </ClearButton>
                      </Tooltip>
                    </ButtonGroup>
                  </ActionCell>
                ) : (
                  <Cell style={{ color: meetup.status === 'отклонен' ? '#d70000' : 'green' }}>
                    <Tooltip title={<div>Заявка обработана!</div>}>{meetup.status}</Tooltip>
                  </Cell>
                )}
              </Row>
            </RowLink>
          )
        )
      })}
    </Table>
  )
}

const ClearButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: scale(1.2);
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
`

const Cell = styled.div`
  border-bottom: 1px solid #a9a9a9;
  text-align: center;
  padding-bottom: 10px;
`

const ActionCell = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #a9a9a9;
  text-align: center;
  padding-bottom: 10px;

  ${ButtonGroup} {
    position: absolute;
    opacity: 0;
    transition: 0.3s;
    svg {
      height: 24px;
    }
  }

  div {
    transition: 0.3s;
  }

  &:hover {
    & > div {
      opacity: 0;
    }
    ${ButtonGroup} {
      opacity: 1;
    }
  }
`

const Table = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`

const RowExample = styled.div<{ $moder: boolean }>`
  display: grid;
  grid-template-columns: 5% 21% 20% 10% 15% 15% 13%;
  border: 15px;
  padding-top: 10px;
  font-weight: 700;

  ${(p) =>
    p.$moder &&
    `
  grid-template-columns: 5% 18% 16% 8% 10% 15% 15% 13%;
  `}
`

const Row = styled.div<{ $moder: boolean }>`
  display: grid;
  grid-template-columns: 5% 21% 20% 10% 15% 15% 13%;
  border: 15px;
  padding-top: 10px;
  cursor: pointer;

  &:hover {
    background: #f1f1f1;

    //    ${ActionCell} > div {
    //      opacity: 0;
    //    }
    //
    //    ${ButtonGroup} {
    //      opacity: 1 !important;
    //    }
  }

  ${(p) =>
    p.$moder &&
    `
  grid-template-columns: 5% 18% 16% 8% 10% 15% 15% 13%;
  `}
`

const RowLink = styled(Link)`
  text-decoration: none;
  color: #000;
`

export default MeetupsTable
