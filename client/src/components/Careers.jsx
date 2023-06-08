import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';

const Careers = () => {
  const [rows, setRows] = useState([
    { id: 1, date: null, opportunity: '', notes: '' },
  ]);

  const columns = [
    { field: 'date', headerName: 'Date', width: 200, editable: true },
    { field: 'opportunity', headerName: 'Opportunity', width: 300, editable: true },
    { field: 'notes', headerName: 'Notes', width: 300, editable: true },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      renderCell: (params) => (
        <IconButton>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box
      sx={{
        position: 'relative',
        padding: 2,
        paddingBottom: 8,
        borderRadius: 5,
        height: 300,
        width: '100%',
        marginBottom: '20px',
        marginTop: '20px',
        bgcolor: 'rgba(91, 130, 130, 0.4)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      >
        <IconButton color="inherit">
          <AddIcon sx={{ color: 'white' }} />
        </IconButton>
      </Box>
      <h1 style={{ color: 'white' }}>Careers</h1>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        disableColumnMenu
        hideFooterPagination
        hideFooterSelectedRowCount
        hideFooter
        sx={{ borderColor: 'transparent' }}
      />
    </Box>
  );
};

export default Careers;
