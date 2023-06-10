import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button, Box } from '@mui/material';
import '../App.css'


const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        !isAuthenticated && (
            <div>
                <Box textAlign='center'>
                    <Button style={{ opacity: '0.5', background: "grey", fontSize: '40px' }} variant="contained" size='large' onClick={() => loginWithRedirect()}>
                        Auth0
                    </Button>
                </Box>
            </div>
        )
    )
}

export default LoginButton