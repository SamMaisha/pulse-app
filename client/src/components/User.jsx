import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';

const User = () => {
  const { user } = useAuth0();

  const imageSources = [
    `${user.picture}?size=200X200`,
    `${user.picture}?size=400X400`,
    `${user.picture}?size=600X600`,
    `${user.picture}?size=800X800`,
    `${user.picture}?size=1000X1000`,
  ];

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
        srcSet={imageSources.join(',')}
        sx={{ width: '200px', height: '200px' }}
   
      />
    <p class="welcome-user">Hello, {user.name}!</p>
    </Box>
  );
};

export default User;