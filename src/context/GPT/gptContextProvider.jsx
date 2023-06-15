import React, { createContext, useState, useEffect } from "react";

// Create the context
const GptContext = createContext();

// Create the context provider component
const GptContextProvider = ({ children }) => {
  const [selectedDiet, setSelectedDiet] = useState("");

  const [context, setContext] = useState([]);
  const [responses, setResponses] = useState(() => {
    const localData = localStorage.getItem("gptResponses");
    return localData ? JSON.parse(localData) : [];
  });

  const [dietResponses, setDietResponses] = useState(() => {
    const localData = localStorage.getItem("gptDietResponses");
    return localData ? JSON.parse(localData) : null;
  });

  const [runningResponses, setRunningResponses] = useState(() => {
    const localData = localStorage.getItem("gptRuningResponses");
    return localData ? JSON.parse(localData) : null;
  });

  const addInput = (inputText) => {
    setContext((prevContext) => [...prevContext, inputText]);
  };

  const setGptResponse = (responseText) => {
    const newResponses = [...responses, responseText];
    setResponses(newResponses);
    localStorage.setItem("gptResponses", JSON.stringify(newResponses)); // Store the responses in local storage
  };

  const saveResponse = (file, index) => {
    const responseToSave = responses[index];
    if (responseToSave) {
      const blob = new Blob([responseToSave], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file;
      link.click();
    }
  };

  // Retrieve the stored responses from local storage when the component mounts
  useEffect(() => {
    const storedResponses = localStorage.getItem("gptResponses");
    if (storedResponses) {
      setResponses(JSON.parse(storedResponses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gptDietResponses", JSON.stringify(dietResponses));
  }, [dietResponses]);

  useEffect(() => {
    localStorage.setItem(
      "gptRuningResponses",
      JSON.stringify(runningResponses)
    );
  }, [runningResponses]);

  return (
    <GptContext.Provider
      value={{
        context,
        responses,
        addInput,
        setGptResponse,
        saveResponse,
        dietResponses,
        setDietResponses,
        selectedDiet,
        setSelectedDiet,
        runningResponses,
        setRunningResponses,
      }}
    >
      {children}
    </GptContext.Provider>
  );
};

export { GptContext, GptContextProvider };
