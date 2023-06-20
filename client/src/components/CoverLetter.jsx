import React, { useEffect, useState } from "react";
import axios from "axios";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
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
  Snackbar,
  Container
} from "@mui/material";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

const CoverLetter = () => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    careers: [], // store the careers data fetched from the API
    skills: [], // store the skills data fetched from the API
    selectedCareer: "", // track the selected career and store it as an Array [position, company], or "custom"
    position: "", // track selected careers's position or store the custom position
    company: "", // track selected careers's company or store the custom company
    experience: "",
    topSkills: [], // track selected skills (0-3)
    extraInfo: "",
  });
  const [response, setResponse] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const userId = window.sessionStorage.getItem('userId');

  //handle user button click of copy paste button
  const handleCopyText = (response) => {
    navigator.clipboard.writeText(response);
    setSnackbarMessage(`Cover letter copied!`);
    setIsSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  // Axios GET request to fetch data from API
  useEffect(() => {
    Promise.all([
      axios.get(`/api/careers/${userId}`),
      axios.get(`/api/skills/${userId}`),
    ])
      .then((response) => {
        setState((prev) => ({
          ...prev,
          careers: response[0].data,
          skills: response[1].data,
        }))
      })
      .catch((error) => {
        console.log("Error on fetching data: " + error);
      });
  }, []);

  // Save all the information from the client
  // Generate the message and send it to OpenAI
  const handleSave = async () => {
    setOpen(false);
    try {
      setIsLoading(true); //set state at beginning of call
      const gptResponse = await axios.post("/api/openAI", state);
      setResponse(gptResponse.data); //setResponse to chatgpt data
    } catch (err) {
      console.log("Error", err);
    } finally {
      setIsLoading(false); //set loadingIconState back to false
    }
  };

  const handleInputChange = (event, field) => {
    setState((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
  };

  const handleSkillsChange = (event) => {
    const selectedSkills = Array.from(
      event.target.querySelectorAll('input[type="checkbox"]:checked')
    ).map((checkbox) => checkbox.value);

    setState((prevState) => ({
      ...prevState,
      topSkills: selectedSkills.slice(0, 3), // Limit the selected skills to a maximum of 3
    }));
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
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        />
        <Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', marginBottom: '20px' }}>
          <Box sx={{
            height: '50px',
            width: '100px',
            border: 1,
            borderRadius: '10%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            ":hover": {
              opacity: '50%'
            }
          }} onClick={() => setResponse("")}>
            <RotateLeftIcon sx={{ color: '#4ab5a1' }} variant="contained" size='medium' />
            Reset
          </Box>
          <Box sx={{
            height: '50px',
            width: '100px',
            border: 1,
            borderRadius: '10%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            ":hover": {
              opacity: '50%'
            }
          }} onClick={() => handleCopyText(response)}>
            <FileCopyIcon sx={{ color: '#4ab5a1' }} />
            Copy
          </Box>
        </Container>
        <Box>
        </Box>
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
            <ClimbingBoxLoader
              sx={{ opacity: "70%" }}
              loading={isloading}
              color={"#003933"}
            />
            <Box class="loading-message">Loading Response</Box>
          </Box>
        ) : (
          <Box
            sx={{
              position: "relative",
              padding: 2,
              borderRadius: 5,
              height: "60%",
              marginLeft: "50px",
              bgcolor: "rgba(91, 130, 130, 0.4)",
              display: "flex",
              flexDirection: "column",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <div className="title">Cover Letter Generator</div>
            </Box>

            <Box
              mt={4}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Lato",
                fontWeight: "regular",
              }}
            >
              <h7 class="cover-letter-ex"> Generated Cover Letter here. </h7>
            </Box>

            <Box
              mt="auto"
              mb={2}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={() => setOpen(true)}
                sx={{
                  borderRadius: "5px",
                  background: "rgba(184, 134, 11)",
                  fontSize: "15px",
                  fontFamily: "Lato",
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
                    What position are you applying for?
                  </FormLabel>
                  <RadioGroup
                    aria-label="career"
                    value={state.selectedCareer} // Use the state to track the selected position
                    onChange={(event) => {
                      const value = event.target.value;
                      const isCustom = value === "custom";

                      setState((prevState) => ({
                        ...prevState,
                        selectedCareer: value,
                        position: isCustom ? "" : value.split(",")[0],
                        company: isCustom ? "" : value.split(",")[1],
                      }));
                    }}
                  >
                    {state.careers.map((career) => (
                      <FormControlLabel
                        key={career.id}
                        value={`${career.job_title},${career.company_name}`} // Concatenate company and position for value
                        control={<Radio />}
                        label={`${career.job_title} - ${career.company_name}`}
                      />
                    ))}
                    <FormControlLabel
                      value="custom" // Use "custom" as the value for the custom input option
                      control={<Radio />}
                      label="Custom"
                    />
                  </RadioGroup>
                </FormControl>

                {/* If want to input custom position and company, show the following textfield */}
                {state.selectedCareer === "custom" && (
                  <Box mt={2}>
                    <TextField
                      label="Position"
                      value={state.position}
                      onChange={(event) => {
                        handleInputChange(event, "position");
                      }}
                      variant="outlined"
                      fullWidth
                      margin="dense"
                    />
                    <TextField
                      label="Company"
                      value={state.company}
                      onChange={(event) => {
                        handleInputChange(event, "company");
                      }}
                      variant="outlined"
                      fullWidth
                      margin="dense"
                      name="company"
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
                      value={state.experience}
                      onChange={(event) => {
                        handleInputChange(event, "experience");
                      }}
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
                      {state.skills.map((skill) => (
                        <FormControlLabel
                          key={skill.id}
                          control={
                            <Checkbox
                              checked={state.topSkills.includes(skill.name)} // Check if the skill is in the selected skills
                              onChange={handleSkillsChange}
                              value={skill.name}
                            />
                          }
                          label={skill.name}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                </Box>

                <Box mt={2}>
                  <TextField
                    label="Anything you want to specify in your letter?"
                    value={state.extraInfo}
                    onChange={(event) => {
                      handleInputChange(event, "extraInfo");
                    }}
                    variant="outlined"
                    fullWidth
                    margin="dense"
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleSave}>Submit</Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}{" "}
      </>
    );
  }
};

export default CoverLetter;
