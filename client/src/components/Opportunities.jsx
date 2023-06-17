import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { format } from "date-fns";
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

const Opportunities = () => {
  // opportunities state used to store the opportunities data fetched from the API 
  // and represents the list of opportunities that will be displayed in the component.
  const [opportunities, setOpportunities] = useState([]);

  // newOpportunity state holds the temporary data for the opportunity being added or edited.
  const [newOpportunity, setNewOpportunity] = useState({});

  // selectedOpportunity state holds the selection of the quick link being edited.
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  // open state controls the Dialog(popup window).
  const [open, setOpen] = useState(false);

  // fetch auth0_id for user 
  const {user} = useAuth0();
  const auth0ID = user.sub;

  // Axios GET request to fetch data from API
  useEffect(() => {
    axios.get('/api/opportunities')
      .then((response) => {
        setOpportunities(response.data);
      })
  }, [])

  const handleAddOpportunity = () => {
    setSelectedOpportunity(null);
    setNewOpportunity({ id: null, date: null, name: "", notes: "" });
    setOpen(true);
  };

  const handleDeleteOpportunity = (id) => {
    // ------TODO------- Axios DELETE request to delete data here
    const updatedOpportunities = opportunities.filter((opp) => opp.id !== id);
    setOpportunities(updatedOpportunities);
  };

  const handleEditOpportunity = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setNewOpportunity(opportunity);
    setOpen(true);
  };

  const handleSaveOpportunity = () => {
    if (selectedOpportunity) {
      // ------TODO------- Axios PUT request to edit data here
      setOpportunities((prevOpportunities) =>
        prevOpportunities.map((opp) =>
          opp.id === selectedOpportunity.id ? { ...newOpportunity, id: selectedOpportunity.id } : opp
        )
      );
    } else {
      // ------TODO------- Axios POST request to add data here
      const newId = opportunities.length > 0 ? opportunities[opportunities.length - 1].id + 1 : 1;
      setOpportunities((prevOpportunities) => [...prevOpportunities, { ...newOpportunity, id: newId }]);
    }

    setOpen(false);
  };

  const handleInputChange = (event, field) => {
    if (field === "date") {
      // Parse the input date string into a Date object
      const parsedDate = new Date(event.target.value);
      // Format the Date object into the desired format
      const formattedDate = format(parsedDate, "yyyy-MM-dd");
      setNewOpportunity((prevOpportunity) => ({
        ...prevOpportunity,
        [field]: formattedDate,
      }));
    } else {
      setNewOpportunity((prevOpportunity) => ({
        ...prevOpportunity,
        [field]: event.target.value,
      }));
    }
  };

  const columns = [
    {
      field: "date",
      headerName: "Date",
      width: 110,
      cellClassName: "wrap-text",
    },
    {
      field: "name",
      headerName: "Opportunity",
      width: 200,
      cellClassName: "wrap-text",
    },
    {
      field: "notes",
      headerName: "Notes",
      width: 200,
      cellClassName: "wrap-text",
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 70,
      cellClassName: "wrap-text",
      renderCell: (params) => (
        <IconButton onClick={() => handleEditOpportunity(params.row)}>
          <EditIcon sx={{ color: 'rgba(184, 134, 11)' }} />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 70,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteOpportunity(params.row.id)}>
          <DeleteIcon sx={{ color: 'rgba(210, 77, 87)' }} />
        </IconButton>
      ),
    },
  ];

  return (
    <Box
      sx={{
        position: "relative",
        padding: 3,
        borderRadius: 5,
        borderColor: "rgba(91, 130, 130, 0.4)",
        height: 300,
        width: "115%",
        marginLeft: "58%",
        marginTop: "20px",
        marginBottom: "25px",
        bgcolor: "rgba(91, 130, 130, 0.4)",
        flexGrow: 1,
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
      >
        <IconButton onClick={handleAddOpportunity}>
          <AddIcon sx={{ color: 'white' }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          fontWeight: "bold",
          fontSize: "18px",
          color: "white",
        }}
      >
        <div className="title">Opportunities</div>
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        <DataGrid
          rows={opportunities}
          columns={columns}
          sx={{
            borderColor: "transparent",
            '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeaderTitle': {
              color: 'white',
            }
          }}
          disableRowSelectionOnClick
          disableColumnMenu
          hideFooterPagination
          className="datagrid"
        />
      </Box>

      {/* Popup window */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{selectedOpportunity ? "Edit Opportunity" : "Add Opportunity"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Date"
            value={newOpportunity.date}
            onChange={(e) => handleInputChange(e, "date")}
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Opportunity"
            value={newOpportunity.name}
            onChange={(e) => handleInputChange(e, "name")}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Notes"
            value={newOpportunity.notes}
            onChange={(e) => handleInputChange(e, "notes")}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveOpportunity} color="primary">{selectedOpportunity ? "Save" : "Add"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Opportunities;
