import React from 'react'
import { Container } from '@mui/material'
import LoginButton from './Pages/LoginButton'
import LogoutButton from './Pages/LogoutButton'
import logo from './imgs/pulse.png'
import Profile from './Pages/Profile'
import {Routes, Route} from 'react-router-dom'

const App = () => {
  return (
        <Container>
          <Routes>
            <Route path='/login' element={<LoginButton/>} />
            <Route path='/profile' element={<div className="profile"> <Profile /> <LogoutButton /> </div> } />
          </Routes>
        </Container>
  )
}

export default App

