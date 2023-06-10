const express = require("express");
const router = express.Router();
const quickLinksQueries = require("../db/queries/quickLinks");

//TEST
router.get("/", (req, res) => {
  quickLinksQueries.testLink().then((result) => {
    res.json(result);
  });
});

//GET /api/quicklinks/:userid => return raw data quicklinks for user
router.get("/:userid", (req, res) => {
  quickLinksQueries.getQuickLinks().then((result) => {
    res.json(result);
  });
});

module.exports = router;
