import React from 'react'
import { Container } from '@mui/material'
import LoginButton from './Pages/LoginButton'
import LogoutButton from './Pages/LogoutButton'
import './imgs/pulse.png'
import Profile from './Pages/Profile'
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Grid from '@mui/material/Grid'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'
import About from './Pages/About'
import Register from './Pages/Register'



const App = () => {
  return (
        <Container>
             <Navbar />
        <Grid
          container
          marginTop="50px"
          height="auto"
          borderRadius="10px"
          backgroundColor="rgba(255, 255, 255, 0.1)"
          sx={{ padding: "50px", overflow: "hidden" }}
        >
          <Routes>
            <Route path='/login' element={<LoginButton/>} />
            <Route path='/profile' element={<div className="profile"> <Profile /> <LogoutButton /> </div> } />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={< Register />} /> 
            <Route path="/profile" element={< Profile />} /> 
            <Route path="/about" element={< About />} />
          </Routes>
          </Grid>
        </Container>
  )
}

export default App

