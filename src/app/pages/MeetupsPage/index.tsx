import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import Breadcrumbs from '../../components/Breadcrumbs'
import axios from 'axios'
import { MeetupsType } from '../../types'
import MultiDropdown from '../../components/MultiDropdown'
import { userData } from '../../store/slices/userSlice'
import { useDispatch } from 'react-redux'
import { filterData, setEndDataAction, setFilterDataAction, setStartDataAction } from '../../store/slices/filterSlice'

const MeetupsPage: React.FC = () => {
  const filter = filterData()

  const [meetups, setMeetups] = useState<MeetupsType[]>([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/meetups')
      .then((res) => setMeetups(res.data))
      .catch((err) => console.log(err))
  }, [])

  const options = [
    { key: 'Сформирован', value: 'сформирован' },
    { key: 'Отклонен', value: 'отклонен' },
    { key: 'Утвержден', value: 'утвержден' },
  ]

  const checkStatus = (status: string) => {
    let fl = 0
    filter.status.forEach((option: any) => {
      if (option.value == status) fl = 1
    })
    return fl
  }

  const defaultGetTitle = (elements: any) => elements.map((el: any) => el.key).join()

  const dateCompare = (first: Date, second: Date) => {
    if (first.getFullYear() > second.getFullYear()) return 1
    if (first.getFullYear() < second.getFullYear()) return 0
    if (first.getMonth() > second.getMonth()) return 1
    if (first.getMonth() < second.getMonth()) return 0
    if (first.getDate() > second.getDate()) return 1
    if (first.getDate() < second.getDate()) return 0

    return 0
  }

  const user = userData()
  const dispatch = useDispatch()

  return (
    <Container>
      <FirstLine>
        <Breadcrumbs>
          <SLink to={'/'}>Домашняя страница</SLink>
          <SLink to={'/profile/meetups'}>Мои митапы</SLink>
        </Breadcrumbs>
      </FirstLine>

      <Filter>
        <SMultiDropdown
          onChange={(e) => dispatch(setFilterDataAction(e))}
          value={filter.status}
          options={options}
          getTitle={defaultGetTitle}
        />
        <Dates>
          <div>
            <DateLabel>Начало</DateLabel>
            <StyledInput
              style={{ marginTop: '0px' }}
              type="date"
              placeholder={'Дата проведения'}
              value={filter.startDate}
              onChange={(e) => dispatch(setStartDataAction(e.target.value))}
            />
          </div>
          <div>
            <DateLabel>Конец</DateLabel>
            <StyledInput
              style={{ marginTop: '0px' }}
              type="date"
              placeholder={'Дата проведения'}
              value={filter.endDate}
              onChange={(e) => dispatch(setEndDataAction(e.target.value))}
            />
          </div>
        </Dates>
      </Filter>
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

          let start = new Date(filter.startDate)
          let end = new Date(filter.endDate)
          return (
            ((dateCompare(date, start) == 1 && dateCompare(end, date) == 1) || !filter.startDate || !filter.endDate) &&
            (!filter.status.length || checkStatus(meetup.status) == 1) && (
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
          )
        })}
      </Table>
    </Container>
  )
}

const DateLabel = styled.div`
  font-size: 16px;
  height: fit-content;
`

const Dates = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 30px;

  & > div {
    display: flex;
    align-items: center;
  }
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
  width: 120px;
  margin-left: 20px;
  height: 30px;

  &:focus {
    border-bottom: 2px solid #898989;
  }

  ${(p) => p.$error && `border-bottom: 2px solid #ff000082;`}
`

const Filter = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
`

const SMultiDropdown = styled(MultiDropdown)`
  width: 30%;
`

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

export default MeetupsPage
