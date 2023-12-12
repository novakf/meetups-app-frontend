import React, { createRef, useEffect } from 'react'
import { styled } from 'styled-components'
import bmstu from '../../assets/bmstu1.jpg'
import Meetups from './components/Meetups'
import meetups from '../../mocks/meetups'

const HomePage: React.FC = () => {
  const titleRef = createRef<HTMLDivElement>()
  const bannerRef = createRef<HTMLDivElement>()

  useEffect(() => {
    const title = titleRef.current
    const banner = bannerRef.current

    if (!title || !banner) return

    const handleScroll = () => {
      title.style.opacity = `${1 - window.scrollY / 400}`
      banner.style.filter = `brightness(0.5) blur(${window.scrollY / 150}px)`
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Container>
      <Banner ref={bannerRef}/>
      <Title ref={titleRef}>
        Проведение митапов
        <br /> в МГТУ им. Н. Э. Баумана
      </Title>
      <Content>
        <UpcomingEvents>
          <BlockTitle>Предстоящие события</BlockTitle>
          <Meetups meetups={meetups} />
        </UpcomingEvents>
        <LinkToSpeakers href='/speakers'>Стать организатором митапа</LinkToSpeakers>
      </Content>
    </Container>
  )
}

const LinkToSpeakers = styled.a`
  font-size: 24px;
  text-decoration: underline;
  cursor: pointer;

  &:visited {
    color: #000;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 9;
  padding: 40px 40px;
  align-items: center;
  background: #fff;
`

const UpcomingEvents = styled.div`
  display: flex;
  flex-direction: column;
`

const BlockTitle = styled.div`
  font-size: 34px;
`

const Title = styled.div`
  position: fixed;
  padding: 0 50px;
  top: 30%;
  font-size: 80px;
  color: #e3e3e3;
`

const Banner = styled.div`
  position: sticky;
  top: 0;
  z-index: 0;
  width: 100%;
  height: 100vh;
  background: url(${bmstu});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  filter: brightness(0.5);
`

export default HomePage
