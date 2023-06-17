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
  const jobTitle = req.body.job_title;
  const companyName = req.body.company_name;
  const jobLink = req.body.job_link;
  const isCoverLetterGenerated = req.body.is_coverletter_generated;
  const isApplied = req.body.is_applied;
  const isInterviewed = req.body.is_interviewed;
  const notes = req.body.notes;
  // update career in database
  careersQueries
    .updateCareer(
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
  const jobTitle = req.body.job_title;
  const companyName = req.body.company_name;
  const jobLink = req.body.job_link;
  const isCoverLetterGenerated = req.body.is_coverletter_generated;
  const isApplied = req.body.is_applied;
  const isInterviewed = req.body.is_interviewed;
  const notes = req.body.notes;
  // add career to database
  careersQueries
    .addCareer(
      userId,
      jobTitle,
      companyName,
      jobLink,
      isCoverLetterGenerated,
      isApplied,
      isInterviewed,
      notes
    )
    .then((result) => res.status(201).json(result));
});

// DELETE /api/careers/:userid/:careerid
router.delete("/:userid/:careerid", (req, res) => {
  const userId = req.params.userid;
  const careerId = req.params.careerid;
  // delete career from database
  careersQueries
    .deleteCareer(userId, careerId)
    .then(() => res.status(200).send("career entry deleted successfully"));
});

module.exports = router;
