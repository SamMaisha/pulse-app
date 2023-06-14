const express = require("express");
const router = express.Router();
const skillsQueries = require("../db/queries/skills");

//////////////////////////// TEST WITHOUT USER ID ////////////////////////////////

//TEST GET
router.get("/", (req, res) => {
  skillsQueries.testLinkSkills().then((result) => {
    res.json(result);
  });
});

/////////////////////////////////////// WITH USER ID //////////////////////////////////

//GET /api/skills/:userid => return raw data skills for user
router.get("/:userid", (req, res) => {
  const userId = req.params.userid;
  skillsQueries.getSkills(userId).then((result) => {
    res.json(result);
  });
});

// PUT /api/skills/:userid/:skillid
router.put("/:userid/:skillid", (req, res) => {
  const userId = req.params.userid;
  const skillId = req.params.skillid;
  const newName = req.body.name;
  const newStatus = req.body.status;
  // update skill in database
  skillsQueries
    .updateSkill(userId, skillId, newName, newStatus)
    .then((result) => res.json(result));
});

// POST /api/skills/:userid
router.post("/:userid", (req, res) => {
  const userId = req.params.userid;
  const skillName = req.body.name;
  const skillStatus = req.body.status;
  // add skill to database
  skillsQueries
    .addSkill(userId, skillName, skillStatus)
    .then((result) => res.status(201).json(result));
});

// DELETE /api/skills/:userid/:skillid
router.delete("/:userid/:skillid", (req, res) => {
  const userId = req.params.userid;
  const skillId = req.params.skillid;
  // delete skill from database
  skillsQueries
    .deleteSkill(userId, skillId)
    .then(() => res.status(200).send("skill deleted successfully"));
});

module.exports = router;
