import React, { useContext } from "react";
import { LoadingContext } from "../../../context/LoadingContext/LoadingContext";
import CoolLoadingSpinner from "../../Spinner/CoolLoadingSpinner";

import gptLogo from "./gpt-logo.png";
import { JsonDataContext } from "../../../context/UserUploads/JsonDataContext";

import Button from "@mui/material/Button";

const PharmacogeneticsReport = () => {
  const {
    jsonData,
    jsonDataHealthPredisposition,
    jsonDataPharmacogenetics,
    jsonDataBloodPanel,
  } = useContext(JsonDataContext);
  const { isLoading } = useContext(LoadingContext);

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

  const handleGeneratePharmacogeneticsReport = () => {
    console.log(user);
    console.log(jsonDataPharmacogenetics);
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
                    HealthGPT suggestions based on your Pharmacogenetics Test
                  </h4>
                )}
              </div>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "rgb(3, 200, 168)",
                  color: "#ffffff",
                  marginRight: "5px",
                }}
                onClick={handleGeneratePharmacogeneticsReport}
              >
                Generate Report
              </Button>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default PharmacogeneticsReport;
