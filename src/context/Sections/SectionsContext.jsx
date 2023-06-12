import React, { useState, createContext } from "react";

export const SectionContext = createContext();

export const SectionProvider = ({ children }) => {
  const [section, setSection] = useState("User Info");

  return (
    <SectionContext.Provider value={{ section, setSection }}>
      {children}
    </SectionContext.Provider>
  );
};
