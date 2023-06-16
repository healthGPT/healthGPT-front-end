import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const InfoResponse = ({ data }) => {
  return (
    <Container maxWidth="md">
      {Object.entries(data).map(([category, message], index) => (
        <Card key={index} style={{ marginTop: "10px", marginBottom: "10px" }}>
          <CardContent>
            <Typography variant="h4">{category}</Typography>
            <Typography variant="body1">{message}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default InfoResponse;
