import React, { useState } from 'react';
import { Box, Snackbar } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import QuickLinksItem from './QuickLinksItem';

const QuickLinks = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const testData = [
    {
    "id": 1,
    "user_id": 1,
    "name": "linkedin",
    "url": "https://www.linkedin.com/in/bob-jones-6118825/"
    },
    {
    "id": 2,
    "user_id": 1,
    "name": "github",
    "url": "https://github.com/bjucps209"
    },
    {
    "id": 3,
    "user_id": 1,
    "name": "resume",
    "url": "https://www.resume.com/bob-jones"
    }
    ]


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
        
        {testData.map(({id, name, url})=> {
          return (
            <QuickLinksItem key = {id} handleCopyLink={handleCopyLink} name={name} url={url}/>
          )
        })}
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