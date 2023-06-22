const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
const openai = new OpenAIApi(configuration);

router.post("/", async (req, res) => {
    try {
        const promptData = req.body;

        const prompt = `
    Hello chatGPT. Please craft a cover letter
    for the position of ${promptData.position}. 
    The company that I will be applying at is 
    ${promptData.company}. The necessary experience that I
    posses is ${promptData.experience} The top skills I 
    possess for this job are ${promptData.topSkills}. 
    These are the strenghts that which I believe will
    help me excel and succeed in this job, 
    ${promptData.strengths}. Please use this additional
    information to really drive home an authentic and
    genuine cover letter, ${promptData.extraInfo}. Please
    contextualize the data relevant to the position being 
    applied to.
    `;

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 2500,
            temperature: 0.4,
        });
        res.send(completion.data.choices[0].text);
    } catch (err) {
        console.log(err); //more specific error
    }
});

module.exports = router;