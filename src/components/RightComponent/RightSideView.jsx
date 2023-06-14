import React, { useContext } from "react";
import SearchBar from "../Search/SearchBar";
import UserInfo from "./Sections/UserInfo";
import AllSections from "./Sections/AllSections";
import PharmacogeneticsReport from "./Sections/PharmacogeneticsReport";
import BioresonaceTest from "./Sections/BioresonaceTest";
import HealthPredisposition from "./Sections/HealthPredisposition";
import BloodPanel from "./Sections/BloodPanel";

import "./RightComponent.style.css";

import { SectionContext } from "../../context/Sections/SectionsContext";

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
