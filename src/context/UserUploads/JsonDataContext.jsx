import React, { useState, createContext } from "react";

// Create a new context for the JSON data
export const JsonDataContext = createContext();

// Create a provider component for the JSON data context
export const JsonDataProvider = ({ children }) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    age: "",
    sex: "",
    heightFeet: "",
    heightInches: "",
    weight: "",
    job: "",
  });

  const [jsonData, setJsonData] = useState(() => {
    const localData = localStorage.getItem("jsonData");
    return localData ? JSON.parse(localData) : null;
  });

  const [jsonDataHealthPredisposition, setJsonDataHealthPredisposition] =
    useState(() => {
      const localData = localStorage.getItem("jsonDataHealthPredisposition");
      return localData ? JSON.parse(localData) : null;
    });

  const [jsonDataPharmacogenetics, setJsonDataPharmacogenetics] = useState(
    () => {
      const localData = localStorage.getItem("jsonDataPharmacogenetics");
      return localData ? JSON.parse(localData) : null;
    }
  );

  const [jsonDataBloodPanel, setJsonDataBloodPanel] = useState(() => {
    const localData = localStorage.getItem("jsonDataBloodPanel");
    return localData ? JSON.parse(localData) : null;
  });

  // UserInfoForm
  const [userInfoForm, setUserInfoForm] = useState(() => {
    const localData = localStorage.getItem("UserInfoForm");
    return localData ? JSON.parse(localData) : null;
  });

  const handleFileChange = (data) => {
    localStorage.setItem("jsonData", JSON.stringify(data));
    setJsonData(data);
  };

  const handleFileChangeHealthPredisposition = (data) => {
    localStorage.setItem("jsonDataHealthPredisposition", JSON.stringify(data));
    setJsonDataHealthPredisposition(data);
  };

  // Pharmacogenetics Report
  const handleFileChangePharmacogenetics = (data) => {
    localStorage.setItem("jsonDataPharmacogenetics", JSON.stringify(data));
    setJsonDataPharmacogenetics(data);
  };

  // Blood Panel Report
  const handleFileChangeBloodPanel = (data) => {
    localStorage.setItem("jsonDataBloodPanel", JSON.stringify(data));
    setJsonDataBloodPanel(data);
  };

  return (
    <JsonDataContext.Provider
      value={{
        jsonData,
        setJsonData,
        handleFileChange,
        jsonDataHealthPredisposition,
        setJsonDataHealthPredisposition,
        handleFileChangeHealthPredisposition,
        jsonDataPharmacogenetics,
        setJsonDataPharmacogenetics,
        handleFileChangePharmacogenetics,
        jsonDataBloodPanel,
        setJsonDataBloodPanel,
        handleFileChangeBloodPanel,
        userInfoForm,
        setUserInfoForm,
        formState,
        setFormState,
      }}
    >
      {children}
    </JsonDataContext.Provider>
  );
};
