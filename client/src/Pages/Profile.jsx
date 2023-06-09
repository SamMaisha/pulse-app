import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../index.css"
import { Button } from "@mui/base";
import axios from 'axios';


const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  console.log(user);

  
  useEffect(() => {
    const submitUserData = async () => {
  
      const result = await axios.post('http://localhost:8001/users' , user)
  

      //would we have a get request to check the database here checking sub against userId, and that makes sure that the request isnt sent?
      console.log(result)
    }
    submitUserData();
    },[user])

// need a useEffect (dependency of either user or isAuthenitcated) that when authentication comes through, make the same request

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} className="userImg" />
        <h2>{user.name}</h2>
        <h1>{user.email}</h1>
      </div>
    )
  );
};

export default Profile;