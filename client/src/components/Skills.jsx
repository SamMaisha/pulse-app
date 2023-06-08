import React, { useState } from 'react';
import Box from "@mui/material/Box";
import { IconButton, MenuItem, Select, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const Skills = () => {
  const [skills, setSkills] = useState([
    // { id: 1, skill: '', skillLevel: '' }
  ]);
  const [open, setOpen] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('');

  const columns = [
    {
      field: 'skill',
      headerName: 'Skill',
      width: 120,
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
      width: 120,
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
      field: 'delete',
      headerName: 'Delete',
      width: 50,
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
    setSkills((prevSkills) => [...prevSkills, newSkillData]);
    handleClose();
  };

  // const handleSkillChange = (value, id) => {
  //   setSkills((prevSkills) =>
  //     prevSkills.map((skill) =>
  //       skill.id === id ? { ...skill, skill: value } : skill
  //     )
  //   );
  // };

  // const handleSkillLevelChange = (value, id) => {
  //   setSkills((prevSkills) =>
  //     prevSkills.map((skill) =>
  //       skill.id === id ? { ...skill, skillLevel: value } : skill
  //     )
  //   );
  // };

  const handleDeleteSkill = (id) => {
    setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== id));
  };

  return (
    <Box
      sx={{
        position: "relative",
        padding: 3,
        borderRadius: 5,
        borderColor: "rgba(91, 130, 130, 0.4)",
        height: 300,
        width: "150%",
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
        <DialogTitle>Add Skill</DialogTitle>
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
          <Button onClick={handleAddSkill}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>

  );
};

export default Skills;