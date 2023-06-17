import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';

const User = () => {

  const { user } = useAuth0();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginLeft: '30px',
      }}
    >
      <Avatar
        alt="User Avatar"
        src={user.picture}
        sx={{ width: 200, height: 200 }}
      />
    <h5>{user.name}</h5>
    </Box>
  );
};

export default User;