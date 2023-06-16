import DietSelection from "./DietSelection";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";

import React, { useContext } from "react";
import { GptContext } from "../../../context/GPT/gptContextProvider";

import { convertToProperWord } from "../../helper/ConvertToProperWord";
import Button from "@mui/material/Button";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

const DietPlan = ({ handleDietPlanSearch }) => {
  const { dietResponses } = useContext(GptContext);

  let diet;
  if (dietResponses && typeof dietResponses === "string") {
    try {
      diet = JSON.parse(dietResponses);
    } catch (e) {
      console.error("Invalid JSON string:", dietResponses);
      diet = null;
    }
  }

  return (
    <Container maxWidth="md" xs={{ marginTop: "100px" }}>
      {!dietResponses ? (
        <>
          <h4
            style={{
              fontWeight: "600",
              textTransform: "uppercase",
              color: "rgb(51, 51, 51)",
            }}
          >
            Diet Plan
          </h4>
          {/* Your form component for diet selection */}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <DietSelection handleDietPlanSearch={handleDietPlanSearch} />

            <Button
              variant="contained"
              sx={{
                backgroundColor: "rgb(3, 200, 168)",
                color: "#ffffff",
                marginRight: "5px",
                marginTop: "20px",
              }}
              onClick={handleDietPlanSearch}
            >
              search
            </Button>
          </div>
        </>
      ) : (
        <>
          <Accordion
            style={{
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
                style={{
                  fontSize: "16px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "10px",
                  }}
                >
                  Weekly Diet Plan:
                </span>
                <b>{convertToProperWord(diet.dietPlan.restriction)}</b>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {diet.dietPlan.meals.map((meal, index) => (
                <Card
                  key={index}
                  style={{
                    marginTop: "20px",
                    marginBottom: "10px",
                    textAlign: "left",
                  }}
                >
                  <CardContent>
                    <h4
                      style={{
                        fontWeight: "600",
                        textTransform: "uppercase",
                        fontSize: ".8rem",
                      }}
                    >
                      {meal.day}
                    </h4>

                    {meal.mealItems.map((item, itemIndex) => (
                      <Typography
                        className="flow-description"
                        variant="subtitle1"
                        sx={{ textAlign: "left" }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </Container>
  );
};

export default DietPlan;
