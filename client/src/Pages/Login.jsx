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
          style={{ width: "500px", height: "auto" }}
        />
      </Box>
      <Box textAlign="center">
        <h1 style={{ color: "gray", fontSize: "30px" }}>FIND YOUR <em>PULSE</em></h1>
      </Box>
      <LoginButton />
    </Container>
  );
};

export default Login;
