const express = require("express");
const router = express.Router();
const userQueries = require("../db/queries/users");

router.get("/", (req, res) => {
  userQueries.getUserInfo().then((result) => {
    res.json(result);
  });
});

router.post("/find", (req, res) => {
  const user = req.body;
  console.log(user);
  console.log("FIRE");
});
module.exports = router;
