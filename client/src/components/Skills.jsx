import React, { useState } from 'react';
import Box from "@mui/material/Box";
import { IconButton, MenuItem, Select, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, InputLabel } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [open, setOpen] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);

  const columns = [
    {
      field: 'skill',
      headerName: 'Skill',
      width: 150,
      renderCell: (params) => (
        <div>{params.value}</div>
      ),
    },
    {
      field: 'skillLevel',
      headerName: 'Skill Level',
      width: 150,
      renderCell: (params) => (
        <div>{params.value}</div>
      ),
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 70,
      renderCell: (params) => (
        <IconButton onClick={() => handleEditSkill(params.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 70,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteSkill(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const handleAddSkill = () => {
    setSelectedSkill(null);
    setNewSkill({ skill: '', skillLevel: '' });
    setOpen(true);
  };

  const handleDeleteSkill = (id) => {
    setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== id));
  };

  const handleEditSkill = (skill) => {
    setSelectedSkill(skill);
    setNewSkill(skill);
    setOpen(true);
  };

  const handleSaveSkill = () => {
    if (selectedSkill) {
      setSkills((prevSkills) =>
        prevSkills.map((skill) => (skill.id === selectedSkill.id ? { ...newSkill, id: selectedSkill.id } : skill))
      );
    } else {
      const newId = skills.length > 0 ? skills[skills.length - 1].id + 1 : 1;
      setSkills((prevSkills) => [...prevSkills, { ...newSkill, id: newId }]);
    }

    setOpen(false);
  };

  const handleInputChange = (event, field) => {
    setNewSkill((prevSkill) => ({
      ...prevSkill,
      [field]: event.target.value,
    }));
  };

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
        <IconButton onClick={handleAddSkill}>
          <AddIcon />
        </IconButton>
      </Box>

      <div className="title">Skills</div>

      <Box sx={{ marginTop: "20px" }}>
        <DataGrid
          rows={skills}
          columns={columns}
          sx={{ borderColor: "transparent" }}
          disableRowSelectionOnClick
          disableColumnMenu
          hideFooterPagination
        />
      </Box>

      {/* Popup window */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{selectedSkill ? 'Edit Skill' : 'Add Skill'}</DialogTitle>
        <DialogContent sx={{ width: '250px' }}>
          <TextField
            label="Skill"
            value={newSkill.skill}
            onChange={(event) => handleInputChange(event, 'skill')}
            variant="standard"
            fullWidth
            margin="dense"
          />
          <InputLabel
            variant="standard"
            shrink={Boolean(newSkill.skillLevel)}
            sx={{ fontSize: '1rem', fontWeight: 500, marginTop: '8px' }}
          >
            Skill Level
          </InputLabel>
          <Select
            label="Skill Level"
            value={newSkill.skillLevel}
            onChange={(event) => handleInputChange(event, 'skillLevel')}
            variant="standard"
            fullWidth
            margin="dense"
            sx={{ minWidth: '120px' }}
          >
            <MenuItem value="Beginner">Beginner</MenuItem>
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