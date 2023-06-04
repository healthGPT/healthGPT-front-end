import { ChatProvider } from "../context/Chat/ChatContext";
import ChatDisplay from "../components/Chat/ChatDisplay";
import SearchBar from "../components/Search/SearchBar";

const Chat = () => {
  return (
    <div className="App">
      <h1>Chat</h1>

      <ChatProvider>
        <ChatDisplay />
        <SearchBar />
      </ChatProvider>
    </div>
  );
};

export default Chat;
