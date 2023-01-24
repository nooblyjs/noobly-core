const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

const response =  openai.createCompletion({
  model: "code-davinci-002",
  prompt: "Explain to me what cloud computing is",
  temperature: 0,
  max_tokens: 60,
  top_p: 1.0,
  frequency_penalty: 0.5,
  presence_penalty: 0.0,
  stop: ["You:"],
});
 
response.then(data=>console.log(data.data.choices));