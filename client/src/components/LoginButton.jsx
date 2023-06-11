import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Box } from "@mui/material";
import "../App.css";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    !isAuthenticated && (
      <Box textAlign="center">
        <Button
          style={{
            borderRadius: "5px",
            background: "rgba(184, 134, 11)",
            fontSize: "20px",
          }}
          variant="contained"
          size="large"
          onClick={() => loginWithRedirect()}
        >
          Login
        </Button>
      </Box>
    )
  );
};

export default LoginButton;
