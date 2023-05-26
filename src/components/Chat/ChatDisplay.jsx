import React, { useContext } from "react";
import ChatContext from "../../context/Chat/ChatContext";
import "./ChatDisplay.styles.css";
import TypingEffect from "../helper/TypingEffect";

const ChatDisplay = () => {
  const { messages } = useContext(ChatContext);

  console.log(messages);

  return (
    <div className="chatDisplay">
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.user}`}>
          {/* {message.user === "bot" ? (
            <TypingEffect text={message.text} />
          ) : (
            <p>{message.text}</p>
          )} */}

          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatDisplay;
