import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material';

const Logoutbutton = () => {
    const { logout, isAuthenticated } = useAuth0();
    return (
        isAuthenticated && (
            <Button style={{ background: "yellow", color: "black", fontSize: '40px' }} size='large' variant="contained" textAlign='center' onClick={() => logout()}>
                Sign out
            </Button>
        )
    )
}

export default Logoutbutton