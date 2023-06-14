import "./FlowDetails.styles.css";

import React from "react";
import Grid from "@mui/material/Grid";

const RoutineDetails = ({ data }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div className="details-main-container">
          <h3
            style={{
              fontWeight: "600",
              textTransform: "uppercase",
              color: "white",
            }}
          >
            {data.routine_name}
          </h3>
          <p className="flow-description" style={{ color: "white" }}>
            {data.description}
          </p>
        </div>
      </Grid>

      <Grid item xs={14}>
        <Grid container spacing={2}>
          {data.routine_poses.map((routine, idx) => (
            <Grid item xs={6} sm={4} md={4} key={idx}>
              <div className="flow-card-details">
                <div
                  className="pose-image"
                  style={{ backgroundImage: `url(${routine.image_url})` }}
                />
                <p style={{ fontSize: "10px" }}>{idx + 1}</p>
                <h3 style={{ color: "black" }} className="pose-name">
                  {routine?.exercise_name}
                </h3>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RoutineDetails;
