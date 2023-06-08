import React, { useState } from 'react';
import Box from "@mui/material/Box";
import { IconButton, MenuItem, Select, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [open, setOpen] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('');

  const columns = [
    {
      field: 'skill',
      headerName: 'Skill',
      width: 150,
      renderCell: (params) => (
        <TextField
          value={params.value}
          variant="standard"
          size="small"
          fullWidth
          disabled
        />
      ),
    },
    {
      field: 'skillLevel',
      headerName: 'Skill Level',
      width: 150,
      renderCell: (params) => (
        <Select
          value={params.value}
          variant="standard"
          size="small"
          fullWidth
          disabled
        >
          <MenuItem value="Beginner">Beginner</MenuItem>
          <MenuItem value="Intermediate">Intermediate</MenuItem>
          <MenuItem value="Advanced">Advanced</MenuItem>
        </Select>
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewSkill('');
    setNewSkillLevel('');
  };

  const handleAddSkill = () => {
    const newSkillData = {
      id: skills.length + 1,
      skill: newSkill,
      skillLevel: newSkillLevel,
    };

    const existingSkill = skills.findIndex(skill => skill.id === newSkillData.id);
    if (existingSkill !== -1) {
      // const updatedSkills = skills.map((skill) =>
      //   skill.id === newSkillData.id ? newSkillData : skill
      // );
      const updatedSkills = [...skills];
      updatedSkills[existingSkill] = newSkillData;
      setSkills(updatedSkills);
    } else {
      setSkills((prevSkills) => [...prevSkills, newSkillData]);
    }

    handleClose();
  };

  const handleDeleteSkill = (id) => {
    setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== id));
  };

  const handleEditSkill = (skillData) => {
    setNewSkill(skillData.skill);
    setNewSkillLevel(skillData.skillLevel);
    setOpen(true);
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
        <IconButton onClick={handleOpen}>
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{newSkill ? "Edit Skill" : "Add Skill"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            variant="standard"
            fullWidth
            margin="dense"
          />
          <Select
            label="Skill Level"
            value={newSkillLevel}
            onChange={(e) => setNewSkillLevel(e.target.value)}
            variant="standard"
            fullWidth
            margin="dense"
          >
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddSkill}>{newSkill ? "Save" : "Add"}</Button>
        </DialogActions>
      </Dialog>
    </Box>

  );
};

export default Skills;