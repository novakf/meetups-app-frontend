import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import { userData } from '../../../store/slices/userSlice'
import axios from 'axios'
import { MeetupsType } from '../../../types'
import { filterData } from '../../../store/slices/meetupsFilterSlice'

const MeetupsTable: React.FC = () => {
  const user = userData()
  const filter = filterData()

  const [meetups, setMeetups] = useState<MeetupsType[]>([])

  const getStatus = () => {
    let arr: string[] = []
    filter.status.forEach((status: any) => arr.push(status.value))

    return arr
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3001/meetups`, {
        params: { status: getStatus(), startDate: filter.startDate, endDate: filter.endDate },
      })
      .then((res) => setMeetups(res.data))
      .catch((err) => console.log(err))
  }, [filter])

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
          <RowLink to={`/profile/meetups/${meetup.id}`} key={meetup.id}>
            <Row $moder={user.role === 'модератор'}>
              <Cell>{++i}</Cell>
              {user.role === 'модератор' && <Cell style={{ textAlign: 'start' }}>{meetup.creatorLogin}</Cell>}
              <Cell style={{ textAlign: 'start' }}>{meetup.title}</Cell>
              <Cell style={{ textAlign: 'start' }}>{meetup.place}</Cell>
              <Cell>{meetup.speakers?.length}</Cell>
              <Cell>{dateStr}</Cell>
              <Cell>{created}</Cell>
              <Cell style={{ color: meetup.status == 'отклонен' ? '#d70000' : '#000' }}>{meetup.status}</Cell>
            </Row>
          </RowLink>
        )
      })}
    </Table>
  )
}

const Cell = styled.div`
  border-bottom: 1px solid #a9a9a9;
  text-align: center;
  padding-bottom: 10px;
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
  grid-template-columns: 5% 17% 16% 8% 10% 15% 15% 13%;
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
  }

  ${(p) =>
    p.$moder &&
    `
  grid-template-columns: 5% 17% 16% 8% 10% 15% 15% 13%;
  `}
`

const RowLink = styled(Link)`
  text-decoration: none;
  color: #000;
`

export default MeetupsTable
