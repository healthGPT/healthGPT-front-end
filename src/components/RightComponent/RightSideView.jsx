import React, { useContext } from "react";
import SearchBar from "../Search/SearchBar";
import "./RightComponent.style.css";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import {
  SectionProvider,
  SectionContext,
} from "../../context/Sections/SectionsContext";

const RightSideView = () => {
  const { section, setSection } = useContext(SectionContext);

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
  return (
    <>
      <h1>user info section</h1>
    </>
  );
};

const BloodPanel = () => {
  return (
    <>
      <h1>blood panel test</h1>
    </>
  );
};

const HealthPredisposition = () => {
  return (
    <>
      <h1>Health Predisposition</h1>
    </>
  );
};

const BioresonaceTest = () => {
  return (
    <>
      <h1>Bioresonance test</h1>
    </>
  );
};

const PharmacogeneticsReport = () => {
  return (
    <>
      <h1>Pharmacogenetics report</h1>
    </>
  );
};

const AllSections = () => {
  return (
    <>
      <h1>All Sections</h1>
    </>
  );
};
