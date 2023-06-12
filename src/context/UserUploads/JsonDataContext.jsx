import React, { useState, createContext, useContext } from "react";

// Create a new context for the JSON data
export const JsonDataContext = createContext();

// Create a provider component for the JSON data context
export const JsonDataProvider = ({ children }) => {
  const [jsonData, setJsonData] = useState(() => {
    const localData = localStorage.getItem("jsonData");
    console.log(localData);
    return localData ? JSON.parse(localData) : null;
  });

  const handleFileChange = (data) => {
    localStorage.setItem("jsonData", JSON.stringify(data));
    setJsonData(data);
  };

  return (
    <JsonDataContext.Provider
      value={{ jsonData, setJsonData, handleFileChange }}
    >
      {children}
    </JsonDataContext.Provider>
  );
};
