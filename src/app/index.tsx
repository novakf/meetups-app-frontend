import React from 'react'
import SpeakersPage from './pages/SpeakersPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SingleSpeakerPage from './pages/SingleSpeakerPage'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import DraftPage from './pages/DraftPage'
import MeetupsPage from './pages/MeetupsPage'
import MeetupPage from './pages/MeetupPage'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/speakers" element={<SpeakersPage />} />
        <Route path="/speakers/:id" element={<SingleSpeakerPage />} />
        <Route path="/profile/draft" element={<DraftPage />} />
        <Route path="/profile/meetups" element={<MeetupsPage />} />
        <Route path="/profile/meetups/:id" element={<MeetupPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
