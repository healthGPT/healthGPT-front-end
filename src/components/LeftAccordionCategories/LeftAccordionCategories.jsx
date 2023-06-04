import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import allergyTestData from "../helper/allergy-test-data.json";

import { Configuration, OpenAIApi } from "openai";

const LeftAccordionCategories = () => {
  const allergyReport = allergyTestData["Bioresonance-Test-Report"];
  const [expandedPanels, setExpandedPanels] = useState({});
  const [assistantResponses, setAssistantResponses] = useState({});

  const handleChange = (panel) => (_event, isExpanded) => {
    setExpandedPanels((prevExpandedPanels) => ({
      ...prevExpandedPanels,
      [panel]: isExpanded ? true : false,
    }));
  };

  const openai = new OpenAIApi(
    new Configuration({
      apiKey: "...",
    })
  );

  const clickOnItem = async (value, section) => {
    console.log(`section: ${section}`);
    console.log(`value: ${value}`);

    const itemKey = `${section}-${value}`;

    const GPT35TurboMessageMetalSensitivities = [
      {
        role: "system",
        content: `You are an expert in ${section}, specifically ${value}, in human beings.`,
      },

      {
        role: "user",
        content: `Could you please give me a brief overview of ${value} sensitivity and what can cause this sensitivity in a person?`,
      },

      {
        role: "assistant",
        content: `Consider covering the following topics in your response: the general concept of ${section}, common causes of ${value} sensitivity, potential symptoms of ${value} sensitivity, and any preventative measures or treatment options that might exist. Also, please ensure the information is understandable for non-experts and fits in 3 or less sentences.`,
      },
    ];

    let GPT35Turbo = async (message) => {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: message,
      });

      return response.data.choices[0].message.content;
    };

    console.log(
      "### I'm GPT-3.5-TURBO. ####",
      await GPT35Turbo(GPT35TurboMessageMetalSensitivities)
    );

    const gptResponse = await GPT35Turbo(GPT35TurboMessageMetalSensitivities);

    // Update state variable
    // Update state variable for the specific item
    setAssistantResponses((prevResponses) => ({
      ...prevResponses,
      [itemKey]: gptResponse,
    }));

    // if Metal-Sensitivities then use this template for gpt ....
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
          borderRadius: "8px",
          marginBottom: "16px",
          position: "static",
          boxShadow: "none",
          //   cursor: "pointer",
        }}
        key={section}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h2" fontSize="24px" textAlign={"left"}>
            {section}
          </Typography>
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
                      width: index === 1 ? "20%" : "40%",
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
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          textAlign: "left",
                        }}
                      >
                        <span
                          style={{ textAlign: "left", cursor: "pointer" }}
                          onClick={() => clickOnItem(value, section)}
                        >
                          {value}
                        </span>
                        {assistantResponses[`${section}-${value}`] && (
                          <p
                            style={{
                              fontSize: "12px",
                              fontWeight: "400",
                              color: "lightblue",
                            }}
                          >
                            {assistantResponses[`${section}-${value}`]}
                          </p>
                        )}
                      </div>
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

export default LeftAccordionCategories;

// const GPT35TurboMessageMetalSensitivities = [
//     { role: "system", content: `You are an expert on ${section} in human beings.` },

//     { role: "user", content: `Give me a description for ${section} specifically ${value}, make it short description, of about three sentences, in that say what can cause this sensitivity in a person` },
//   ];

//   const GPT35TurboMessageMetalSensitivities = [
//     { role: "system", content: `As an expert in ${section}, I'll provide you with a concise description of ${value} sensitivity and its potential causes.` },

//     { role: "user", content: `Could you please give me a brief overview of ${value} sensitivity and what can cause this sensitivity in a person?` },
//     ];
