import React, { useState, useContext, useEffect } from "react";
import { GptContext } from "../../../context/GPT/gptContextProvider";
import { LoadingContext } from "../../../context/LoadingContext/LoadingContext";
import CoolLoadingSpinner from "../../Spinner/CoolLoadingSpinner";

import gptLogo from "./gpt-logo.png";
import { JsonDataContext } from "../../../context/UserUploads/JsonDataContext";

const BioresonaceTest = () => {
  const { jsonData } = useContext(JsonDataContext);
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

  return (
    <div className="scrollable-section">
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
                    HealthGPT suggestions based on your Bioresonance Test
                  </h4>
                )}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default BioresonaceTest;
