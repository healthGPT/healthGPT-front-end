import "./SearchBar.styles.css";
import { useState, useContext } from "react";
import ChatContext from "../../context/Chat/ChatContext";
import { mockAPICall } from "../../context/Chat/ChatActions";
import { fetchCompletionOpenAI } from "../helper/openai";

import { Configuration, OpenAIApi } from "openai";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const { addUserMessage, addBotMessage } = useContext(ChatContext);

  const openai = new OpenAIApi(
    new Configuration({
      apiKey: "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",
    })
  );

  const topic = "JavaScript";
  const question = "How to learn programming";

  // Setting values for the prompt and message to be used in the GPT-3 and GPT-3.5-Turbo
  const GPT3Prompt = `Give an example of ${question} in ${topic}`;
  const GPT35TurboMessage = [
    { role: "system", content: `You are a ${topic} developer.` },
    {
      role: "user",
      content: "Which npm package is best of openai api development?",
    },
    {
      role: "assistant",
      content: "The 'openai' Node.js library.",
    },
    { role: "user", content: question },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Function to generate text using GPT-3 model
    let GPT3 = async (prompt) => {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens: 500,
      });
      return response.data.choices[0].text;
    };

    let GPT35Turbo = async (message) => {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: message,
      });

      return response.data.choices[0].message.content;
    };

    // Log the generated text from the GPT-3 and GPT-3.5-Turbo models to the console
    console.log("### I'm GPT-3. ####", await GPT3(GPT3Prompt));
    console.log(
      "### I'm GPT-3.5-TURBO. ####",
      await GPT35Turbo(GPT35TurboMessage)
    );

    // addUserMessage(input);

    // try {
    //   const response = await fetchCompletionOpenAI(input);

    //   console.log(response);

    //   addBotMessage(response);

    //   setInput("");
    // } catch (error) {
    //   console.error("Error:", error);
    //   // Handle error condition here, e.g., show an error message to the user
    // }
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
