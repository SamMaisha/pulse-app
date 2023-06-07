import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button, Box } from '@mui/material';
import '../index.css'

const Logoutbutton = () => {
    const {logout, isAuthenticated} = useAuth0();
  return (
    isAuthenticated && (
        <div>
            <Box textAlign="center">
                <Button style={{background:"yellow", color: "black", fontSize: '40px', maxWidth: '90px', maxHeight: '150px', minWidth: '200px', minHeight: '150px'}} variant = "contained" onClick={() => logout()}>
                    Sign out
                </Button>    
            </Box> 
        </div>
    )
  )
}

export default Logoutbutton