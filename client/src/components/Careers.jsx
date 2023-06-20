import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const Careers = () => {
  // careers state used to store the careers data fetched from the API 
  // and represents the list of careers that will be displayed in the component.
  const [careers, setCareers] = useState([]);

  // newCareer state holds the temporary data for the career being added or edited.
  const [newCareer, setNewCareer] = useState('');

  // selectedCareer state holds the selection of the career being edited.
  const [selectedCareer, setSelectedCareer] = useState(null);

  // open state controls the Dialog(popup window).
  const [open, setOpen] = useState(false);

  // get user id from session storage
  const userId = window.sessionStorage.getItem('userId');

  // Axios GET request to fetch data from API
  useEffect(() => {
    axios.get(`/api/careers/${userId}`)
      .then((response) => {
        setCareers(response.data);
      })
  }, [])

  const handleAddCareer = () => {
    setSelectedCareer(null);
    setNewCareer({
      company_name: '',
      job_title: '',
      job_link: '',
      is_coverletter_generated: false,
      is_applied: false,
      is_interviewed: false,
      notes: '',
    });
    setOpen(true);
  };


  const handleDeleteCareer = (id) => {
    // Axios DELETE request to delete data here
    axios.delete(`/api/careers/${userId}/${id}`, id).then(() => {
      setCareers((prevCareers) => prevCareers.filter((career) => career.id !== id));
    })
  };

  const handleEditCareer = (career) => {
    setSelectedCareer(career);
    setNewCareer(career);
    setOpen(true);
  };

  const handleSaveCareer = () => {
    if (selectedCareer) {
      // Axios PUT request to edit data here
      const careerId = selectedCareer.id
      axios.put(`/api/careers/${userId}/${careerId}`, newCareer).then(() => {
        setCareers((prevCareers) =>
        prevCareers.map((career) =>
          career.id === selectedCareer.id ? { ...newCareer, id: selectedCareer.id } : career
        )
      );
      })
    } else {
      // Axios POST request to add data here
      axios.post(`/api/careers/${userId}`, newCareer).then((response) => {
        console.log(response.data)
        const newId = response.data.id
        setCareers((prevCareers) => [...prevCareers, { ...newCareer, id: newId }]);
      })
    }
    setOpen(false);
  };

  const handleInputChange = (event, field) => {
    const value = field === 'is_coverletter_generated' || field === 'is_applied' || field === 'is_interviewed' ? event.target.checked : event.target.value;

    setNewCareer((prevCareer) => ({
      ...prevCareer,
      [field]: value,
    }));
  };

  const columns = [
    { field: 'company_name', headerName: 'Company', width: 150 },
    { field: 'job_title', headerName: 'Position', width: 150 },
    { field: 'job_link', headerName: 'Website', width: 150 },
    {
      field: 'is_coverletter_generated',
      headerName: 'Cover Letter',
      width: 110,
      renderCell: (params) => (
        <Checkbox checked={params.value} style={{ color: 'white' }} disabled />
      ),
    },
    {
      field: 'is_applied',
      headerName: 'Applied',
      width: 100,
      renderCell: (params) => (
        <Checkbox checked={params.value} style={{ color: 'white' }} disabled />
      ),
    },
    {
      field: 'is_interviewed',
      headerName: 'Interviewed',
      width: 100,
      renderCell: (params) => (
        <Checkbox checked={params.value} style={{ color: 'white' }} disabled />
      ),
    },
    { field: 'notes', headerName: 'Notes', width: 240 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 70,
      renderCell: (params) => (
        <IconButton onClick={() => handleEditCareer(params.row)}>
          <EditIcon sx={{ color: 'rgba(184, 134, 11)' }} />
        </IconButton>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 70,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteCareer(params.row.id)}>
          <DeleteIcon sx={{ color: 'rgba(210, 77, 87)' }} />
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
        width: '99%',
        marginBottom: '20px',
        marginTop: '40px',
        marginRight: '20px',
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
          }
        }}
      />

      {/* Popup window */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{selectedCareer ? 'Edit Career' : 'Add Career'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Company"
            value={newCareer.company_name}
            onChange={(e) => handleInputChange(e, 'company_name')}
            fullWidth
            varient="standard"
            margin="dense"
          />
          <TextField
            label="Position"
            value={newCareer.job_title}
            onChange={(e) => handleInputChange(e, 'job_title')}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Website"
            value={newCareer.job_link}
            onChange={(e) => handleInputChange(e, 'job_link')}
            fullWidth
            margin="normal"
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={newCareer.is_coverletter_generated}
              onChange={(e) => handleInputChange(e, 'is_coverletter_generated')}
            />
            <span style={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: 'bold' }}>Cover Letter</span>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={newCareer.is_applied}
              onChange={(e) => handleInputChange(e, 'is_applied')} />
            <span style={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: 'bold' }}>Applied</span>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={newCareer.is_interviewed}
              onChange={(e) => handleInputChange(e, 'is_interviewed')}
            />
            <span style={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: 'bold' }}>Interviewed</span>
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
