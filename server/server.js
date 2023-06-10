require("dotenv").config({ path: "./.env" });
const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 8001;

// Middleware
app.use(morgan("dev"));
app.use(express.json());

// require routers
const quickLinksRouter = require("./routers/quicklinks-router");

// use routers
app.use("/api/quicklinks", quickLinksRouter);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
