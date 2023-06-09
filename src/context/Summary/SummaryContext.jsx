import React, { createContext, useState } from "react";

export const SummaryContext = createContext();

export const SummaryContextProvider = ({ children }) => {
  const [summaryData, setSummaryData] = useState(null);

  //   console.log(summaryData);

  const updateSummaryData = (data) => {
    setSummaryData(data);
  };

  const contextValue = {
    summaryData,
    updateSummaryData,
  };

  return (
    <SummaryContext.Provider value={contextValue}>
      {children}
    </SummaryContext.Provider>
  );
};
