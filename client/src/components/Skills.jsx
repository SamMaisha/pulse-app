import React, { useState } from 'react';
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";




const Skills = () => {
  const [newSkill, setNewSkill] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [skills, setSkills] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleAddSkill = () => {
    const skill = {
      skillName: newSkill,
      skillLevel: skillLevel,
    };
    setOpen(true);
    setSkills((prevSkills) => [...prevSkills, skill]);
    setNewSkill('');
    setSkillLevel('');
  };

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
        <IconButton onClick={handleAddSkill}>
          <AddIcon />
        </IconButton>
      </Box>
      <div className="title">Skills</div>
    </Box>

  )
}

export default Skills
