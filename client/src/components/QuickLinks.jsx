import React, { useState, useEffect } from "react";
import {
  Box,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import QuickLinksItem from "./QuickLinksItem";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import { useAuth0 } from "@auth0/auth0-react";

const QuickLinks = () => {
  //snack bar notifies user that link is copied
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // quickLinks state used to store the quickLinks data fetched from the API
  const [quickLinks, setQuickLinks] = useState([]);

  // open state controls the Dialog(popup window).
  const [open, setOpen] = useState(false);

  // newLink state holds the temporary data for the link being added or edited.
  const [newLink, setNewLink] = useState("");

  // selected link and setSelectedLink is being used to track the message that shows up in pop up
  const [selectedLink, setSelectedLink] = useState(null);

  // get user id from session storage
  const userId = window.sessionStorage.getItem('userId');

  // Axios GET request to fetch data from API
  useEffect(() => {
    axios
      .get(`/api/quicklinks/${userId}`)
      .then((response) => {
        setQuickLinks(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch Quicklink:", error);
      });
  }, []);

  // Copy link to clipboard and show snackbar message on bottom right of screen
  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    setSnackbarMessage(`Link copied: ${link}`);
    setIsSnackbarOpen(true);
  };

  // Snackbar message closes after 3 seconds
  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  // Add new link to quickLinks
  const handleAddLink = () => {
    setSelectedLink(null);
    setNewLink({ name: "", url: "" });
    setOpen(true);
  };

  // Delete link from quickLinks
  const handleDeleteLink = (id) => {
    // Axios DELETE request to delete data here
    axios
      .delete(`/api/quicklinks/${userId}/${id}`)
      .then(() => {
        setQuickLinks((prevLinks) =>
          prevLinks.filter((link) => link.id !== id)
        );
      })
      .catch((error) => {
        console.error("Failed to delete Quicklink:", error);
      });
  };

  // Edit link from quickLinks
  const handleEditLink = (quickLink) => {
    setSelectedLink(quickLink);
    setNewLink(quickLink);
    setOpen(true);
  };

  // Save the edited or new link to quickLinks
  const handleSaveLink = () => {
    if (selectedLink) {
      // Axios PUT request to edit data
      const linkId = selectedLink.id
      axios
        .put(`/api/quicklinks//${userId}/${linkId}`, newLink)
        .then(() => {
          setQuickLinks((prevLinks) =>
            prevLinks.map((quickLink) =>
              quickLink.id === selectedLink.id
                ? { ...newLink, id: selectedLink.id }
                : quickLink
            )
          );
        })
        .catch((error) => {
          console.error("Failed to edit Quicklink:", error);
        });
    } else {
      // Axios POST to add data
      axios.post(`/api/quicklinks/${userId}`, newLink).then((response) => {
        const newId = response.data.id
        setQuickLinks((prevLinks) => [...prevLinks, { ...newLink, id: newId }])
      });
    }
    setOpen(false);
  };

  // Hande input change for link name and url
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
        <IconButton onClick={handleAddLink} sx={{ color: "white" }}>
          <AddIcon />
        </IconButton>
      </Box>

      <div className="title">Quick Links</div>

      <Box
        sx={{
          marginTop: "10px",
          height: "80%",
          overflow: "auto",
          fontSize: "large",
        }}
      >
        {quickLinks.map((quickLink) => (
          <QuickLinksItem
            key={quickLink.id}
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
        <DialogTitle>
          {selectedLink ? "Edit Quick Link" : "Add Quick Link"}
        </DialogTitle>
        <DialogContent sx={{ width: "250px" }}>
          <TextField
            label="Name"
            value={newLink.name}
            onChange={(event) => handleInputChange(event, "name")}
            variant="standard"
            fullWidth
            margin="dense"
          />
          <TextField
            label="URL"
            value={newLink.url}
            onChange={(event) => handleInputChange(event, "url")}
            variant="standard"
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveLink}>
            {selectedLink ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QuickLinks;
