import React, { useState } from "react";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([
    { id: 1, date: null, opportunity: "", notes: "" },
  ]);

  const handleAddRow = () => {
    const newOpportunity = {
      id: opportunities.length + 1,
      date: null,
      opportunity: "",
      notes: "",
    };

    setOpportunities((prevOpportunities) => [
      ...prevOpportunities,
      newOpportunity,
    ]);
  };

  const handleDeleteOpportunity = (id) => {
    const updatedOpportunities = opportunities.filter((opp) => opp.id !== id);
    setOpportunities(updatedOpportunities);
  };

  const columns = [
    {
      field: "date",
      headerName: "Date",
      width: 300,
      editable: true,
    },
    {
      field: "opportunity",
      headerName: "Opportunity",
      width: 300,
      editable: true,
    },
    {
      field: "notes",
      headerName: "Notes",
      width: 300,
      editable: true,
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
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
        <IconButton onClick={handleAddRow}>
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
        Opportunities
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
    </Box>
  );
};

export default Opportunities;
