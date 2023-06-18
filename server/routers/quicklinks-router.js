const express = require("express");
const router = express.Router();
const quickLinksQueries = require("../db/queries/quickLinks");

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
  const userId = req.params.userid;
  const quickLinkId = req.params.quicklinkid;
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

// DELETE /api/quicklinks/:userid/:quicklinkid
router.delete("/:userid/:quicklinkid", (req, res) => {
  const userId = req.params.userid;
  const quickLinkId = req.params.quicklinkid;
  // delete quicklink from database
  quickLinksQueries
    .deleteQuickLink(userId, quickLinkId)
    .then(() => res.status(200).send("quicklink deleted successfully"));
});

module.exports = router;
