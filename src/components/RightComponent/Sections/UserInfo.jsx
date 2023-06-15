import React, { useState, useContext, useEffect } from "react";
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
import { generateDietPrompt } from "../../helper/prompts/prompts";

import ReloadIcon from "./reload.png";
import DietPlan from "../DietPlan/DietPlan";
import RunningPlan from "../RunningPlan/RunningPlan";

import gptLogo from "./gpt-logo.png";

const UserInfo = () => {
  const {
    context,
    responses,
    dietResponses,
    setDietResponses,
    selectedDiet,
    setSelectedDiet,
    runningResponses,
    setRunningResponses,
  } = useContext(GptContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const userInfoForm = localStorage.getItem("UserInfoForm");

  const [yoga, setYoga] = useState(() => {
    const localData = localStorage.getItem("yoga");
    return localData ? JSON.parse(localData) : null;
  });

  const [dietPlanState, setDietPlanState] = useState(() => {
    const localData = localStorage.getItem("dietPlanState");
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

  useEffect(() => {
    localStorage.setItem("dietPlanState", JSON.stringify(dietPlanState));
  }, [dietPlanState]);

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
    setDietPlanState(true);
  };

  const handleDietPlanSearch = async () => {
    try {
      setIsLoading(true);
      const gptResponse = await GPT35Turbo(
        generateDietPrompt(userInfoForm, selectedDiet)
      );
      setDietResponses(gptResponse);
      localStorage.setItem("gptDietResponses", JSON.stringify(gptResponse));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRunningPlan = async () => {
    try {
      setIsLoading(true);
      const gptResponse = await GPT35Turbo(generateRunningPlan(userInfoForm));
      setRunningResponses(gptResponse);
      localStorage.setItem("gptRuningResponses", JSON.stringify(gptResponse));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="scrollable-section">
      {isLoading ? (
        <CoolLoadingSpinner />
      ) : (
        <React.Fragment>
          {/* <Typography variant="h2" component="h1">
            User Info Section
          </Typography> */}
          <Box mt={2}>
            {context.map((text, index) => (
              <Typography variant="body1" key={index}>
                {text}
              </Typography>
            ))}
          </Box>

          <div
            style={{
              width: "90%",
              margin: "50px auto 0px auto",
              // backgroundColor: "white",
              // padding: "40px",
              borderRadius: "10px",
            }}
          >
            <div style={{ width: "100%", margin: "0 auto" }}>
              <div>
                <img src={gptLogo} alt="gpt-logo" style={{ width: "40px" }} />
                <h4
                  style={{
                    marginBottom: "40px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    color: "rgb(51, 51, 51)",
                  }}
                >
                  HealthGPT suggestions based on your user info
                </h4>
              </div>

              {responses.map((response, index) => (
                <RenderParagraphsResponse key={index} data={response} />
              ))}
            </div>
          </div>

          {yoga && (
            <div style={{ padding: "50px 30px" }}>
              <FlowDetails data={yoga} />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "rgb(3, 200, 168)",
                  color: "#ffffff",
                  // marginRight: "5px",
                  marginTop: "10px",
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
            <div style={{ padding: "0px 30px 50px 30px" }}>
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

          {dietPlanState && (
            <DietPlan handleDietPlanSearch={handleDietPlanSearch} />
          )}

          {runningResponses && <RunningPlan />}

          {responses.length > 0 && (
            <Box mt={4} style={{ marginBottom: "80px" }}>
              {/* add !runningPlan */}
              {!workout && !yoga && !dietPlanState && !runningResponses && (
                <Typography
                  variant="h4"
                  component="h3"
                  color="white"
                  style={{ fontWeight: 300 }}
                >
                  Further Action Suggestions:
                </Typography>
              )}
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

                {!runningResponses && (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "rgb(3, 200, 168)",
                      color: "#ffffff",
                      marginRight: "5px",
                    }}
                    onClick={handleRunningPlan}
                  >
                    Running plan
                  </Button>
                )}

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

                {!dietPlanState && (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "rgb(3, 200, 168)",
                      color: "#ffffff",
                    }}
                    onClick={handleDietPlan}
                  >
                    Diet Plan
                  </Button>
                )}
              </Box>
            </Box>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default UserInfo;
