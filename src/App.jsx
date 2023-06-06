import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Chat from "./pages/Chat";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
};

export default App;
