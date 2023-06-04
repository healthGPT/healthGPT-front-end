import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import allergyTestData from "../components/helper/allergy-test-data.json";

const Home = () => {
  const allergyReport = allergyTestData["Bioresonance-Test-Report"];
  const [expandedPanels, setExpandedPanels] = useState({});

  const handleChange = (panel) => (_event, isExpanded) => {
    setExpandedPanels((prevExpandedPanels) => ({
      ...prevExpandedPanels,
      [panel]: isExpanded ? true : false,
    }));
  };

  const renderAccordion = (section) => {
    const { Details, Explanation } = allergyReport[section];
    const isExpanded = expandedPanels[section] || false;

    return (
      <Accordion
        expanded={isExpanded}
        onChange={handleChange(section)}
        style={{
          border: "1px solid #03c8a8",
          borderRadius: "20px",
          marginBottom: "16px",
          position: "static",
          boxShadow: "none",
        }}
        key={section}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h2">{section}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography marginBottom={"20px"} textAlign={"left"}>
            {Explanation}
          </Typography>
          <div style={{ width: "100%" }}>
            {Details.map((item) => (
              <div
                key={item.Id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                {Object.entries(item).map(([key, value], index) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      width: index === 1 ? "10%" : "40%",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* <span>{value}</span> */}
                    {index === 1 ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          alignItems: "center",
                          alignContent: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            backgroundImage:
                              value >= "95"
                                ? "linear-gradient(rgb(248, 54, 0), rgb(254, 109, 16))"
                                : "linear-gradient(rgb(254, 167, 0), rgb(255, 212, 0))",
                            borderRadius: "100%",
                          }}
                        ></div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <span style={{ textAlign: "left" }}>{value}</span>
                          {index === 1 && "%"}
                        </div>
                      </div>
                    ) : (
                      <span style={{ textAlign: "left" }}>{value}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <>{Object.keys(allergyReport).map((section) => renderAccordion(section))}</>
  );
};

export default Home;
