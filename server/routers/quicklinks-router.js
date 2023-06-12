const express = require("express");
const router = express.Router();
const quickLinksQueries = require("../db/queries/quickLinks");

//////////////////////////// TEST WITHOUT USER ID ////////////////////////////////

//TEST GET
router.get("/", (req, res) => {
  quickLinksQueries.testLink().then((result) => {
    res.json(result);
  });
});

/////////////////////////////////////// WITH USER ID //////////////////////////////////

//GET /api/quicklinks/:userid => return raw data quicklinks for user
router.get("/:userid", (req, res) => {
  const userId = req.params.userid;
  quickLinksQueries.getQuickLinks(userId).then((result) => {
    res.json(result);
  });
});

// PUT /api/quicklinks/:userid/:quicklinkid
router.put("/:userid/:quicklinkid", (req, res) => {
  const { userId, quickLinkId } = req.params;
  const newName = req.body.name;
  const newUrl = req.body.url;

  // update quicklink in database
  quickLinksQueries
    .updateQuickLink(userId, quickLinkId, newName, newUrl)
    .then((result) => res.json(result));
});

// POST /api/quicklinks/:userid
router.post("/:userid", (req, res) => {
  const userId = req.params.userid;
  const quickLinkName = req.body.name;
  const quickLinkUrl = req.body.url;

  // add quicklink to database
  quickLinksQueries
    .addQuickLink(userId, quickLinkName, quickLinkUrl)
    .then((result) => res.status(201).json(result));
});

module.exports = router;
