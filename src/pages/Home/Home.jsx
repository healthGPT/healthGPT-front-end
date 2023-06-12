import React, { useContext, useState } from "react";
import { SummaryContext } from "../../context/Summary/SummaryContext";

import LeftAccordionCategories from "../../components/LeftAccordionCategories/LeftAccordionCategories";
import "./Home.styles.css";
import { generateSummary } from "../../components/helper/helper";
import { SummaryContextProvider } from "../../context/Summary/SummaryContext";

import { SectionProvider } from "../../context/Sections/SectionsContext";

import RightSideView from "../../components/RightComponent/RightSideView";

import { JsonDataProvider } from "../../context/UserUploads/JsonDataContext";

import { JsonDataContext } from "../../context/UserUploads/JsonDataContext";

const Home = () => {
  const { updateSummaryData } = useContext(SummaryContext);
  // const { setJsonData } = useContext(JsonDataContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weight, setWeight] = useState("");
  const [job, setJob] = useState("");

  // UserInfoForm
  const [userInfoForm, setUserInfoForm] = useState(() => {
    const localData = localStorage.getItem("UserInfoForm");
    return localData ? JSON.parse(localData) : null;
  });

  // const [jsonData, setJsonData] = useState(() => {
  //   const localData = localStorage.getItem("jsonData");
  //   return localData ? JSON.parse(localData) : null;
  // });

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

  // // Bioresonence Test Report
  // const handleFileChange = (data) => {
  //   localStorage.setItem("jsonData", JSON.stringify(data));
  //   setJsonData(data);
  // };

  // Health Predisposition
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

  // const handleDataUpdate = () => {
  //   updateSummaryData(generateSummary(jsonData));
  // };

  return (
    <React.Fragment>
      <WholeScreen>
        <LeftSide>
          <LeftAccordionCategories
            jsonDataHealthPredisposition={jsonDataHealthPredisposition}
            jsonDataPharmacogenetics={jsonDataPharmacogenetics}
            jsonDataBloodPanel={jsonDataBloodPanel}
            handleFileChangeHealthPredisposition={
              handleFileChangeHealthPredisposition
            }
            handleFileChangePharmacogenetics={handleFileChangePharmacogenetics}
            handleFileChangeBloodPanel={handleFileChangeBloodPanel}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            age={age}
            setAge={setAge}
            sex={sex}
            setSex={setSex}
            heightFeet={heightFeet}
            setHeightFeet={setHeightFeet}
            heightInches={heightInches}
            setHeightInches={setHeightInches}
            weight={weight}
            setWeight={setWeight}
            job={job}
            setJob={setJob}
            userInfoForm={userInfoForm}
            setUserInfoForm={setUserInfoForm}
          />
          {/* <RegularButton handleDataUpdate={handleDataUpdate} /> */}
        </LeftSide>
        <RightSide>
          {/* <RightCompnent /> */}

          <RightSideView />
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
        position: "relative",
        width: "60%",
        backgroundColor: "white",
        overflow: "auto",
      }}
    >
      {children}
    </div>
  );
};
