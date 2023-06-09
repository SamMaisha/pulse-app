const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
const bodyParser = require('body-parser');
const { addUser } = require("./db/queries/users");
const { userValidator } = require('./functions/helpers')



const app = express();
const port = 8001;
app.use(cors());
app.use(bodyParser.json());

// Middleware
app.use(morgan("dev"));


//get request, validate user,
//check if useEffect fires in other routes/pages

app.post('/users', (req, res) => {
  const user = req.body;
  return userValidator(user.userId)
  .then(result => {
    if (result === false) {
      addUser(user)
      .then (user => {
        res.send(user);
      })
      .catch(e => res.send(e));
    }
    if (result === true) {
      console.log('user already in database');
    }
  })
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
