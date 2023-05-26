import React from "react";
import { ChatReducer } from "./ChatReducer";

const ChatContext = React.createContext();

export function ChatProvider({ children }) {
  const initialState = {
    messages: [],
  };
  const [state, dispatch] = React.useReducer(ChatReducer, initialState);

  const value = {
    messages: state.messages,
    addUserMessage: (text) => {
      dispatch({ type: "addUserMessage", payload: text });
    },
    addBotMessage: (text) => {
      dispatch({ type: "addBotMessage", payload: text });
    },
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export default ChatContext;
