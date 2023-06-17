require("dotenv").config({ path: "./.env" });
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const { addUser } = require("./db/queries/users");
const { userValidator } = require("./functions/helpers");
const { Configuration, OpenAIApi } = require("openai");
const app = express();
const port = 8001;

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

/////////////////////////////// ROUTER ///////////////////////////////////////////////

// require routers
const quickLinksRouter = require("./routers/quicklinks-router");
const skillsRouter = require("./routers/skills-router");
const opportunitiesRouter = require("./routers/opportunities-router");
const careersRouter = require("./routers/careers-router");
const userRouter = require("./routers/user-router");

// use routers
app.use("/api/quicklinks", quickLinksRouter);
app.use("/api/skills", skillsRouter);
app.use("/api/opportunities", opportunitiesRouter);
app.use("/api/careers", careersRouter);
app.use("/api/user", userRouter);

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

/////////////////////////////// CHAT-GPT ///////////////////////////////////////////////
app.post("/gpt-prompt", async (req, res) => {
  try {
    const promptData = req.body;

    const prompt = `
  Hello chatGPT. Please craft a cover letter
  for the position of ${promptData.position}. 
  The company that I will be applying at is 
  ${promptData.company}. The years of experience 
  I have that can apply for this position is 
  ${promptData.position}. The necessary skills
  I have for this job are ${promptData.skills}. 
  These are the strenghts that which I believe will
  help me excel and succeed in this job, 
  ${promptData.strengths}. Please use this additional
  information to really drive home an authentic and
  genuine cover letter, ${promptData.extraInfo}.
  `;

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 2500,
    });
    res.send(completion.data.choices[0].text);
  } catch (err) {
    console.log(err); //more specific error
  }
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
