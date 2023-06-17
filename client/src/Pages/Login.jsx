import React from "react";
import LoginButton from "../components/LoginButton";
import { Container } from "@mui/material";
import pulse from "../imgs/pulse.png";
import { Box } from "@mui/system";

const Login = () => {
  return (
    <Container>
      <Box textAlign="center">
        <img
          src={pulse}
          alt="logo"
          class="logo"
          style={{ width: "500px", height: "auto" }}
        />
      </Box>
      <Box textAlign="center">
        <h1 class="home-title">FIND YOUR <em>PULSE</em></h1>
      </Box>
      <LoginButton />
    </Container>
  );
};

export default Login;
