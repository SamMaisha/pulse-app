const express = require("express");
const { addUser, getUserInfo } = require("../db/queries/users");
const { userValidator } = require("../functions/helpers");
const router = express.Router();
const userQueries = require("../db/queries/users");

// router.get("/", (req, res) => {
//   userQueries.getUserInfo().then((result) => {
//     res.json(result);
//   });
// });

// router.post("/find", (req, res) => {
//   const user = req.body;
//   console.log(user);
//   console.log("FIRE");
// });
// module.exports = router;

router.post("/", (req, res) => {
  console.log(req.body);
  const user = req.body;
  return userValidator(user.sub).then((result) => {
    if (result === false) {
      addUser(user)
        .then((user) => {
          res.send(user);
        })
        .catch((e) => res.send(e));
    }
    if (result === true) {
      console.log("user already in database");
      getUserInfo(user.sub)
        .then((user) => {
          res.send(user);
        })
        .catch((e) => res.send(e));
    }
  });
});

module.exports = router;
