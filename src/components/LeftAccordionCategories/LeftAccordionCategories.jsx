import React, { useState, useContext } from "react";
import avatarImg from "./avatar.png";

// MUI
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

// GPT
import { GPT35Turbo } from "../helper/openai";
import { generatePrompts } from "../helper/prompts/prompts";

// Components
import LoadingSpinner from "../Spinner/LoadingSpinner";
import JsonFileInput from "../helper/JsonFileInput/JsonFileInput";
import PercentDot from "../PercentDot/PercentDot";
import UserInfoForm from "../Forms/UserInfoForm";
import UserInfoDisplay from "../User/UserInfoDisplay";

// helpers
import { getTextColor } from "../helper/helper";
import { toTitleCase } from "../helper/helper";
import { getNormalRange } from "../helper/helper";

// Styles
import "./LeftAccordionCategories.styles.css";

import { JsonDataContext } from "../../context/UserUploads/JsonDataContext";
import { SectionContext } from "../../context/Sections/SectionsContext";

const LeftAccordionCategories = () => {
  const [expandedPanels, setExpandedPanels] = useState({});
  const [assistantResponses, setAssistantResponses] = useState({});
  const [isLoading, setIsLoading] = useState({});

  const {
    jsonData,
    handleFileChange,
    handleFileChangeHealthPredisposition,
    jsonDataHealthPredisposition,
    jsonDataPharmacogenetics,
    handleFileChangePharmacogenetics,
    jsonDataBloodPanel,
    handleFileChangeBloodPanel,
    userInfoForm,
    setUserInfoForm,
  } = useContext(JsonDataContext);

  const { section } = useContext(SectionContext);

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

  const renderAccordionBioresonance = (section) => {
    if (!jsonData) return null;

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

  const renderAccordionHealthPredisposition = (section) => {
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

  const renderAccordionPharmacogenetics = (section) => {
    const explanation = jsonDataPharmacogenetics[section];
    return (
      <div className="health-predisposition-wrapper-text">
        <p className="health-predisposition-wrapper-text-left">{section}</p>
        <p className="health-predisposition-wrapper-text-right">
          <span style={{ color: getTextColor(explanation) }}>
            {explanation}
          </span>
        </p>
      </div>
    );
  };

  const renderAccordionBloodPanel = (section, data) => {
    return (
      <div className="blood-panel-wrapper-text">
        {Object.entries(data[section]).map(([panelName, panelData]) => {
          const isExpanded = expandedPanels[panelName] || false;

          return (
            <div key={panelName}>
              <Accordion
                expanded={isExpanded}
                onChange={handleChange(panelName)}
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
                    {toTitleCase(panelName)}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="accordion-details">
                  {Object.entries(panelData).map(([testName, testData]) => {
                    const normalRange = getNormalRange(panelName, testName);
                    const isAboveNormal = testData.value > normalRange.max;
                    const isBelowNormal = testData.value < normalRange.min;

                    let valueClass;
                    if (isAboveNormal) {
                      valueClass = "above-normal";
                    } else if (isBelowNormal) {
                      valueClass = "below-normal";
                    } else {
                      valueClass = "normal";
                    }

                    const tooltipContent = `Normal range: ${normalRange.min} - ${normalRange.max}`;

                    return (
                      <div
                        className={`blood-panel-wrapper-span ${valueClass}`}
                        key={testName}
                      >
                        <Tooltip title={tooltipContent}>
                          <div>
                            <span style={{ cursor: "default" }}>
                              {toTitleCase(testName)}:
                            </span>
                          </div>
                        </Tooltip>
                        <div>
                          <Tooltip title={tooltipContent}>
                            <span
                              style={{ cursor: "default", marginRight: "5px" }}
                            >
                              {testData.value}
                            </span>
                          </Tooltip>
                          <span className="blood-panel-unit">{`(${testData.unit})`}</span>
                        </div>
                      </div>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <React.Fragment>
      <Accordion
        style={{
          border: `1px solid ${
            section === "User Info"
              ? "#2c2ad5"
              : userInfoForm
              ? "#03c8a8"
              : "rgba(0, 0, 0, 0.2)"
          }`,
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
              {userInfoForm && (
                <CheckBoxIcon sx={{ color: "#03c8a8", marginRight: "20px" }} />
              )}
              User Info
            </span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {!userInfoForm ? (
            <UserInfoForm
              userInfoForm={userInfoForm}
              setUserInfoForm={setUserInfoForm}
            />
          ) : (
            <div>
              <Box>
                <div
                  style={{
                    width: "100%",
                    alignItems: "flex-end",
                  }}
                >
                  <img
                    src={avatarImg}
                    alt="Avatar"
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "18px",
                    }}
                  />
                </div>
              </Box>
              <UserInfoDisplay userInfo={userInfoForm} />
            </div>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion
        style={{
          border: `1px solid ${
            section === "Blood Panel Test"
              ? "#2c2ad5"
              : jsonDataBloodPanel
              ? "#03c8a8"
              : "rgba(0, 0, 0, 0.2)"
          }`,
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
              {jsonDataBloodPanel && (
                <CheckBoxIcon sx={{ color: "#03c8a8", marginRight: "20px" }} />
              )}
              Blood Panel Test
            </span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {!jsonDataBloodPanel && (
            <JsonFileInput onFileChange={handleFileChangeBloodPanel} />
          )}

          {jsonDataBloodPanel &&
            Object.keys(jsonDataBloodPanel).map((section) =>
              renderAccordionBloodPanel(section, jsonDataBloodPanel)
            )}
        </AccordionDetails>
      </Accordion>

      <Accordion
        style={{
          border: `1px solid ${
            section === "Health Predisposition Report"
              ? "#2c2ad5"
              : jsonDataHealthPredisposition
              ? "#03c8a8"
              : "rgba(0, 0, 0, 0.2)"
          }`,
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
                <CheckBoxIcon sx={{ color: "#03c8a8", marginRight: "20px" }} />
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

          {jsonDataHealthPredisposition &&
            Object.keys(jsonDataHealthPredisposition).map((section) =>
              renderAccordionHealthPredisposition(section)
            )}
        </AccordionDetails>
      </Accordion>

      <Accordion
        style={{
          border: `1px solid ${
            section === "Bioresonace Test"
              ? "#2c2ad5"
              : jsonData
              ? "#03c8a8"
              : "rgba(0, 0, 0, 0.2)"
          }`,
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
              {allergyReport && (
                <CheckBoxIcon sx={{ color: "#03c8a8", marginRight: "20px" }} />
              )}
              Bioresonance Test
            </span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {allergyReport && (
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
          )}

          {!allergyReport && <JsonFileInput onFileChange={handleFileChange} />}

          {allergyReport &&
            Object.keys(allergyReport).map((section) =>
              renderAccordionBioresonance(section)
            )}
        </AccordionDetails>
      </Accordion>

      <Accordion
        style={{
          border: `1px solid ${
            section === "Pharmacognetics Report"
              ? "#2c2ad5"
              : jsonDataPharmacogenetics
              ? "#03c8a8"
              : "rgba(0, 0, 0, 0.2)"
          }`,
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
              {jsonDataPharmacogenetics && (
                <CheckBoxIcon sx={{ color: "#03c8a8", marginRight: "20px" }} />
              )}
              Pharmacogenetics Report
            </span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="explanation" style={{ marginBottom: "20px" }}>
            Pharmacogenetics is a field of research that studies how a person's
            genes affect how he or she responds to medications. Its long-term
            goal is to help doctors select the drugs and doses best suited for
            each person.
          </Typography>
          {!jsonDataPharmacogenetics && (
            <JsonFileInput onFileChange={handleFileChangePharmacogenetics} />
          )}

          {jsonDataPharmacogenetics &&
            Object.keys(jsonDataPharmacogenetics).map((section) =>
              renderAccordionPharmacogenetics(section)
            )}
        </AccordionDetails>
      </Accordion>

      {/* <Accordion
        style={{
          border: `2px solid ${!true ? "#03c8a8" : "rgba(0, 0, 0, 0.2)"}`,
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
              {jsonDataPharmacogenetics && (
                    <CheckBoxIcon
                      sx={{ color: "#03c8a8", marginRight: "20px" }}
                    />
                  )}
              Sleep Data
            </span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            className="explanation"
            style={{ marginBottom: "20px" }}
          ></Typography>
          {!jsonDataPharmacogenetics && (
                <JsonFileInput
                  onFileChange={handleFileChangePharmacogenetics}
                />
              )}

              {jsonDataPharmacogenetics &&
                Object.keys(jsonDataPharmacogenetics).map((section) =>
                  renderAccordionPharmacogenetics(section)
                )}

          <p>nothing</p>

          
        </AccordionDetails>
      </Accordion> */}
    </React.Fragment>
  );
};

export default LeftAccordionCategories;
