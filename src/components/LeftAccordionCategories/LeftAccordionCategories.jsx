import React, { useState } from "react";

// MUI
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

// GPT
import { GPT35Turbo } from "../helper/openai";
import { generatePrompts } from "../helper/prompts/prompts";

// Components
import LoadingSpinner from "../Spinner/LoadingSpinner";
import JsonFileInput from "../helper/JsonFileInput/JsonFileInput";
import PercentDot from "../PercentDot/PercentDot";

// helpers
import { getTextColor } from "../helper/helper";

// Styles
import "./LeftAccordionCategories.styles.css";

const LeftAccordionCategories = ({
  jsonData,
  jsonDataHealthPredisposition,
  handleFileChange,
  handleFileChangeHealthPredisposition,
}) => {
  const [expandedPanels, setExpandedPanels] = useState({});
  const [assistantResponses, setAssistantResponses] = useState({});
  const [isLoading, setIsLoading] = useState({});

  const allergyReport = jsonData ? jsonData["Bioresonance-Test-Report"] : null;

  console.log(jsonData);

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

  const renderAccordionBioresonance = (section) => {
    if (!jsonData) return null;

    // console.log({ allergyReport });

    // console.log({ section });

    const { Details, Explanation } = allergyReport[section];

    if (!Details || !Array.isArray(Details)) return null;

    const isExpanded = expandedPanels[section] || false;

    return (
      <React.Fragment>
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

            {!Details || Details.length === 0 ? (
              <div className="empty-category-message">
                You have shown NO anomalies for this section and therefore have
                no results
              </div>
            ) : (
              <React.Fragment>
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
                                      onClick={() =>
                                        clickOnItem(value, section)
                                      }
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
              </React.Fragment>
            )}
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    );
  };

  const renderAccordioHealthPredisposition = (section) => {
    const explanation = jsonDataHealthPredisposition[section];

    return (
      <div className="health-predisposition-wrapper-text">
        <p className="health-predisposition-wrapper-text-left">
          <strong>{section}</strong>
        </p>
        <p className="health-predisposition-wrapper-text-right">
          <span style={{ color: getTextColor(explanation) }}>
            {explanation}
          </span>
        </p>
      </div>
    );
  };

  return (
    <React.Fragment>
      {!jsonData || !jsonData["Bioresonance-Test-Report"] ? (
        <React.Fragment>
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
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Accordion
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
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div></div>

              <Typography
                variant="h2"
                className="section-title"
                style={{ fontSize: "24px" }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CheckBoxIcon
                    sx={{ color: "#03c8a8", marginRight: "20px" }}
                  />
                  Bioresonance Test
                </span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="percent-dots-wrapper">
                <div className="percent-dot-wrapper">
                  <PercentDot backgroundImage="linear-gradient(to bottom, #FEA700, #FFD400)" />
                  <p className="percent-dots-p-text">
                    These are items that in testing have returned a{" "}
                    <span style={{ color: "orange" }}>borderline response</span>
                  </p>
                </div>

                <div className="percent-dot-wrapper">
                  <PercentDot backgroundImage="linear-gradient(to bottom, #f83600, #FE6D10)" />
                  <p className="percent-dots-p-text">
                    These are items that in testing have returned a{" "}
                    <span style={{ color: "red" }}>high response</span>
                  </p>
                </div>
              </div>
              {Object.keys(allergyReport).map((section) =>
                renderAccordionBioresonance(section)
              )}
            </AccordionDetails>
          </Accordion>

          <Accordion
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
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div></div>

              <Typography
                variant="h2"
                className="section-title"
                style={{ fontSize: "24px" }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {jsonDataHealthPredisposition && (
                    <CheckBoxIcon
                      sx={{ color: "#03c8a8", marginRight: "20px" }}
                    />
                  )}
                  Health Predisposition Report
                </span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {!jsonDataHealthPredisposition && (
                <JsonFileInput
                  onFileChange={handleFileChangeHealthPredisposition}
                />
              )}

              {Object.keys(jsonDataHealthPredisposition).map((section) =>
                renderAccordioHealthPredisposition(section)
              )}
            </AccordionDetails>
          </Accordion>

          <Accordion
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
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div></div>

              <Typography
                variant="h2"
                className="section-title"
                style={{ fontSize: "24px" }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {/* <CheckBoxIcon
                    sx={{ color: "#03c8a8", marginRight: "20px" }}
                  /> */}
                  Pharmacognetics Report
                </span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* <div className="percent-dots-wrapper">
                <div className="percent-dot-wrapper">
                  <PercentDot backgroundImage="linear-gradient(to bottom, #FEA700, #FFD400)" />
                  <p className="percent-dots-p-text">
                    These are items that in testing have returned a{" "}
                    <span style={{ color: "orange" }}>borderline response</span>
                  </p>
                </div>

                <div className="percent-dot-wrapper">
                  <PercentDot backgroundImage="linear-gradient(to bottom, #f83600, #FE6D10)" />
                  <p className="percent-dots-p-text">
                    These are items that in testing have returned a{" "}
                    <span style={{ color: "red" }}>high response</span>
                  </p>
                </div>
              </div> */}
              {/* {Object.keys(allergyReport).map((section) =>
                renderAccordion(section)
              )} */}
              <p>This is some text</p>
            </AccordionDetails>
          </Accordion>

          <Accordion
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
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div></div>

              <Typography
                variant="h2"
                className="section-title"
                style={{ fontSize: "24px" }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {/* <CheckBoxIcon
                    sx={{ color: "#03c8a8", marginRight: "20px" }}
                  /> */}
                  Blood Panel Test
                </span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>This is some text</p>
            </AccordionDetails>
          </Accordion>

          <Accordion
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
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div></div>

              <Typography
                variant="h2"
                className="section-title"
                style={{ fontSize: "24px" }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {/* <CheckBoxIcon
                    sx={{ color: "#03c8a8", marginRight: "20px" }}
                  /> */}
                  User Info
                </span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>This is some text</p>
            </AccordionDetails>
          </Accordion>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default LeftAccordionCategories;
