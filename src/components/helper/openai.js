import { Configuration, OpenAIApi } from "openai";

// export const fetchCompletionOpenAI = async (inputText) => {
//     try {
//       const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ...`,
//         },
//         body: JSON.stringify({
//           prompt: inputText,
//           model: 'gpt-3.5-turbo',
//           max_tokens: 100,
//           temperature: 0.7,
//         }),
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to fetch completion from OpenAI API');
//       }
  
//       const data = await response.json();
//       return data.choices[0].text;
//     } catch (error) {
//       console.error('Error:', error);
//       throw error;
//     }
//   };
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  })
);
  
export let GPT35Turbo = async (message) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: message,
  });

  return response.data.choices[0].message.content;
};


