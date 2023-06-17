const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");

router.get("/", (req, res) => {
  userQueries.getUserInfo().then((result) => {
    res.json(result);
  });
});

module.exports = router;
