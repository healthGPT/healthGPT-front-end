export const ChatReducer = (state, action) => {
  switch (action.type) {
    case "addUserMessage":
      return {
        ...state,
        messages: [...state.messages, { text: action.payload, user: "user" }],
      };
    case "addBotMessage":
      return {
        ...state,
        messages: [...state.messages, { text: action.payload, user: "bot" }],
      };
    default:
      throw new Error();
  }
};
