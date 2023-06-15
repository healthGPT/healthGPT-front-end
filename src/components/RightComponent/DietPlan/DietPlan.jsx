import DietSelection from "./DietSelection";
import "./DietPlan.styles.css";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import React, { useContext } from "react";
import { GptContext } from "../../../context/GPT/gptContextProvider";

import { convertToProperWord } from "../../helper/ConvertToProperWord";

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
    <div className="diet-plan-wrapper">
      {!dietResponses ? (
        <>
          <Typography
            variant="h5"
            style={{
              fontWeight: "600",
              textTransform: "uppercase",
              color: "white",
            }}
          >
            Diet Plan
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <DietSelection />

            <Button
              variant="contained"
              sx={{
                backgroundColor: "rgb(3, 200, 168)",
                color: "#ffffff",
                marginRight: "5px",
                width: "90px",
              }}
              onClick={handleDietPlanSearch}
            >
              Submit
            </Button>
          </div>
        </>
      ) : (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          <Typography variant="h6" style={{ marginBottom: "10px" }}>
            {convertToProperWord(diet.dietPlan.restriction)} Weekly Diet Plan
          </Typography>

          {diet.dietPlan.meals.map((meal, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <Typography
                variant="subtitle1"
                style={{ marginBottom: "5px", fontWeight: "bold" }}
              >
                {meal.day}
              </Typography>
              {meal.mealItems.map((item, itemIndex) => (
                <Typography variant="body1" key={itemIndex}>
                  {item}
                </Typography>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DietPlan;
