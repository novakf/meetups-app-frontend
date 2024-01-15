import React from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import Breadcrumbs from '../../components/Breadcrumbs'
import MultiDropdown, { Option } from '../../components/MultiDropdown'
import { useDispatch } from 'react-redux'
import {
  filterData,
  setEndDataAction,
  setFilterDataAction,
  setStartDataAction,
} from '../../store/slices/meetupsFilterSlice'
import MeetupsTable from './components/MeetupsTable'
import { meetupsStatusFilterOptions as options } from '../../constants'

const MeetupsPage: React.FC = () => {
  const filter = filterData()
  const dispatch = useDispatch()

  const defaultGetTitle = (elements: Option[]) => elements.map((el) => el.key).join()

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
              value={filter.startDate}
              onChange={(e) => dispatch(setStartDataAction(e.target.value))}
            />
          </div>
          <div>
            <DateLabel>Конец</DateLabel>
            <StyledInput
              style={{ marginTop: '0px' }}
              type="date"
              value={filter.endDate}
              onChange={(e) => dispatch(setEndDataAction(e.target.value))}
            />
          </div>
        </Dates>
      </Filter>

      <MeetupsTable />
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
