import React from 'react'
import SpeakersPage from './pages/SpeakersPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SingleSpeakerPage from './pages/SingleSpeakerPage'
import Header from './components/Header'
import HomePage from './pages/HomePage'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/speakers" element={<SpeakersPage />} />
        <Route path="/speakers/:id" element={<SingleSpeakerPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
