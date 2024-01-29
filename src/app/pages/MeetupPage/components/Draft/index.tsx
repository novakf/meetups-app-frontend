import React, { useState } from 'react'
import { styled } from 'styled-components'
import Breadcrumbs from '../../../../components/Breadcrumbs'
import { Link, useNavigate } from 'react-router-dom'
import { draftData, hasDraft, setDraftDataAction } from '../../../../store/slices/draftSlice'
import { handleKeyPress, useMessage } from '../../../../utils'
import { useDispatch } from 'react-redux'
import Speaker from '../Speaker'
import { Service } from '../../../../../../generated/api'

const DraftPage: React.FC = () => {
  const draft = draftData()
  const [title, setTitle] = useState(draft?.title ? draft.title : '')
  const [place, setPlace] = useState(draft?.place ? draft.place : '')
  const [date, setDate] = useState(draft?.date ? draft.date : '')
  const [description, setDescription] = useState(draft?.description ? draft.description : '')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const save = () => {
    Service.meetupsControllerUpdate({
      title,
      place,
      date,
      description,
    })
      .then((data) => {
        dispatch(setDraftDataAction(data))
        useMessage({ messageText: 'Митап успешно сохранен' }, dispatch)
      })
      .catch((err) => console.log(err))
  }

  const deleteMeetup = () => {
    Service.meetupsControllerDeleteByCreator()
      .then(() => {
        dispatch(setDraftDataAction(undefined))
        navigate('/speakers')
        useMessage({ messageText: 'Заявка успешно удалена' }, dispatch)
      })
      .catch((err) => console.log(err))
  }

  const submit = () => {
    Service.meetupsControllerCompleteByCreator()
      .then(() => {
        dispatch(setDraftDataAction(undefined))
        navigate('/profile/meetups')
        useMessage({ messageText: 'Митап успешно сформирован' }, dispatch)
      })
      .catch((err) => {
        useMessage({ messageText: err.response.data.message, status: 'error' }, dispatch)
      })
  }

  const userHasDraft = hasDraft()

  return (
    <Container>
      <FirstLine>
        <Breadcrumbs>
          <SLink to={'/'}>Домашняя страница</SLink>
          <SLink to={'/speakers'}>Спикеры</SLink>
          <SLink to={`/profile/meetups/${draft.id}`}>Заявка на митап</SLink>
        </Breadcrumbs>
      </FirstLine>
      {draft && userHasDraft ? (
        <Constructor>
          <Block>
            <InputLabelSpeakers>Основная информация</InputLabelSpeakers>
            <InputLabel>Заголовок</InputLabel>
            <StyledInput
              type="text"
              placeholder={'Название мероприятия'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e)}
            />
            <InputLabel>Место</InputLabel>
            <StyledInput
              type="text"
              placeholder={'Место проведения'}
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e)}
            />
            <InputLabel>Дата проведения</InputLabel>
            <StyledInput
              type="date"
              placeholder={'Место проведения'}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e)}
            />
            <InputLabel>Описание</InputLabel>
            <StyledTextArea
              placeholder={'Описание мероприятия'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Block>
          <div style={{ width: '45%', display: 'flex', flexDirection: 'column' }}>
            <InputLabelSpeakers>Выбранные спикеры</InputLabelSpeakers>
            {draft?.speakers && draft?.speakers.length > 0 ? (
              draft?.speakers?.map((speaker) => {
                return <Speaker key={speaker.id} speaker={speaker} isDraft />
              })
            ) : (
              <NotFound>Вы еще не добавили спикеров</NotFound>
            )}

            <Action>
              <SubmitButton onClick={submit} disabled={!title || !place || !description || !date}>
                Сформировать
              </SubmitButton>
              <SaveButton onClick={save}>Сохранить</SaveButton>
              <DeleteButton onClick={deleteMeetup}>Удалить заявку</DeleteButton>
            </Action>
          </div>
        </Constructor>
      ) : (
        <NotFound>Черновик не найден, вернитесь на страницу спикеров</NotFound>
      )}
    </Container>
  )
}

const Block = styled.div`
  width: 45%;
  padding-right: 70px;
  border-right: 2px solid #e5e5e5;
`

const NotFound = styled.div`
  text-align: center;
  font-size: 16px;
  color: #525252;
  margin-top: 20px;
`

const Constructor = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`

const StyledTextArea = styled.textarea`
  margin-top: 15px;
  border: 1px solid #cfcfcf;
  border-radius: 10px;
  padding: 0px;
  outline: none;
  border-bottom: 2px solid #dddddd;
  padding: 6px 10px;
  font-size: 14px;
  transition: all 0.2s;
  width: 100%;

  height: 50px;

  &:focus {
    border-bottom: 2px solid #898989;
  }
`

const Action = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  gap: 20px;
  justify-content: start;
  padding-top: 40px;
`

const SubmitButton = styled.button`
  border: none;
  border-radius: 10px;
  background: #003983;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-top: auto;
  cursor: pointer;
  width: 200px;

  &:hover {
    background: #00275b;
  }

  &:active {
    background: #01367d;
  }

  &:disabled {
    background: #dddddd;
    cursor: not-allowed;
    color: #353535;
  }
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

const InputLabelSpeakers = styled.div`
  color: #1e1e1e;
  font-size: 25px;
`

const StyledInput = styled.input<{ $error?: boolean }>`
  margin-top: 15px;
  border: none;
  padding: 0px;
  outline: none;
  border-bottom: 2px solid #dddddd;
  padding: 6px 10px;
  font-size: 16px;
  transition: all 0.2s;
  width: 100%;

  height: 30px;

  &:focus {
    border-bottom: 2px solid #898989;
  }

  ${(p) => p.$error && `border-bottom: 2px solid #ff000082;`}
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

export default DraftPage
