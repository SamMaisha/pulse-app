import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Grid from "@mui/material/Grid";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import About from "./Pages/About";
import Register from "./Pages/Register";
import Footer from "./components/Footer";
import Profile from "./Pages/Profile";
import { Navigate } from "react-router-dom";
import "./imgs/pulse.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Grid container>
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
            <Route index element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Grid>
        <Footer />
      </Grid>
    </div>
  );
}

export default App;
