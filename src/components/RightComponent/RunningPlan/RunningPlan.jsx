import { useContext } from "react";
import { GptContext } from "../../../context/GPT/gptContextProvider";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";

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
      <Typography variant="h4">Weekly Running Plan</Typography>
      <Typography variant="body1">{runningData.description}</Typography>

      {Object.entries(runningData.running).map(
        ([day, { workoutType, description, distance }], i) => (
          <Card key={i} style={{ marginTop: "10px", marginBottom: "10px" }}>
            <CardContent>
              <Typography variant="h5">{day}</Typography>
              <Typography variant="subtitle1">{workoutType}</Typography>

              {workoutType !== "Rest Day" && (
                <Typography variant="body1">{description}</Typography>
              )}

              {distance && distance !== "N/A" && (
                <Typography variant="body1">Distance: {distance}</Typography>
              )}
            </CardContent>
          </Card>
        )
      )}

      <Typography variant="body1" style={{ marginTop: "20px" }}>
        {runningData.notes}
      </Typography>
    </Container>
  );
};
export default RunningPlan;
