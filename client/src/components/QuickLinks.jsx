import React, { useState, useEffect } from 'react';
import { Box, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton } from '@mui/material';
import QuickLinksItem from './QuickLinksItem';
import axios from 'axios';
import AddIcon from "@mui/icons-material/Add";
import { useAuth0 } from '@auth0/auth0-react';

const QuickLinks = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [quickLinks, setQuickLinks] = useState([])
  const [open, setOpen] = useState(false);
  
  const [newLink, setNewLink] = useState('');
  // selected link and setSelectedLink is being used to track the message that shows up in pop up 
  const [selectedLink, setSelectedLink] = useState(null);

  // Fetch auth0_id for user
const {user} = useAuth0();
const auth0ID = user.sub;

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

  const handleAddLink = () => {
    setSelectedLink(null);
    setNewLink({ name: '', url: '' });
    setOpen(true);
  };

  const handleDeleteLink = (id) => {
    setQuickLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
  };

  const handleEditLink = (quickLink) => {
    setSelectedLink(quickLink);
    setNewLink(quickLink);
    setOpen(true);
  };

  const handleSaveLink = () => {
    if (selectedLink) {
      setQuickLinks((prevLinks) =>
        prevLinks.map((quickLink) =>
          quickLink.id === selectedLink.id ? { ...newLink, id: selectedLink.id } : quickLink
        )
      );
    } else {
      const newId = quickLinks.length > 0 ? quickLinks[quickLinks.length - 1].id + 1 : 1;
      setQuickLinks((prevLinks) => [...prevLinks, { ...newLink, id: newId }]);
    }

    setOpen(false);
  };

  const handleInputChange = (event, field) => {
    setNewLink((prevLinks) => ({
      ...prevLinks,
      [field]: event.target.value,
    }));
  };

  return (
    <Box
      sx={{
        position: "relative",
        padding: 3,
        borderRadius: 5,
        height: 200,
        width: "110%",
        bgcolor: "rgba(91, 130, 130, 0.4)",
        margin: 0,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
      >
        <IconButton onClick={handleAddLink} sx={{ color: 'white' }}>
          <AddIcon />
        </IconButton>
      </Box>

      <div className="title">Quick Links</div>

      <Box sx={{
        marginTop: '10px',
        height: '80%',
        overflow: 'auto',
        fontSize: 'large',
      }}>
        {quickLinks.map((quickLink) => (
          <QuickLinksItem
          key = {quickLink.id}
            quickLink={quickLink}
            handleCopyLink={handleCopyLink}
            handleEditLink={handleEditLink}
            handleDeleteLink={handleDeleteLink}
          />
        ))}
      </Box>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />

      {/* Popup window */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{selectedLink ? 'Edit Quick Link' : 'Add Quick Link'}</DialogTitle>
        <DialogContent sx={{ width: '250px' }}>
          <TextField
            label="Name"
            value={newLink.name}
            onChange={(event) => handleInputChange(event, 'name')}
            variant="standard"
            fullWidth
            margin="dense"
          />
          <TextField
            label="URL"
            value={newLink.url}
            onChange={(event) => handleInputChange(event, 'url')}
            variant="standard"
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveLink}>{selectedLink ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Box>

  );
};

export default QuickLinks;
