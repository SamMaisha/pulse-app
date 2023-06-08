import React, { useState } from 'react';
import Box from "@mui/material/Box";
import { IconButton, MenuItem, Select, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const Skills = () => {
  const [skills, setSkills] = useState([
    { id: 1, skill: '', skillLevel: '' }
  ]);

  const columns = [
    {
      field: 'skill',
      headerName: 'Skill',
      width: 150,
      renderCell: (params) => (
        <TextField
          value={params.value}
          onChange={(event) => handleSkillChange(event.target.value, params.id)}
          variant="standard"
          size="small"
          fullWidth
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
          onChange={(event) => handleSkillLevelChange(event.target.value, params.id)}
          sx={{ minWidth: '120px' }}
          variant="standard"
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
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteSkill(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const handleAddSkill = () => {
    const newSkill = {
      id: skills.length + 1,
      skill: '',
      skillLevel: '',
    };
    setSkills((prevSkills) => [...prevSkills, newSkill]);
  };

  const handleSkillChange = (value, id) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) =>
        skill.id === id ? { ...skill, skill: value } : skill
      )
    );
  };

  const handleSkillLevelChange = (value, id) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) =>
        skill.id === id ? { ...skill, skillLevel: value } : skill
      )
    );
  };

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
    </Box>
  );
};

export default Skills;