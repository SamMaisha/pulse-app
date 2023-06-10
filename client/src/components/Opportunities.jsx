import React, { useState } from "react";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [newOpportunity, setNewOpportunity] = useState({});

  const handleAddOpportunity = () => {
    setSelectedOpportunity(null);
    setNewOpportunity({ id: null, date: null, opportunity: "", notes: "" });
    setOpen(true);
  };

  // const handleAddRow = () => {
  //   const newOpportunity = {
  //     id: opportunities.length + 1,
  //     date: null,
  //     opportunity: "",
  //     notes: "",
  //   };

  //   setOpportunities((prevOpportunities) => [
  //     ...prevOpportunities,
  //     newOpportunity,
  //   ]);
  // };

  const handleDeleteOpportunity = (id) => {
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
      setOpportunities((prevOpportunities) =>
        prevOpportunities.map((opp) =>
          opp.id === selectedOpportunity.id ? { ...newOpportunity, id: selectedOpportunity.id } : opp
        )
      );
    } else {
      const newId = opportunities.length > 0 ? opportunities[opportunities.length - 1].id + 1 : 1;
      setOpportunities((prevOpportunities) => [...prevOpportunities, { ...newOpportunity, id: newId }]);
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
      width: 100,
      editable: true,
    },
    {
      field: "opportunity",
      headerName: "Opportunity",
      width: 200,
      editable: true,
    },
    {
      field: "notes",
      headerName: "Notes",
      width: 300,
      editable: true,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 70,
      renderCell: (params) => (
        <IconButton onClick={() => handleEditOpportunity(params.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 70,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteOpportunity(params.row.id)}>
          <DeleteIcon />
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
          <AddIcon />
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
          sx={{ borderColor: "transparent" }}
          disableRowSelectionOnClick
          disableColumnMenu
          hideFooterPagination
        />
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{selectedOpportunity ? "Edit Opportunity" : "Add Opportunity"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Date"
            value={newOpportunity.date}
            onChange={(e) => handleInputChange(e, "date")}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Opportunity"
            value={newOpportunity.opportunity}
            onChange={(e) => handleInputChange(e, "opportunity")}
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
