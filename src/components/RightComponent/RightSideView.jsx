import React, { useContext } from "react";
import { JsonDataContext } from "../../context/UserUploads/JsonDataContext";
import SearchBar from "../Search/SearchBar";
import "./RightComponent.style.css";

import { GptContext } from "../../context/GPT/gptContextProvider";

import { SectionContext } from "../../context/Sections/SectionsContext";

// import RenderParagraphsResponse from "../helper/RenderParagraphs/renderParagraphs";

import RenderParagraphsResponse from "../helper/RenderParagraphs";

const RightSideView = () => {
  const { section } = useContext(SectionContext);

  const renderSection = () => {
    switch (section) {
      case "User Info":
        return <UserInfo />;
      case "Blood Panel Test":
        return <BloodPanel />;
      case "Health Predisposition Report":
        return <HealthPredisposition />;
      case "Bioresonace Test":
        return <BioresonaceTest />;
      case "Pharmacognetics Report":
        return <PharmacogeneticsReport />;
      case "All":
        return <AllSections />;
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      {renderSection()}

      <SearchBar />
    </React.Fragment>
  );
};

export default RightSideView;

const UserInfo = () => {
  const { context, responses } = useContext(GptContext);
  return (
    <div className="scrollable-section" style={{ color: "white" }}>
      <h1>user info section</h1>
      <div>
        {context.map((text, index) => (
          <p key={index}>{text}</p>
        ))}

        {responses.map((response, index) => (
          <RenderParagraphsResponse key={index} data={response} />
        ))}
      </div>
    </div>
  );
};

const BloodPanel = () => {
  return (
    <div className="scrollable-section">
      <h1>blood panel test</h1>
    </div>
  );
};

const HealthPredisposition = () => {
  const { jsonDataHealthPredisposition } = useContext(JsonDataContext);
  return (
    <div className="scrollable-section" style={{ color: "white" }}>
      <h1>Health Predisposition</h1>
      {jsonDataHealthPredisposition && (
        <pre>{JSON.stringify(jsonDataHealthPredisposition, null, 2)}</pre>
      )}
    </div>
  );
};

const BioresonaceTest = () => {
  const { jsonData } = useContext(JsonDataContext);
  return (
    <div className="scrollable-section">
      <h1>Bioresonance test</h1>
      {jsonData && <pre>{JSON.stringify(jsonData, null, 2)}</pre>}
    </div>
  );
};

const PharmacogeneticsReport = () => {
  return (
    <div className="scrollable-section">
      <h1>Pharmacogenetics report</h1>
    </div>
  );
};

const AllSections = () => {
  return (
    <div className="scrollable-section">
      <h1>All Sections</h1>
    </div>
  );
};
