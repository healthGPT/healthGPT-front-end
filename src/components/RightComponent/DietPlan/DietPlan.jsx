import DietSelection from "./DietSelection";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";

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
    <Container maxWidth="md">
      {!dietResponses ? (
        <>
          <Typography
            variant="h5"
            style={{ fontWeight: "600", color: "white" }}
          >
            Diet Plan
          </Typography>
          {/* Your form component for diet selection */}
          <DietSelection handleDietPlanSearch={handleDietPlanSearch} />
        </>
      ) : (
        <>
          <Typography variant="h4">
            {convertToProperWord(diet.dietPlan.restriction)} Weekly Diet Plan
          </Typography>

          {diet.dietPlan.meals.map((meal, index) => (
            <Card
              key={index}
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <CardContent>
                <Typography variant="h5">{meal.day}</Typography>
                {meal.mealItems.map((item, itemIndex) => (
                  <Typography variant="body1" key={itemIndex}>
                    {item}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
};

export default DietPlan;
