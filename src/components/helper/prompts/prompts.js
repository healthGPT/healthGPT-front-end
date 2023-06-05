export const generatePrompts = (section, value) => {

    // switch statement that returns based on the section passed in 

    const GPT35TurboMessageMetalSensitivities = [
      {
        role: "system",
        content: `You are an expert in ${section}, specifically ${value}, in human beings.`,
      },
      {
        role: "user",
        content: `Could you please give me a brief overview of ${value} sensitivity and what can cause this sensitivity in a person?`,
      },
      {
        role: "assistant",
        content: `Consider covering the following topics in your response: the general concept of ${section}, common causes of ${value} sensitivity, potential symptoms of ${value} sensitivity, and any preventative measures or treatment options that might exist. Also, please ensure the information is understandable for non-experts and fits in 3 or fewer sentences.`,
      },
    ];
  
    return GPT35TurboMessageMetalSensitivities;
  };
  

  // const GPT35TurboMessageMetalSensitivities = [
//     { role: "system", content: `You are an expert on ${section} in human beings.` },

//     { role: "user", content: `Give me a description for ${section} specifically ${value}, make it short description, of about three sentences, in that say what can cause this sensitivity in a person` },
//   ];

//   const GPT35TurboMessageMetalSensitivities = [
//     { role: "system", content: `As an expert in ${section}, I'll provide you with a concise description of ${value} sensitivity and its potential causes.` },

//     { role: "user", content: `Could you please give me a brief overview of ${value} sensitivity and what can cause this sensitivity in a person?` },
//     ];