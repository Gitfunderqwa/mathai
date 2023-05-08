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

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            "role":
            "system",
            "content":
            "You can only write mathematical equations and functions using Latex code. You are tasked with making exam level questions. Ensure there is proper spacing between questions."
          }, {
            "role": "user",
            "content": `I need a exam question for the South African IEB curriculum.`,
          }, {
            'role': 'assistant',
            "content": "I will generate a test for the South african IEB curriculum in latex code, what would you like the test to be on? "
          }, {
            "role": "user",
            "content": `I need a exam question on ${ message } for a grade ${selectedOption.value} South Africa student. Make the test level ${difficulty.value}. You can only write in latex code and include "\\" for space.`,
          }, {
            'role': 'assistant',
            "content": "Question: "
          }]
    })
    console.log(response.data.choices[0].message)
      if(response.data.choices[0].message) {
        res.json({
        message: response.data.choices[0].message
    })}
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})