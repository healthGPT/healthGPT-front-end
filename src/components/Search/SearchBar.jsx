import "./SearchBar.styles.css";
import { useState, useContext } from "react";
import ChatContext from "../../context/Chat/ChatContext";
import { mockAPICall } from "../../context/Chat/ChatActions";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const { addUserMessage, addBotMessage } = useContext(ChatContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    addUserMessage(input);

    // Mock API call
    const response = await mockAPICall(input);

    addBotMessage(response);

    setInput("");
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="main-searchbar-container">
        <div className="upper-half-main-search-bar">
          <input
            className="chat-input"
            type="text"
            value={input}
            placeholder="Type here"
            onChange={handleInputChange}
          />
        </div>
        <div className="half-line" />
        <div className="lower-half-main-search-bar">
          <div className="lower-half-main-search-bar-div">
            <button className="send-form-button">
              <div className="btn-inside-container">
                {/* <span className="spacer-btn-send">Send</span> */}
                <img
                  src="/airplane-3.png"
                  alt="airplane"
                  className="btn-image-send"
                />
              </div>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
