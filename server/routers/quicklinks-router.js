const express = require("express");
const router = express.Router();
const quickLinksQueries = require("../db/queries/quickLinks");

// GET /api/quicklinks => return raw data quicklinks
// router.get("/", (req, res) => {
//   quickLinksQueries.getQuickLinks().then((result) => {
//     res.json(result);
//   });
// });

//TEST

router.get("/", (req, res) => {
  quickLinksQueries.testLink().then((result) => {
    res.json(result);
  });
});

module.exports = router;
