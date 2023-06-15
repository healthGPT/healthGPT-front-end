import "./FlowDetails.styles.css";

import React from "react";
import Grid from "@mui/material/Grid";

const FlowDetails = ({ data }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div className="details-main-container">
          <h3
            style={{
              fontWeight: "600",
              textTransform: "uppercase",
              color: "white",
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

      <Grid item xs={14}>
        <Grid container spacing={2}>
          {data.sequence_poses.map((pose, idx) => (
            <Grid item xs={6} sm={4} md={4} key={idx}>
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
  );
};

export default FlowDetails;
