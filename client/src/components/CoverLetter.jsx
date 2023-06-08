import React from 'react';
import { Box, TextField } from '@mui/material';

const CoverLetter = () => {
  return (
    <Box
      sx={{
        padding: 1,
        borderRadius: 5,
        height: '62%',
        marginLeft: '50px',
        bgcolor: 'rgba(91, 130, 130, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '18px',
      }}
    >
      <div className="title">Cover Letter Generator</div>
      <Box mt={4} mb={2}>
        <p> paragraph.</p>
      </Box>
      <Box mt="auto" width="90%">
        <TextField label="Enter Text" variant="outlined" fullWidth />
      </Box>
    </Box>
  );
};

export default CoverLetter;