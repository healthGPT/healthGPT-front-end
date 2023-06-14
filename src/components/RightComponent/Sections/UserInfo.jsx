import React, { useState, useContext } from "react";
import { GptContext } from "../../../context/GPT/gptContextProvider";
import { LoadingContext } from "../../../context/LoadingContext/LoadingContext";
import CoolLoadingSpinner from "../../Spinner/CoolLoadingSpinner";
import RenderParagraphsResponse from "../../helper/RenderParagraphs";

import FlowDetails from "../Yoga/FlowDetails";
import RoutineDetails from "../Workout/RoutineDetails";

import { getRandomNumber } from "../../helper/helper";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { GPT35Turbo } from "../../helper/openai";
import { generateRunningPlan } from "../../helper/prompts/prompts";

import ReloadIcon from "./reload.png";

const UserInfo = () => {
  const { context, responses } = useContext(GptContext);
  const { isLoading } = useContext(LoadingContext);
  const userInfoForm = localStorage.getItem("UserInfoForm");

  const [yoga, setYoga] = useState(() => {
    const localData = localStorage.getItem("yoga");
    return localData ? JSON.parse(localData) : null;
  });

  const [workout, setWorkout] = useState(() => {
    const localData = localStorage.getItem("workout");
    return localData ? JSON.parse(localData) : null;
  });

  const [dietPlan, setDietPlan] = useState(() => {
    const localData = localStorage.getItem("diet");
    return localData ? JSON.parse(localData) : null;
  });

  const handleYogaClick = async () => {
    const randomNumber = getRandomNumber();
    try {
      const response = await fetch(
        `https://health-app-wfed.onrender.com/api/flows/${+randomNumber}`
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }
      const jsonData = await response.json();
      localStorage.setItem("yoga", JSON.stringify(jsonData));
      setYoga(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWorkoutClick = async () => {
    const randomNumber = getRandomNumber();
    try {
      const response = await fetch(
        `https://health-app-wfed.onrender.com/api/routines/${+randomNumber}`
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }
      const jsonData = await response.json();
      localStorage.setItem("workout", JSON.stringify(jsonData));
      setWorkout(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDietPlan = async () => {
    const gptResponse = await GPT35Turbo(generateRunningPlan(userInfoForm));
    setDietPlan(RenderParagraphsResponse(gptResponse));
  };

  console.log(dietPlan);

  return (
    <div className="scrollable-section" style={{ color: "white" }}>
      {isLoading ? (
        <CoolLoadingSpinner />
      ) : (
        <React.Fragment>
          <Typography variant="h2" component="h1">
            User Info Section
          </Typography>
          <Box mt={2}>
            {context.map((text, index) => (
              <Typography variant="body1" key={index}>
                {text}
              </Typography>
            ))}
          </Box>

          <Box mt={4}>
            {responses.map((response, index) => (
              <RenderParagraphsResponse key={index} data={response} />
            ))}
          </Box>

          {yoga && (
            <div style={{ padding: "0 30px" }}>
              <FlowDetails data={yoga} />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "rgb(3, 200, 168)",
                  color: "#ffffff",
                  marginRight: "5px",
                }}
                onClick={handleYogaClick}
              >
                <img
                  src={ReloadIcon}
                  alt="reload-icon"
                  style={{ width: "20px", filter: "invert(100%)" }}
                />
              </Button>
            </div>
          )}

          {workout && (
            <div style={{ padding: "0 30px" }}>
              <RoutineDetails data={workout} />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "rgb(3, 200, 168)",
                  color: "#ffffff",
                  marginRight: "5px",
                }}
                onClick={handleWorkoutClick}
              >
                <img
                  src={ReloadIcon}
                  alt="reload-icon"
                  style={{ width: "20px", filter: "invert(100%)" }}
                />
              </Button>
            </div>
          )}

          {responses.length > 0 && (
            <Box mt={4} style={{ marginBottom: "80px" }}>
              <Typography
                variant="h4"
                component="h3"
                color="white"
                style={{ fontWeight: 300 }}
              >
                Further Action Suggestions:
              </Typography>
              <Box mt={2}>
                {/* if software engineer render this */}
                {/* good opportunity to incorporate other services here */}
                {!yoga && (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "rgb(3, 200, 168)",
                      color: "#ffffff",
                      marginRight: "5px",
                    }}
                    onClick={handleYogaClick}
                  >
                    Yoga
                  </Button>
                )}

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "rgb(3, 200, 168)",
                    color: "#ffffff",
                    marginRight: "5px",
                  }}
                >
                  Running plan
                </Button>

                {!workout && (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "rgb(3, 200, 168)",
                      color: "#ffffff",
                      marginRight: "5px",
                    }}
                    onClick={handleWorkoutClick}
                  >
                    Workout routine
                  </Button>
                )}

                <Button
                  variant="contained"
                  sx={{ backgroundColor: "rgb(3, 200, 168)", color: "#ffffff" }}
                  onClick={handleDietPlan}
                >
                  Diet Plan
                </Button>
              </Box>
            </Box>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default UserInfo;
