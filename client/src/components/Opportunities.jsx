import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import axios from 'axios';
import moment from 'moment';

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

  // get user id from session storage
  const userId = window.sessionStorage.getItem('userId');

  // Axios GET request to fetch data from API
  useEffect(() => {
    axios.get(`/api/opportunities/${userId}`)
      .then((response) => {
        response.data.forEach(element => {
          element.date = moment(element.date).utc().format('YYYY-MM-DD');
        });
        setOpportunities(response.data);
      })
  }, [])

  const handleAddOpportunity = () => {
    setSelectedOpportunity(null);
    setNewOpportunity({ id: null, date: null, name: "", notes: "" });
    setOpen(true);
  };

  const handleDeleteOpportunity = (id) => {
    // Axios DELETE request to delete data here
    axios.delete(`/api/opportunities/${userId}/${id}`, id).then(() => {
      const updatedOpportunities = opportunities.filter((opp) => opp.id !== id);
      setOpportunities(updatedOpportunities);
    })
  };

  const handleEditOpportunity = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setNewOpportunity(opportunity);
    setOpen(true);
  };

  const handleSaveOpportunity = () => {
    if (selectedOpportunity) {
      // Axios PUT request to edit data here
      const opportunityId = selectedOpportunity.id;
      console.log(opportunityId);
      axios.put(`/api/opportunities/${userId}/${opportunityId}`, newOpportunity)
        .then(() => {
          setOpportunities((prevOpportunities) =>
            prevOpportunities.map((opp) =>
              opp.id === selectedOpportunity.id ? { ...newOpportunity, id: selectedOpportunity.id } : opp
            )
          );
        })
    } else {
      // Axios POST request to add data here
      axios.post(`/api/opportunities/${userId}`, newOpportunity)
        .then((response) => {
          console.log(response.data)
          const newId = response.data.id;
          setOpportunities((prevOpportunities) => [...prevOpportunities, { ...newOpportunity, id: newId }]);
        })
    }

    setOpen(false);
  };

  const handleInputChange = (event, field) => {
    setNewOpportunity((prevOpportunity) => ({
      ...prevOpportunity,
      [field]: event.target.value,
    }));
  };

  const columns = [
    {
      field: "date",
      headerName: "Date",
      width: 200,
      cellClassName: "wrap-text",
    },
    {
      field: "name",
      headerName: "Opportunity",
      width: 300,
      cellClassName: "wrap-text",
    },
    {
      field: "notes",
      headerName: "Notes",
      width: 250,
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
        padding: 2,
        borderRadius: 5,
        borderColor: "rgba(91, 130, 130, 0.4)",
        height: 300,
        width: "115%",
        marginLeft: "58%",
        marginTop: "22px",
        marginBottom: "25px",
        bgcolor: "rgba(91, 130, 130, 0.4)",
        flexGrow: 1,
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

      <div className="title">Opportunities</div>

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
        hideFooterSelectedRowCount
        hideFooter
        className="datagrid"
      />

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
