import React, { useContext, useState } from "react";
import { SummaryContext } from "../../context/Summary/SummaryContext";

import RegularButton from "../../components/Buttons/RegularButton";
import LeftAccordionCategories from "../../components/LeftAccordionCategories/LeftAccordionCategories";
import PercentDot from "../../components/PercentDot/PercentDot";
import RightCompnent from "../../components/RightComponent/RightComponent";
import "./Home.styles.css";
import { generateSummary } from "../../components/helper/helper";
import { SummaryContextProvider } from "../../context/Summary/SummaryContext";

const Home = () => {
  const { updateSummaryData } = useContext(SummaryContext);

  const [jsonData, setJsonData] = useState(() => {
    const localData = localStorage.getItem("jsonData");
    return localData ? JSON.parse(localData) : null;
  });

  const [jsonDataHealthPredisposition, setJsonDataHealthPredisposition] =
    useState(() => {
      const localData = localStorage.getItem("jsonDataHealthPredisposition");
      return localData ? JSON.parse(localData) : null;
    });

  // Bioresonence Test Report
  const handleFileChange = (data) => {
    localStorage.setItem("jsonData", JSON.stringify(data));
    setJsonData(data);
  };
  // Health Predisposition
  const handleFileChangeHealthPredisposition = (data) => {
    localStorage.setItem("jsonDataHealthPredisposition", JSON.stringify(data));
    setJsonDataHealthPredisposition(data);
  };

  const handleDataUpdate = () => {
    updateSummaryData(generateSummary(jsonData));
  };

  return (
    <React.Fragment>
      <WholeScreen>
        <LeftSide>
          <LeftAccordionCategories
            jsonData={jsonData}
            jsonDataHealthPredisposition={jsonDataHealthPredisposition}
            handleFileChange={handleFileChange}
            handleFileChangeHealthPredisposition={
              handleFileChangeHealthPredisposition
            }
          />
          {/* <RegularButton handleDataUpdate={handleDataUpdate} /> */}
        </LeftSide>
        <RightSide>
          <RightCompnent />
        </RightSide>
      </WholeScreen>
    </React.Fragment>
  );
};

export default Home;

const WholeScreen = ({ children }) => {
  return (
    <div
      className="whole-screen"
      style={{ width: "100%", height: "100vh", display: "flex" }}
    >
      {children}
    </div>
  );
};

const LeftSide = ({ children }) => {
  return (
    <div
      style={{
        width: "40%",
        // backgroundColor: "grey",
        overflow: "auto",
        padding: "10px",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
};

const RightSide = ({ children }) => {
  return (
    <div
      style={{
        width: "60%",
        backgroundColor: "white",
        overflow: "auto",
      }}
    >
      {children}
    </div>
  );
};
