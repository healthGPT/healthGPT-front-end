import "./App.css";
import { ChatProvider } from "./context/Chat/ChatContext";
import ChatDisplay from "./components/Chat/ChatDisplay";
import SearchBar from "./components/Search/SearchBar";

function App() {
  return (
    <div className="App">
      <h3>pqCHAT</h3>

      <ChatProvider>
        <ChatDisplay />
        <SearchBar />
      </ChatProvider>
    </div>
  );
}

export default App;
