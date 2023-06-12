import React, { useContext } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import {
  SectionProvider,
  SectionContext,
} from "../../context/Sections/SectionsContext";

const SelectSection = () => {
  const { section, setSection } = useContext(SectionContext);

  console.log({ section });

  return (
    <div className="select-searchbar-wrapper">
      <Select
        sx={{
          borderRadius: "4px",
          padding: "10px 16px",
          height: "32px",
        }}
        value={section}
        onChange={(e) => setSection(e.target.value)}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="User Info">User Info</MenuItem>
        <MenuItem value="Blood Panel Test">Blood Panel Test</MenuItem>
        <MenuItem value="Health Predisposition Report">
          Health Predisposition Report
        </MenuItem>
        <MenuItem value="Bioresonace Test">Bioresonace Test</MenuItem>
        <MenuItem value="Pharmacognetics Report">
          Pharmacognetics Report
        </MenuItem>
      </Select>
    </div>
  );
};

export default SelectSection;
