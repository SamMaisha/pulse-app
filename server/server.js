require("dotenv").config({ path: "./.env" });
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
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
const careersRouter = require("./routers/careers-router");
const userRouter = require("./routers/user-router");
const openAIRouter = require("./routers/open-ai-route")

// use routers
app.use("/api/quicklinks", quickLinksRouter);
app.use("/api/skills", skillsRouter);
app.use("/api/opportunities", opportunitiesRouter);
app.use("/api/careers", careersRouter);
app.use("/api/user", userRouter);
app.use("/api/openAI", openAIRouter);


app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
