const OpenAI = require("openai")
require('dotenv').config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})



exports.getBotResponse = async (msg) => {
  const prompt = `
    Imagine you're a highly trained chatbot specialized in psychology and mental health guide among university students. 
    A student asks the following: ${msg}. Use clear and concise language and add a personal touch. Do not have more than 10 sentences
    Return response in the following parsable JSON format:

    {
        "botResponse": "response"
    }
  `

  try {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-16k-0613",
        messages: [],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })

    const parsableJSONresponse = response.data.choices[0].text.trim()
    
    let parsedResponse
    try {
      parsedResponse = JSON.parse(parsableJSONresponse)
    } catch (error) {
      console.error("Error parsing JSON response:", error)
      throw new Error("Failed to parse response from OpenAI API")
    }

    console.log("Bot response:", parsedResponse.botResponse)
    return parsedResponse.botResponse
  } catch (error) {
    console.error("Error getting response from OpenAI API:", error)
    throw new Error("Failed to get response from OpenAI API")
  }
}
