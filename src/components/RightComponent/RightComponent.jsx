import React, { useContext } from "react";
import { SummaryContext } from "../../context/Summary/SummaryContext";

import "./RightComponent.style.css";

const RightCompnent = () => {
  const { summaryData } = useContext(SummaryContext);

  console.log(summaryData);

  //   console.log(Object.keys(summaryData["Bioresonance-Test-Report"]));

  //   const { key, value } =
  //     summaryData["Bioresonance-Test-Report"]["Food-Items"].Details[0];
  //   console.log(key, value);
  //   console.log(summaryData["Bioresonance-Test-Report"]["Food-Items"].Details[0]);

  return (
    <React.Fragment>
      <DataComponent summaryData={summaryData} />
    </React.Fragment>
  );
};

const DataComponent = ({ summaryData }) => {
  if (!summaryData || !summaryData["Bioresonance-Test-Report"]) {
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
          <div style={{ display: "flex" }}>
            {summaryData["Bioresonance-Test-Report"][key].Details ? (
              summaryData["Bioresonance-Test-Report"][key].Details.map(
                (detail, index) => {
                  const style = {
                    color: index % 2 === 0 ? "red" : "black", // Change this to your desired condition
                  };
                  return (
                    <p key={index} style={style}>
                      {detail.Item ||
                        detail.Nutrient ||
                        detail.Metal ||
                        detail.Strain ||
                        detail.Hormone ||
                        detail.Enzyme}
                      : {detail.Sensitivity || detail.Imbalance}
                    </p>
                  );
                }
              )
            ) : (
              <p>No details available for this category.</p>
            )}
          </div>
          <p style={{ textAlign: "left" }}>
            Count: {summaryData["Bioresonance-Test-Report"][key].Count}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RightCompnent;
