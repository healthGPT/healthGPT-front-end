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
  const healthDataExample = [
    {
      title: "Roman's Health Overview",
      content:
        "Roman's health is at risk due to his stressful and sedentary lifestyle. His physical demand ratings are low while his mental demand ratings are high. In addition, his job is largely sedentary, which puts him at greater risk of developing obesity, heart disease, and other chronic health conditions.",
    },
    {
      title: "Weight Loss",
      content:
        "Since Roman's body mass index (BMI) is 26.5, which is in the overweight range, it would be beneficial for him to lose weight to reduce his risk of developing obesity-related health problems. He can achieve weight loss by following a balanced diet that is rich in fruits, vegetables, lean protein, and whole grains. He should also avoid processed foods, sugary drinks, and unhealthy snacks.",
    },
    {
      title: "Exercise",
      content:
        "Roman should engage in regular physical activity to get his body moving and burn calories. He can start by incorporating at least 30 minutes of moderate-intensity exercise into his daily routine, such as walking, jogging, cycling, or strength training. He should aim for 150 minutes of moderate-intensity physical activity per week.",
    },
    {
      title: "Stress Management",
      content:
        "Since Roman rates his stress level at 7 out of 10, it is important to manage his stress in a healthy way. He can try mindfulness meditation, deep breathing exercises, yoga, or other relaxation techniques to reduce his stress level. He should also make time for enjoyable activities such as hobbies, socializing or spending time with family and friends.",
    },
    {
      title: "Work-Life Balance",
      content:
        "Roman should prioritize work-life balance to improve his overall quality of life. He should set boundaries around his work hours, try to negotiate flexible working agreements, and take breaks during the day to recharge.",
    },
    {
      title: "Socialization",
      content:
        "Since he is at high risk of being isolated because of his remote work, Roman should seek socialization outside of work by joining clubs or groups that interest him. He could also consider making use of technology to connect with friends and family.",
    },
  ];

  const healthData = [
    {
      role: "system",
      content: `You are a lifecoach and health expert`,
    },
    {
      role: "user",
      content: `I will give you some data about a person and their lifestyle. I want you to make some health predictions and suggestions based on the data.`,
    },
    {
      role: "assistant",
      content: `Based on the provided data: ${value}, please make health predictions and suggestions tailored to the person's lifestyle and circumstances. Include relevant insights, such as exercise recommendations, dietary guidelines, stress management techniques, and other appropriate suggestions.`,
    },
    {
      role: "assistant",
      content: `pretend like you are talking to the user`,
    },
    {
      role: "user",
      content: `Here is the information about the person: ${value}`,
    },
    {
      role: "assistant",
      content: `Name: ${value.name}
                Age: ${value.age}
                Sex: ${value.sex}
                Height: ${value.heightFeet} feet ${value.heightInches} inches
                Weight: ${value.weight} pounds
                Job: ${value.job.job}
                - Stress Level: ${value.job.stressLevel}
                - Sedentary Level: ${value.job.sedentaryLevel}
                - Physical Demand: ${value.job.physicalDemand}
                - Mental Demand: ${value.job.mentalDemand}
                - Work Hours: ${value.job.workHours.average} hours per week (with ${value.job.workHours.overtime} overtime) 
                - Nutrition Impact: High stress and sedentary work could impact eating habits (Rating: 5)
                - Hazard Exposure: Minimal exposure to hazardous substances (Rating: 1)
                - Social Isolation: Potential for isolation if remote work (Rating: 4)`,
    },
    {
      role: "user",
      content:
        "Please provide health predictions and suggestions based on this information.",
    },
    {
      role: "assistant",
      content: `make the response in this form: ${healthDataExample}`,
    },
    {
      role: "user",
      content: `make paragraph breaks to make sure the repsonse renders properly`,
    },
  ];

  return healthData;
};

  export const generateDietPrompt = (userInfo, diet) => {

    const generateDietPromptGPT = [
      {
        role: "user",
        content: `can you give me a weekly diet plan for this person: ${userInfo}`,
      },
      {
        role: "user",
        content: `For this diet: ${diet}`,
      },
      {
        role: "user",
        content: `put the this into a json properly, the best way you think it should be formatted, keep in mind the goal of this format is for it to render on the front end properly, respond in this format: 
        "dietPlan": {
            "restriction": "noOilAdded",
            "meals": [
              {
                "day": "Monday",
                "mealItems": [
                  "Breakfast: …”,
                  "Lunch: …”,
                  "Snack: …”,
                  "Dinner: …”
                ]
              },
              {
                "day": "Tuesday",
                "mealItems": [
                   "Breakfast: …”,
                  "Lunch: …”,
                  "Snack: …”,
                  "Dinner: …”
                ]
              },
              {
                "day": "Wednesday",
                "mealItems": [
                   "Breakfast: …”,
                  "Lunch: …”,
                  "Snack: …”,
                  "Dinner: …”
                ]
              },
              {
                "day": "Thursday",
                "mealItems": [
                  "Breakfast: …”,
                  "Lunch: …”,
                  "Snack: …”,
                  "Dinner: …”
                ]
              },
              {
                "day": "Friday",
                "mealItems": [
                  "Breakfast: …”,
                  "Lunch: …”,
                  "Snack: …”,
                  "Dinner: …”
                ]
              },
              {
                "day": "Saturday",
                "mealItems": [
                  "Breakfast: …”,
                  "Lunch: …”,
                  "Snack: ..”,
                  "Dinner: …”
                ]
              },
              {
                "day": "Sunday",
                "mealItems": [
                  "Breakfast: …”,
                  "Lunch: …”,
                  "Snack: …”,
                  "Dinner: …”
                ]
              }
            ]
          }`,
      },
    ];
  
    return generateDietPromptGPT;
  };


  export const generateRunningPlan = (userInfo) => {
    // switch statement that returns based on the section passed in
  
    const generateRunningPlanGPT = [
      {
        role: "user",
        content: `Make a running workout plan for this person: ${userInfo}`,
      },
      {
        role: "user",
        content: `Make it into a json object, with Monday through Sunday, here’s a good example: {
            "description": “…”,
            "running": {
                "Monday": {
                    "workoutType": “…”,
                    "description": “…”,
                    "distance": “…”
                },
                "Tuesday": {
                     "workoutType": “…”,
                    "description": “…”,
                    "distance": “…”
                },
                "Wednesday": {
                   "workoutType": “…”,
                    "description": “…”,
                    "distance": “…”
                },
                "Thursday": {
                    "workoutType": “…”,
                    "description": “…”,
                    "distance": “…”
                },
                "Friday": {
                    "workoutType": “…”,
                    "description": “…”,
                    "distance": “…”
                },
                "Saturday": {
                     "workoutType": “…”,
                    "description": “…”,
                    "distance": “…”
                },
                "Sunday": {
                    "workoutType": “…”,
                    "description": “…”,
                    "distance": “…”
                }
            },
            "notes": “…”
        } `,
      },

    ];
  
    return generateRunningPlanGPT
  };


  export const generateSuggestionUserInfo = (userInfo) => {
    // switch statement that returns based on the section passed in
  
    const generateSuggestionUserInfoGPT = [
      {
        role: "user",
        content: `Make a lifestyle suggestion for this person: ${userInfo}`,
      },
      {
        role: "user",
        content: `break down these suggestions in 6 categories:
        - Nutrition: take into consideration job of the user and other things 
        - Exercise: take into consideration bmi of the user and other factors 
        - Stress Management:  take into consideration job of the user and other things 
        - Mental Health: take into consideration job of the user and other things 
        - Hazard Exposure: take into consideration job of the user and other things 
        - Social Isolation: take into consideration job of the user and other things  `,
      },
      {
        role: "user",
        content: `Please return this response in a json format`,
      },

    ];
  
    return generateSuggestionUserInfoGPT
  };

// const GPT35TurboMessageMetalSensitivities = [
//     { role: "system", content: `You are an expert on ${section} in human beings.` },

//     { role: "user", content: `Give me a description for ${section} specifically ${value}, make it short description, of about three sentences, in that say what can cause this sensitivity in a person` },
//   ];

//   const GPT35TurboMessageMetalSensitivities = [
//     { role: "system", content: `As an expert in ${section}, I'll provide you with a concise description of ${value} sensitivity and its potential causes.` },

//     { role: "user", content: `Could you please give me a brief overview of ${value} sensitivity and what can cause this sensitivity in a person?` },
//     ];
