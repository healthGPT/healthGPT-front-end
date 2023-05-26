// this is where we make our api call to OpenAI
export const mockAPICall = async (message) => {
  // Here, you would typically make the API call to OpenAI's GPT-3 service.
  // For now, let's just reverse the user's message to mock a response.
  return message.split("").reverse().join("");
};
