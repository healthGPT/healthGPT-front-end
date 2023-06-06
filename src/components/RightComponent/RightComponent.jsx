import React, { useContext } from "react";
import { SummaryContext } from "../../context/Summary/SummaryContext";

import "./RightComponent.style.css";

const RightCompnent = () => {
  const { summaryData } = useContext(SummaryContext);

  console.log(summaryData);

  return (
    <React.Fragment>
      <DataComponent summaryData={summaryData} />
    </React.Fragment>
  );
};

const DataComponent = ({ summaryData }) => {
  if (!summaryData) {
    return <p>No data available</p>;
  }
  return (
    <div className="right-component-wrapper">
      {Object.keys(summaryData["Bioresonance-Test-Report"]).map((key) => (
        <div key={key}>
          <h3 style={{ textAlign: "left" }}>{key}</h3>
          <p style={{ textAlign: "left" }}>
            {summaryData["Bioresonance-Test-Report"][key].Explanation}
          </p>
          <p style={{ textAlign: "left" }}>
            Count: {summaryData["Bioresonance-Test-Report"][key].Count}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RightCompnent;
