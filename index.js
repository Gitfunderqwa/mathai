const OpenAI = require('openai')
const { Configuration, OpenAIApi } = OpenAI
require('dotenv').config()

const configuration = new Configuration({
    organization: "org-ozt1nCpyFO5a2ctK0UVZySMv",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3001

app.use(bodyParser.json())
app.use(cors())

app.post('/', async (req, res) => {
    const {message} = req.body
    const {difficulty} = req.body
    const {questions} = req.body
    const {selectedOption} = req.body

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `You are a advanced math model with a purpose to make math questions in Latex. 
        Your task is to make ${questions} question${(questions > 1 ? '' : 's')} on the topic of ${message}. 
        Your questions level of difficulty is determined by the grade and this questions grade is ${selectedOption}. 
        Your questions must include mathematical equations that have been tested in schools ranging in difficulties from 1 to 4.
        This questions difficulty is ${difficulty}.`,
        max_tokens: 100,
        temperature: 0,
      });
      if(response.data.choices[0].text) {
        res.json({
        message: response.data.choices[0].text
    })}
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})