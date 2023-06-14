const express = require("express");
const router = express.Router();
const careersQueries = require("../db/queries/careers");

//////////////////////////// TEST WITHOUT USER ID ////////////////////////////////

//TEST GET
router.get("/", (req, res) => {
  careersQueries.testGetCareer().then((result) => {
    res.json(result);
  });
});

/////////////////////////////////////// WITH USER ID //////////////////////////////////

//GET /api/careers/:userid
router.get("/:userid", (req, res) => {
  const userId = req.params.userid;
  careersQueries.getCareers(userId).then((result) => {
    res.json(result);
  });
});

// PUT /api/careers/:userid/:careerid
router.put("/:userid/:careerid", (req, res) => {
  const userId = req.params.userid;
  const careerId = req.params.careerid;
  const {
    jobTitle,
    companyName,
    jobLink,
    isCoverLetterGenerated,
    isApplied,
    isInterviewed,
    notes,
  } = req.body;

  // update career in database
  careersQueries
    .updateSkill(
      userId,
      careerId,
      jobTitle,
      companyName,
      jobLink,
      isCoverLetterGenerated,
      isApplied,
      isInterviewed,
      notes
    )
    .then((result) => res.json(result));
});

// POST /api/careers/:userid
router.post("/:userid", (req, res) => {
  const userId = req.params.userid;
  const skillName = req.body.name;
  const skillStatus = req.body.status;
  // add career to database
  careersQueries
    .addSkill(userId, skillName, skillStatus)
    .then((result) => res.status(201).json(result));
});

// DELETE /api/careers/:userid/:careerid
router.delete("/:userid/:skillid", (req, res) => {
  const userId = req.params.userid;
  const skillId = req.params.skillid;
  // delete career from database
  careersQueries
    .deleteSkill(userId, skillId)
    .then(() => res.status(200).send("skill deleted successfully"));
});

module.exports = router;
