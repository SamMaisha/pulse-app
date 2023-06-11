import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

// Sample data
const initialCareers = [
  {
    id: 1,
    company: 'Lighthouse Labs',
    position: 'Lecturer',
    website: 'https://www.lighthouselabs.ca/',
    coverLetter: true,
    applied: true,
    interviewed: false,
    notes: 'Some notes here',
  },
  {
    id: 2,
    company: 'Company B',
    position: 'Position B',
    website: 'https://www.example.com',
    coverLetter: false,
    applied: true,
    interviewed: true,
    notes: 'Some notes for Company B',
  },
];

const Careers = () => {
  const [careers, setCareers] = useState(initialCareers); // Set initial data for testing 
  const [open, setOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [newCareer, setNewCareer] = useState({
    company: '',
    position: '',
    website: '',
    coverLetter: false,
    applied: false,
    interviewed: false,
    notes: '',
  });

  const handleAddCareer = () => {
    setSelectedCareer(null);
    setNewCareer({
      company: '',
      position: '',
      website: '',
      coverLetter: false,
      applied: false,
      interviewed: false,
      notes: '',
    });
    setOpen(true);
  };


  const handleDeleteCareer = (id) => {
    const updatedCareers = careers.filter((career) => career.id !== id);
    setCareers(updatedCareers);
  };

  const handleEditCareer = (career) => {
    setSelectedCareer(career);
    setNewCareer(career);
    setOpen(true);
  };

  const handleSaveCareer = () => {
    if (selectedCareer) {
      setCareers((prevCareers) =>
        prevCareers.map((career) =>
          career.id === selectedCareer.id ? { ...newCareer, id: selectedCareer.id } : career
        )
      );
    } else {
      const newId = careers.length > 0 ? careers[careers.length - 1].id + 1 : 1;
      setCareers((prevCareers) => [...prevCareers, { ...newCareer, id: newId }]);
    }

    setOpen(false);
  };

  const handleInputChange = (event, field) => {
    const value = field === 'coverLetter' || field === 'applied' || field === 'interviewed' ? event.target.checked : event.target.value;

    setNewCareer((prevCareer) => ({
      ...prevCareer,
      [field]: value,
    }));
  };

  const columns = [
    { field: 'company', headerName: 'Company', width: 150 },
    { field: 'position', headerName: 'Position', width: 150 },
    { field: 'website', headerName: 'Website', width: 200 },
    {
      field: 'coverLetter',
      headerName: 'Cover Letter',
      width: 100,
      renderCell: (params) => (
        <Checkbox checked={params.value} style={{color:'white'}} disabled />
      ),
    },
    {
      field: 'applied',
      headerName: 'Applied',
      width: 80,
      renderCell: (params) => (
        <Checkbox checked={params.value} style={{color:'white'}} disabled />
      ),
    },
    {
      field: 'interviewed',
      headerName: 'Interviewed',
      width: 100,
      renderCell: (params) => (
        <Checkbox checked={params.value} style={{color:'white'}} disabled />
      ),
    },
    { field: 'notes', headerName: 'Notes', width: 200 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 70,
      renderCell: (params) => (
        <IconButton onClick={() => handleEditCareer(params.row)}>
          <EditIcon sx={{color:'rgba(184, 134, 11)'}}/>
        </IconButton>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 70,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteCareer(params.row.id)}>
          <DeleteIcon sx={{ color: 'rgba(210, 77, 87)' }}/>
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
        maxWidth: 850,
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
        <IconButton onClick={handleAddCareer}>
          <AddIcon sx={{ color: 'white' }} />
        </IconButton>
      </Box>

      <div className="title">Careers</div>

      <DataGrid
        rows={careers}
        columns={columns}
        disableRowSelectionOnClick
        disableColumnMenu
        hideFooterPagination
        hideFooterSelectedRowCount
        hideFooter
        sx={{ 
        borderColor: "transparent",
            '& .MuiDataGrid-cell': {
              color: 'white',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              color: 'white',
            }}}
      />

      {/* Popup window */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{selectedCareer ? 'Edit Career' : 'Add Career'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Company"
            value={newCareer.company}
            onChange={(e) => handleInputChange(e, 'company')}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Position"
            value={newCareer.position}
            onChange={(e) => handleInputChange(e, 'position')}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Website"
            value={newCareer.website}
            onChange={(e) => handleInputChange(e, 'website')}
            fullWidth
            margin="normal"
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={newCareer.coverLetter}
              onChange={(e) => handleInputChange(e, 'coverLetter')}
            />
            <span>Cover Letter</span>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox checked={newCareer.applied} onChange={(e) => handleInputChange(e, 'applied')} />
            <span>Applied</span>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={newCareer.interviewed}
              onChange={(e) => handleInputChange(e, 'interviewed')}
            />
            <span>Interviewed</span>
          </Box>
          <TextField
            label="Notes"
            value={newCareer.notes}
            onChange={(e) => handleInputChange(e, 'notes')}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveCareer}>
            {selectedCareer ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Careers;
