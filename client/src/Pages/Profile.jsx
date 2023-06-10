import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../index.css"
import { Button } from "@mui/base";
import { Container, Box } from "@mui/material";
import axios from 'axios';
import LogoutButton from "../components/LogoutButton";


const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  console.log(user);


  useEffect(() => {
    const submitUserData = async () => {

      //want to integrate a get request check to see if user is in the database, and then stop the post request

      const result = await axios.post('http://localhost:8001/users', user)


      //would we have a get request to check the database here checking sub against userId, and that makes sure that the request isnt sent?
      console.log(result)
    }
    submitUserData();
  }, [user])

  // need a useEffect (dependency of either user or isAuthenitcated) that when authentication comes through, make the same request

  return (
    isAuthenticated && (
      <Container>
        <Box display="flex" flexDirection='column' justifyContent='center' alignItems='center' >
          <img className="user_profile" src={user.picture} alt="user-profile-img"></img>
          <h2>{user.name}</h2>
          <h1>{user.email}</h1>
          <LogoutButton />
        </Box>
      </Container>
    )
  );
};

export default Profile;