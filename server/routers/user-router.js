const express = require("express");
const { addUser, getUserInfo } = require("../db/queries/users");
const { userValidator } = require("../functions/helpers");
const router = express.Router();
const userQueries = require("../db/queries/users");

//POST user to api/user route...database
router.post("/", (req, res) => {
  const user = req.body; //set user to body of request
  return userValidator(user.sub).then((result) => { //validate if user exists in database
    if (result === false) { 
      addUser(user) //if doesnt exist (false) add user
        .then((user) => {
          res.send(user);
        })
        .catch((e) => res.send(e));
    }
    if (result === true) {
      console.log("user already in database"); //if does exist in database (true)
      getUserInfo(user.sub) //return the users information from database to populate components
        .then((user) => {
          res.send(user);
        })
        .catch((e) => res.send(e));
    }
  });
});

module.exports = router;
