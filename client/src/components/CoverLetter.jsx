import React, { useEffect, useState } from "react";
import axios from "axios";
import ClimbingBoxLoader from "react-spinners/ClipLoader";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { set } from "date-fns";

// Sample data
const initialSkills = [
  { id: 1, skill: "CSS", skillLevel: "Intermediate" },
  { id: 2, skill: "JavaScript", skillLevel: "Advanced" },
  { id: 3, skill: "Ruby", skillLevel: "Beginner" },
];

const initialCareers = [
  {
    id: 1,
    company: "Lighthouse Labs",
    position: "Lecturer",
    website: "https://www.lighthouselabs.ca/",
    coverLetter: true,
    applied: true,
    interviewed: false,
    notes: "Some notes here",
  },
  {
    id: 2,
    company: "Company B",
    position: "Position B",
    website: "https://www.example.com",
    coverLetter: false,
    applied: true,
    interviewed: true,
    notes: "Some notes for Company B",
  },
];

const CoverLetter = () => {
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState([]);
  const [strengths, setStrengths] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [response, setResponse] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const promptData = {
    position,
    company,
    experience,
    skills,
    strengths,
    extraInfo,
  };

  const handleSave = async () => {
    setOpen(false);
    try {
      setIsLoading(true); //set state at beginning of call
      const gptResponse = await axios.post(
        "http://localhost:8001/gpt-prompt",
        promptData
      );
      setResponse(gptResponse.data); //setResponse to chatgpt data
    } catch (err) {
      console.log("Error", err);
    } finally {
      setIsLoading(false); //set loadingIconState back to false
    }
  };

  const handleSkillsChange = (event) => {
    setSkills(event.target.value);
  };

  const handleStrengthsChange = (event) => {
    setStrengths(event.target.value);
  };
  if (response !== "") {
    return (
      <Box
        sx={{
          position: "relative",
          padding: 1,
          borderRadius: 5,
          height: "60%",
          marginLeft: "50px",
          bgcolor: "rgba(91, 130, 130, 0.4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        <Box mt={2}>
          <div className="title">Cover Letter Generator</div>
        </Box>
        <Box sx={{ overflow: "auto", height: "85%", marginBottom: "10px" }}>
          {response}
        </Box>
        <Button onClick={() => setResponse("")} variant="contained">
          Reset
        </Button>
      </Box>
    );
  } else {
    return (
      <>
        {isloading ? (
          <Box
            sx={{
              position: "relative",
              padding: 1,
              borderRadius: 5,
              height: "60%",
              marginLeft: "50px",
              bgcolor: "rgba(91, 130, 130, 0.4)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            <ClimbingBoxLoader loading={isloading} />
            <Box>Loading Response</Box>
          </Box>
        ) : (
          <Box
            sx={{
              position: "relative",
              padding: 1,
              borderRadius: 5,
              height: "60%",
              marginLeft: "50px",
              bgcolor: "rgba(91, 130, 130, 0.4)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            <Box>
              <div className="title">Cover Letter Generator</div>
            </Box>

            <Box mt={4}>
              <p> Generated Cover Letter here. </p>
            </Box>

            <Box mt="auto" mb={2}>
              <Button
                variant="contained"
                onClick={() => setOpen(true)}
                color="secondary"
                sx={{
                  borderRadius: "5px",
                  background: "rgba(184, 134, 11)",
                  fontSize: "15px",
                }}
              >
                Create my Cover Letter
              </Button>
            </Box>

            {/* Popup window */}
            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle>Information for your Cover Letter</DialogTitle>
              <DialogContent>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    What position are you appllying for?
                  </FormLabel>
                  <RadioGroup
                    aria-label="career"
                    value={position} // Use the company state to track the selected company
                    onChange={(event) => setPosition(event.target.value)}
                  >
                    {initialCareers.map((career) => (
                      <FormControlLabel
                        key={career.id}
                        value={`${career.position},${career.company}`} // Concatenate company and position for value
                        control={<Radio />}
                        label={`${career.position} - ${career.company}`}
                      />
                    ))}
                    <FormControlLabel
                      value="custom" // Use "custom" as the value for the custom input option
                      control={<Radio />}
                      label="Custom"
                    />
                  </RadioGroup>
                </FormControl>

                {position === "custom" && (
                  <Box mt={2}>
                    <TextField
                      label="Position"
                      value={position}
                      onChange={(event) => setPosition(event.target.value)}
                      variant="outlined"
                      fullWidth
                      margin="dense"
                    />
                    <TextField
                      label="Company"
                      value={company}
                      onChange={(event) => setCompany(event.target.value)}
                      variant="outlined"
                      fullWidth
                      margin="dense"
                    />
                  </Box>
                )}

                <Box mt={2}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      How many years of experience do you have?
                    </FormLabel>
                    <RadioGroup
                      aria-label="experience"
                      value={experience}
                      onChange={(event) => setExperience(event.target.value)}
                    >
                      <FormControlLabel
                        value="No experience"
                        control={<Radio />}
                        label="No experience"
                      />
                      <FormControlLabel
                        value="Less than 3 years"
                        control={<Radio />}
                        label="Less than 3 years"
                      />
                      <FormControlLabel
                        value="3-5 years"
                        control={<Radio />}
                        label="3-5 years"
                      />
                      <FormControlLabel
                        value="5-10 years"
                        control={<Radio />}
                        label="5-10 years"
                      />
                      <FormControlLabel
                        value="More than 10 years"
                        control={<Radio />}
                        label="More than 10 years"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>

                <Box mt={2}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      Choose your top 3 job skills for this position
                    </FormLabel>
                    <FormGroup>
                      {initialSkills.map((skill) => (
                        <FormControlLabel
                          key={skill.id}
                          control={
                            <Checkbox
                              checked={skills.includes(skill.skill)} // Check if the skill is in the selected job skills
                              onChange={handleSkillsChange}
                              value={skill.skill}
                            />
                          }
                          label={skill.skill}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                </Box>

                <Box mt={2}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      Choose your top 3 strengths
                    </FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={strengths.includes("Strength 1")} // Check if the strength is in the selected strengths
                            onChange={handleStrengthsChange}
                            value="Strength 1"
                          />
                        }
                        label="Strength 1"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={strengths.includes("Strength 2")}
                            onChange={handleStrengthsChange}
                            value="Strength 2"
                          />
                        }
                        label="Strength 2"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={strengths.includes("Strength 3")}
                            onChange={handleStrengthsChange}
                            value="Strength 3"
                          />
                        }
                        label="Strength 3"
                      />
                    </FormGroup>
                  </FormControl>
                </Box>

                <Box mt={2}>
                  <TextField
                    label="Anything you want to specify in your letter?"
                    value={extraInfo}
                    onChange={(event) => setExtraInfo(event.target.value)}
                    variant="outlined"
                    fullWidth
                    margin="dense"
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => handleSave()}>Submit</Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}{" "}
      </>
    );
  }
};

export default CoverLetter;
