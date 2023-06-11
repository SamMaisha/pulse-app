import React, { useState, useEffect } from 'react';
import { Box, Snackbar } from '@mui/material';
import QuickLinksItem from './QuickLinksItem';
import axios from 'axios';

const QuickLinks = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [quickLinks, setQuickLinks] = useState([])

// Axios GET request to fetch data from API
  useEffect(() => {
    axios.get('/api/quicklinks')
    .then((response) => {
      setQuickLinks(response.data);
    })
  }, [])

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
        
        {quickLinks.map(({id, name, url})=> {
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