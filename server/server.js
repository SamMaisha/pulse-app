require("dotenv").config({ path: "./.env" });
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const { addUser } = require("./db/queries/users");
const { userValidator } = require("./functions/helpers");
const app = express();
const port = 8001;

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

/////////////////////////////// ROUTER ///////////////////////////////////////////////

// require routers
const quickLinksRouter = require("./routers/quicklinks-router");
const skillsRouter = require("./routers/skills-router");
const opportunitiesRouter = require("./routers/opportunities-router");

// use routers
app.use("/api/quicklinks", quickLinksRouter);
app.use("/api/skills", skillsRouter);
app.use("/api/opportunities", opportunitiesRouter);

//////////////////////////////////// USER CONFIG ////////////////////////////////////////

//get request, validate user,
//check if useEffect fires in other routes/pages

app.post("/users", (req, res) => {
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
    }
  });
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
