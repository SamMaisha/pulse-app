import React from 'react';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';

const User = () => {
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
        src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
        sx={{ width: 200, height: 200 }}
      />
    <h5>Hello, User!</h5>
    </Box>
  );
};

export default User;