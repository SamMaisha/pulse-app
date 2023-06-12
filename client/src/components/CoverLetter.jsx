import React, { useState } from 'react';
import { Box, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const CoverLetter = () => {
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');

  const handleSave = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        padding: 1,
        borderRadius: 5,
        height: '60%',
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

      <Box mt={2}>
        <div className="title">Cover Letter Generator</div>
      </Box>

      <Box mt={4}>
        <p> paragraph.</p>
      </Box>

      <Box mt="auto" mb={2}>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          color="secondary"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            color: '#ffffff',
          }}
        >
          Create my Cover Letter
        </Button>
      </Box>

      {/* Popup window */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>What position are you appllying for?</DialogTitle>
        <DialogContent>
          <TextField
            label="Company"
            value={company}
            variant="outlined"
            fullWidth
            margin="dense"
          />
          <TextField
            label="Position"
            value={position}
            variant="outlined"
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Next</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CoverLetter;