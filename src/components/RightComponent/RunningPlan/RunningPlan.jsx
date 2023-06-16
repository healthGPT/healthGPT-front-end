import { useContext } from "react";
import { GptContext } from "../../../context/GPT/gptContextProvider";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

const RunningPlan = () => {
  const { runningResponses } = useContext(GptContext);

  let runningData;
  if (runningResponses && typeof runningResponses === "string") {
    try {
      runningData = JSON.parse(runningResponses);
    } catch (e) {
      console.error("Invalid JSON string:", runningResponses);
      runningData = null;
    }
  }

  console.log({ runningData });
  return (
    <Container maxWidth="md">
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
            style={{
              fontSize: "16px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "10px",
              }}
            >
              Weekly Running Plan:
            </span>
            <b>{runningData.description}</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            className="flow-description"
            variant="subtitle1"
            sx={{ textAlign: "left", marginBottom: "20px" }}
          >
            {runningData.notes}
          </Typography>
          {Object.entries(runningData.running).map(
            ([day, { workoutType, description, distance }], i) => (
              <Card
                key={i}
                style={{
                  marginTop: "20px",
                  marginBottom: "10px",
                  textAlign: "left",
                }}
              >
                <CardContent>
                  <h4
                    style={{
                      fontWeight: "600",
                      textTransform: "uppercase",
                      fontSize: ".8rem",
                    }}
                  >
                    {day}
                  </h4>
                  <Typography variant="subtitle1">{workoutType}</Typography>

                  {workoutType !== "Rest Day" && (
                    <Typography variant="body1">{description}</Typography>
                  )}

                  {distance && distance !== "N/A" && (
                    <Typography variant="body1">
                      Distance: {distance}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            )
          )}
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};
export default RunningPlan;
