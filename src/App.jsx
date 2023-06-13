import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Chat from "./pages/Chat";
import { SummaryContextProvider } from "./context/Summary/SummaryContext";
import { JsonDataProvider } from "./context/UserUploads/JsonDataContext";
import { SectionProvider } from "./context/Sections/SectionsContext";
import { GptContextProvider } from "./context/GPT/gptContextProvider";
import { LoadingProvider } from "./context/LoadingContext/LoadingContext";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <LoadingProvider>
              <GptContextProvider>
                <JsonDataProvider>
                  <SectionProvider>
                    <SummaryContextProvider>
                      <Home />
                    </SummaryContextProvider>
                  </SectionProvider>
                </JsonDataProvider>
              </GptContextProvider>
            </LoadingProvider>
          }
        />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
};

export default App;
