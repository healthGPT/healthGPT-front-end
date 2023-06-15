import "./FlowDetails.styles.css";

import React from "react";
import Grid from "@mui/material/Grid";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

const FlowDetails = ({ data }) => {
  return (
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
          style={{ fontSize: "16px", display: "flex", flexDirection: "row" }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            {/* {userInfoForm && (
                    <CheckBoxIcon sx={{ color: "#03c8a8", marginRight: "20px" }} />
                  )} */}
            Yoga Flow:
          </span>
          <b>{data.sequence_name}</b>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className="details-main-container">
              <h3
                style={{
                  fontWeight: "600",
                  textTransform: "uppercase",
                  marginTop: "50px",
                }}
              >
                {data.sequence_name}
              </h3>
              {/* <p className="flow-description" style={{ color: "white" }}>
                {data.description}
              </p> */}
            </div>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              {data.sequence_poses.map((pose, idx) => (
                <Grid item xs={4} sm={4} md={4} key={idx}>
                  <div className="flow-card-details">
                    <div
                      className="pose-image"
                      style={{ backgroundImage: `url(${pose.image_url})` }}
                    />
                    <p style={{ fontSize: "10px" }}>{idx + 1}</p>
                    <h3 style={{ color: "black" }} className="pose-name">
                      {pose?.pose_name}
                    </h3>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default FlowDetails;
