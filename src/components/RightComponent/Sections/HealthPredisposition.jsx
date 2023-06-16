import React, { useContext, useState } from "react";
import { LoadingContext } from "../../../context/LoadingContext/LoadingContext";
import CoolLoadingSpinner from "../../Spinner/CoolLoadingSpinner";

import gptLogo from "./gpt-logo.png";
import { JsonDataContext } from "../../../context/UserUploads/JsonDataContext";

import Button from "@mui/material/Button";

import { GPT35Turbo } from "../../helper/openai";

import { generateHealthPredisposition } from "../../helper/prompts/prompts";

import ResponseComponent from "../../helper/ResponseParagraph";

const HealthPredisposition = () => {
  const {
    jsonData,
    jsonDataHealthPredisposition,
    jsonDataPharmacogenetics,
    jsonDataBloodPanel,
  } = useContext(JsonDataContext);
  const [healthPredispositionResponses, setHealthPredispositionResponses] =
    useState(() => {
      const localData = localStorage.getItem("GenerateHealthPredisposition");
      return localData ? JSON.parse(localData) : [];
    });

  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const userInfoForm = localStorage.getItem("UserInfoForm");

  let user;
  if (userInfoForm && typeof userInfoForm === "string") {
    try {
      user = JSON.parse(userInfoForm);
    } catch (e) {
      console.error("Invalid JSON string:", userInfoForm);
      user = null;
    }
  }

  console.log(typeof healthPredispositionResponses);

  const handleGenerateHealthPredisposition = async () => {
    console.log(user);
    console.log(jsonDataHealthPredisposition);

    console.log(generateHealthPredisposition(user, jsonData));
    try {
      setIsLoading(true);
      const gptResponse = await GPT35Turbo(
        generateHealthPredisposition(user, jsonData)
      );
      console.log({ gptResponse });
      setHealthPredispositionResponses(gptResponse);
      localStorage.setItem(
        "GenerateHealthPredisposition",
        JSON.stringify(gptResponse)
      );
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="scrollable-section" style={{ color: "white" }}>
      {isLoading ? (
        <CoolLoadingSpinner />
      ) : (
        <React.Fragment>
          {/* <Typography variant="h2" component="h1">
            User Info Section
          </Typography> */}

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
                {/* <h5>Hi, {user.name}</h5> */}
                {user && (
                  <h4
                    style={{
                      marginBottom: "40px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      color: "rgb(51, 51, 51)",
                    }}
                  >
                    HealthGPT suggestions based on your Predisposition Test
                  </h4>
                )}
              </div>

              {!healthPredispositionResponses && (
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "rgb(3, 200, 168)",
                    color: "#ffffff",
                    marginRight: "5px",
                  }}
                  onClick={handleGenerateHealthPredisposition}
                >
                  Generate Report
                </Button>
              )}
            </div>

            <div>
              <ResponseComponent response={healthPredispositionResponses} />
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default HealthPredisposition;
