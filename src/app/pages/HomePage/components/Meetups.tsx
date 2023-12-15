import React from 'react'
import { styled } from 'styled-components'

type Props = {
  meetups: any
}

const Meetups: React.FC<Props> = ({ meetups }) => {
  return (
    <Cards>
      {meetups.map((meetup: any) => {
        return (
          <Card key={meetup.id}>
            <Link>
              <ImgContainer>
                <Preview src={meetup.preview} />
              </ImgContainer>
              <CardContent>
                <CardTitle>{meetup.title}</CardTitle>
                <CardInfo>{meetup.place}</CardInfo>
                <CardInfo>{meetup.date}</CardInfo>
              </CardContent>
              <CardAction>
                <Register>Зарегистрироваться</Register>
              </CardAction>
            </Link>
          </Card>
        )
      })}
    </Cards>
  )
}

const Register = styled.div`
  text-decoration: none;
  color: #336fee;
  &:hover {
    color: #1f50ba;
  }
`

const CardAction = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 20px;
`

const CardTitle = styled.div`
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
`

const CardInfo = styled.div`
  color: #686060;
`

const CardContent = styled.div`
  display: flex;
  padding: 0px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
`

const Preview = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
`

const ImgContainer = styled.div`
  overflow: hidden;
  background: #eaecee;
  color: #eaecee;
  height: 202px;
  width: 100%;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  margin-bottom: 20px;
`

const Link = styled.a`
  text-decoration: inherit;
  width: 100%;
`

const Card = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  background: #fff;
  height: 420px;
  width: 360px;
  border-radius: 30px;
  transition: transform 0.4s ease-out;
  outline: 1px solid #e7e7e7;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
  }
`

const Cards = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  padding: 10px 0;
  gap: 60px;
  margin: 20px 0 50px 0;
`

export default Meetups
