import React, { useState } from "react";

// MUI
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// GPT
import { GPT35Turbo } from "../helper/openai";
import { generatePrompts } from "../helper/prompts/prompts";

// Components
import LoadingSpinner from "../Spinner/LoadingSpinner";
import JsonFileInput from "../helper/JsonFileInput/JsonFileInput";

// Styles
import "./LeftAccordionCategories.styles.css";

const LeftAccordionCategories = () => {
  const [expandedPanels, setExpandedPanels] = useState({});
  const [assistantResponses, setAssistantResponses] = useState({});
  const [isLoading, setIsLoading] = useState({});
  const [jsonData, setJsonData] = useState(() => {
    const localData = localStorage.getItem("jsonData");
    return localData ? JSON.parse(localData) : null;
  });

  const handleFileChange = (data) => {
    localStorage.setItem("jsonData", JSON.stringify(data));
    setJsonData(data);
  };

  const allergyReport = jsonData ? jsonData["Bioresonance-Test-Report"] : null;

  const handleChange = (panel) => (_event, isExpanded) => {
    setExpandedPanels((prevExpandedPanels) => ({
      ...prevExpandedPanels,
      [panel]: isExpanded ? true : false,
    }));
  };

  const clickOnItem = async (value, section) => {
    const itemKey = `${section}-${value}`;

    setIsLoading((prevIsLoading) => ({
      ...prevIsLoading,
      [itemKey]: true,
    }));

    const gptResponse = await GPT35Turbo(generatePrompts(section, value));

    setIsLoading((prevIsLoading) => ({
      ...prevIsLoading,
      [itemKey]: false,
    }));

    setAssistantResponses((prevResponses) => ({
      ...prevResponses,
      [itemKey]: gptResponse,
    }));
  };

  const renderAccordion = (section) => {
    if (!jsonData) return null;

    const { Details, Explanation } = allergyReport[section];

    if (!Details || !Array.isArray(Details)) return null;

    const isExpanded = expandedPanels[section] || false;

    return (
      <>
        <Accordion
          expanded={isExpanded}
          onChange={handleChange(section)}
          className="accordion"
          key={section}
          style={{
            border: "1px solid #03c8a8",
            borderRadius: "8px",
            marginBottom: "16px",
            position: "static",
            boxShadow: "none",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className="accordion-summary"
          >
            <Typography
              variant="h2"
              className="section-title"
              style={{ fontSize: "24px" }}
            >
              {section}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="accordion-details">
            <Typography
              className="explanation"
              style={{ marginBottom: "20px" }}
            >
              {Explanation}
            </Typography>

            {Details.map((item, itemId) => (
              <React.Fragment key={itemId}>
                <div className="outer-container">
                  {Object.entries(item).map(([key, value], index) => (
                    <div
                      className="first-inside-object"
                      key={`${itemId}-${index}`}
                    >
                      <div className="item-details-wrapper">
                        <div
                          className={`item-container-inside-accordion-card ${
                            index === 1 ? "right-aligned" : "left-aligned"
                          }`}
                        >
                          <div
                            className={`this-div-1 ${
                              index === 1 ? "percentage" : ""
                            }`}
                          >
                            {index === 1 ? (
                              <div className="percentage-container">
                                <div
                                  className={`color-indicator ${
                                    value >= "95"
                                      ? "red-gradient"
                                      : "yellow-gradient"
                                  }`}
                                ></div>
                                <div className="value-container">
                                  <span>{value}</span>
                                  {index === 1 && "%"}
                                </div>
                              </div>
                            ) : (
                              <div className="text-container">
                                <span
                                  className="clickable-text"
                                  onClick={() => clickOnItem(value, section)}
                                >
                                  {value}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {Object.entries(item).map(([key, value], index) => (
                  <React.Fragment key={`${itemId}-${index}`}>
                    {isLoading[`${section}-${value}`] && <LoadingSpinner />}
                    {assistantResponses[`${section}-${value}`] && (
                      <p className="assistant-response">
                        {assistantResponses[`${section}-${value}`]}
                      </p>
                    )}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </AccordionDetails>
        </Accordion>
      </>
    );
  };

  return (
    <>
      {!jsonData || !jsonData["Bioresonance-Test-Report"] ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <JsonFileInput onFileChange={handleFileChange} />
            {jsonData && <pre>{JSON.stringify(jsonData, null, 2)}</pre>}
          </div>
        </>
      ) : (
        <>
          {Object.keys(allergyReport).map((section) =>
            renderAccordion(section)
          )}
        </>
      )}
    </>
  );
};

export default LeftAccordionCategories;
