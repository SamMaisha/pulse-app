import React, { useState } from 'react';
import { Box, Snackbar } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const QuickLinks = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    setSnackbarMessage(`Link copied: ${link}`);
    setIsSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        padding: 3,
        borderRadius: 5,
        height: 130,
        width: '110%',
        bgcolor: 'rgba(91, 130, 130, 0.4)',

      }}
    >

      <div className="title">Quick Links</div>

      <Box sx={{ marginTop: '10px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <h3>Github:</h3>
          </Box>
          <Box sx={{ flex: 2 }}>
            <input type="text" value="github.com/user" readOnly style={{ width: '120%', borderRadius: '5px' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <FileCopyIcon
              sx={{ color: 'white', cursor: 'pointer', marginLeft: '50%' }}
              onClick={() => handleCopyLink('github.com/user')}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <h3>Resume:</h3>
          </Box>
          <Box sx={{ flex: 2 }}>
            <input type="text" value="example.com/resume" readOnly style={{ width: '120%', borderRadius: '5px' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <FileCopyIcon
              sx={{ color: 'white', cursor: 'pointer', marginLeft: '50%' }}
              onClick={() => handleCopyLink('example.com/resume')}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <h3>LinkedIn:</h3>
          </Box>
          <Box sx={{ flex: 2 }}>
            <input type="text" value="linkedin.com/in/user" readOnly style={{ width: '120%', borderRadius: '5px' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <FileCopyIcon
              sx={{ color: 'white', cursor: 'pointer', marginLeft: '50%' }}
              onClick={() => handleCopyLink('linkedin.com/in/user')}
            />
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </Box>
  );
};

export default QuickLinks;