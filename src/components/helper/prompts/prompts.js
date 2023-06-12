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
        // 
        content: `Consider covering the following topics in your response: the general concept of ${section}, common causes of ${value} sensitivity, potential symptoms of ${value} sensitivity, and any preventative measures or treatment options that might exist. Also, please ensure the information is understandable for non-experts and fits in 3 or fewer sentences.`,
      },
    ];
  
    return GPT35TurboMessageMetalSensitivities;
  };


  export const UserInfoPrompt = (value) => {
    const healthData = [
      {
        role: "system",
        content: `You are a health expert in ${value}, specifically in human beings.`,
      },
      {
        role: "user",
        content: `I will give you some data about a person and their lifestyle in ${value}. I want you to make some health predictions and suggestions based on the data.`,
      },
      {
        role: "assistant",
        content: `Based on the provided data in ${value}, please make health predictions and suggestions tailored to the person's lifestyle and circumstances. Include relevant insights, such as exercise recommendations, dietary guidelines, stress management techniques, and other appropriate suggestions.`,
      },
      {
        role: "user",
        content: "Here is the information about the person:",
      },
      {
        role: "assistant",
        content: `Name: Roman
  Age: 24
  Sex: Male
  Height: 5 feet 11 inches
  Weight: 190 pounds
  Job: Software Engineer
  - Stress Level: 7
  - Sedentary Level: 9
  - Physical Demand: 2
  - Mental Demand: 8
  - Work Hours: 40 hours per week (with occasional overtime)
  - Nutrition Impact: High stress and sedentary work could impact eating habits (Rating: 5)
  - Hazard Exposure: Minimal exposure to hazardous substances (Rating: 1)
  - Social Isolation: Potential for isolation if remote work (Rating: 4)`,
      },
      {
        role: "user",
        content: "Please provide health predictions and suggestions based on this information.",
      },
    ];
  
    return healthData;
  };
  
  

  // const GPT35TurboMessageMetalSensitivities = [
//     { role: "system", content: `You are an expert on ${section} in human beings.` },

//     { role: "user", content: `Give me a description for ${section} specifically ${value}, make it short description, of about three sentences, in that say what can cause this sensitivity in a person` },
//   ];

//   const GPT35TurboMessageMetalSensitivities = [
//     { role: "system", content: `As an expert in ${section}, I'll provide you with a concise description of ${value} sensitivity and its potential causes.` },

//     { role: "user", content: `Could you please give me a brief overview of ${value} sensitivity and what can cause this sensitivity in a person?` },
//     ];