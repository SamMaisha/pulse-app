const express = require("express");
const router = express.Router();
const opportunitiesQueries = require("../db/queries/opportunities");

//////////////////////////// TEST WITHOUT USER ID ////////////////////////////////

//TEST GET
router.get("/", (req, res) => {
  opportunitiesQueries.testOpportunities().then((result) => {
    res.json(result);
  });
});

/////////////////////////////////////// WITH USER ID //////////////////////////////////

//GET /api/opportunities/:userid
router.get("/:userid", (req, res) => {
  const userId = req.params.userid;
  opportunitiesQueries.getOpportunities(userId).then((result) => {
    res.json(result);
  });
});

// PUT /api/opportunities/:userid/:opportunityid
router.put("/1/:opportunityid", (req, res) => {
  const userId = 1;
  const opportunityId = req.params.opportunityid;
  const newName = req.body.name;
  const newDate = req.body.date;
  const newNote = req.body.notes;
  // update opportunity in database
  opportunitiesQueries
    .updateOpportunity(userId, opportunityId, newName, newDate, newNote)
    .then((result) => res.json(result));
});

// POST /api/opportunities/:userid
router.post("/:userid", (req, res) => {
  const userId = req.params.userid;
  const opportunityName = req.body.name;
  const opportunityDate = req.body.date;
  const opportunityNote = req.body.notes;
  // add opportunity to database
  opportunitiesQueries
    .addOpportunity(userId, opportunityName, opportunityDate, opportunityNote)
    .then((result) => res.status(201).json(result));
});

// DELETE /api/opportunities/:userid/:opportunityid
router.delete("/:userid/:opportunityid", (req, res) => {
  const userId = req.params.userid;
  const opportunityId = req.params.opportunityid;
  // delete opportunity from database
  opportunitiesQueries
    .deleteOpportunity(userId, opportunityId)
    .then(() =>
      res.status(200).send("networking opportunity deleted successfully")
    );
});

module.exports = router;
