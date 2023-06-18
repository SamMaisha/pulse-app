import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import { IconButton, MenuItem, Select, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, InputLabel } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const Skills = () => {
  // skills state used to store the skills data fetched from the API 
  // and represents the list of skills that will be displayed in the component.
  const [skills, setSkills] = useState([]);

  // newSkill state holds the temporary data for the skill being added or edited.
  const [newSkill, setNewSkill] = useState('');

  // selectedSkill state holds the selection of the skill being edited.
  const [selectedSkill, setSelectedSkill] = useState(null);

  // open state controls the Dialog(popup window).
  const [open, setOpen] = useState(false);

  // get user id from session storage
  const userId = window.sessionStorage.getItem('userId');

  // Axios GET request to fetch data from API
  useEffect(() => {
    axios.get(`/api/skills/${userId}`)
      .then((response) => {
        setSkills(response.data);
      })
  }, [])

  const handleAddSkill = () => {
    setSelectedSkill(null);
    setNewSkill({ skill: '', status: '' });
    setOpen(true);
  };

  const handleDeleteSkill = (id) => {
    // Axios DELETE request to delete data here
    axios.delete(`/api/skills/${userId}/${id}`, id).then(() => {
      setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== id));
    })
    
  };

  const handleEditSkill = (skill) => {
    setSelectedSkill(skill);
    setNewSkill(skill);
    setOpen(true);
  };

  const handleSaveSkill = () => {
    if (selectedSkill) {
      //Axios PUT request to edit data here
      const skillId = selectedSkill.id;
      axios.put(`/api/skills/${userId}/${skillId}`, newSkill)
      .then(() => {
        setSkills((prevSkills) =>
        prevSkills.map((skill) => (skill.id === selectedSkill.id ? { ...newSkill, id: selectedSkill.id } : skill))
      )}
      )     
    } else {
      //Axios POST request to add data here
      axios.post(`/api/skills/${userId}`, newSkill)
      .then((response) => {
        console.log(response.data)
        const newId = response.data.id
        setSkills((prevSkills) => [...prevSkills, { ...newSkill, id: newId }]);
      })
    }
    setOpen(false);
  };

  const handleInputChange = (event, field) => {
    setNewSkill((prevSkill) => ({
      ...prevSkill,
      [field]: event.target.value,
    }));
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Skill',
      width: 200,
      renderCell: (params) => (
        <div>{params.value}</div>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      renderCell: (params) => (
        <div>{params.value}</div>
      ),
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 80,
      renderCell: (params) => (
        <IconButton onClick={() => handleEditSkill(params.row)} sx={{ color: 'rgba(184, 134, 11)' }}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 80,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteSkill(params.row.id)} sx={{ color: 'rgba(210, 77, 87)' }}>
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
        width: "200%",
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
        <IconButton onClick={handleAddSkill} sx={{ color: 'white' }}>
          <AddIcon />
        </IconButton>
      </Box>

      <div className="title">Skills</div>

      <Box sx={{ marginTop: "20px" }}>
        <DataGrid
          rows={skills}
          columns={columns}
          sx={{
            borderColor: "transparent",
            '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeaderTitle': {
              color: 'white',
            },
          }}
          disableRowSelectionOnClick
          disableColumnMenu
          hideFooterPagination
          hideFooterSelectedRowCount
          hideFooter
        />
      </Box>

      {/* Popup window */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{selectedSkill ? 'Edit Skill' : 'Add Skill'}</DialogTitle>
        <DialogContent sx={{ width: '250px' }}>
          <TextField
            label="Skill"
            value={newSkill.name}
            onChange={(event) => handleInputChange(event, 'name')}
            variant="standard"
            fullWidth
            margin="dense"
          />
          <InputLabel
            variant="standard"
            shrink={Boolean(newSkill.status)}
            sx={{ fontSize: '1rem', fontWeight: 500, marginTop: '8px' }}
          >
            Skill Level
          </InputLabel>
          <Select
            label="Skill Level"
            value={newSkill.status}
            onChange={(event) => handleInputChange(event, 'status')}
            variant="standard"
            fullWidth
            margin="dense"
            sx={{ minWidth: '120px' }}
          >
            <MenuItem value="Novice">Novice</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveSkill}>{selectedSkill ? "Save" : "Add"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Skills;