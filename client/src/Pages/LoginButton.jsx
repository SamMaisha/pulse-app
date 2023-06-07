import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button, Box } from '@mui/material';


const LoginButton = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();
  return (
    !isAuthenticated && (
        <div>
            <Box textAlign='center'>
                <Button style={{ fontSize: '40px', maxWidth: '90px', maxHeight: '90px', minWidth: '200px', minHeight: '50px'}} variant = "contained" onClick={() => loginWithRedirect()}>
                    Auth0
                </Button>
            </Box>
        </div>
    )
  )
}

export default LoginButton