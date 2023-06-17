import React from "react";
import { useAuth0 } from "@auth0/auth0-react"
import { Routes, Route } from "react-router-dom";
import { PageLoader } from "./components/page-loader"
import AuthenticationGuard from "./components/authentication-guard";
import Navbar from "./components/Navbar";
import Grid from "@mui/material/Grid";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import About from "./Pages/About";
import Footer from "./components/Footer";
import { CallbackPage } from "./Pages/callback-pages";
import { Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import "./imgs/pulse.png";
import "./App.css";

function App() {
  const { isLoading } = useAuth0()

  if (isLoading) {
    return (
      <Container>
        <PageLoader />
      </Container>
    )
  }
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
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/dashboard" element={<AuthenticationGuard component={Dashboard} />} />
            <Route path="/about" element={<About />} />
            <Route path="/callback" element={<CallbackPage />} />
          </Routes>
        </Grid>
        <Footer />
      </Grid>
    </div>
  );
}

export default App;
