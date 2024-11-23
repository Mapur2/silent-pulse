import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './Home'
import Navbar from './Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ViewMessages from './Messages'
import SendMessagePage from './SendMessage'
import Footer from './Footer'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/secret/:id" element={<SendMessagePage />} />
          <Route path="/messages/:id" element={<ViewMessages />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
