import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Chat from "./pages/Chat";
import { SummaryContextProvider } from "./context/Summary/SummaryContext";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <SummaryContextProvider>
              <Home />
            </SummaryContextProvider>
          }
        />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
};

export default App;
