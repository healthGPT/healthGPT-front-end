import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./UserInfoDisplay.styles.css";

const UserInfoDisplay = ({ userInfo }) => {
  const attributeMappings = [
    { key: "name" },
    { key: "age" },
    { key: "sex" },
    { key: "job", subKey: "job" },
    {
      key: ["heightFeet", "heightInches", "weight"],
      unit: ["ft", "in", "lbs"],
    },
    { key: "email" },
  ];

  return (
    <div>
      {attributeMappings.map(({ key, subKey, unit }) => {
        let displayText = "";

        if (Array.isArray(key)) {
          displayText = `${userInfo[key[0]]}${unit[0]} ${userInfo[key[1]]}${
            unit[1]
          } ${userInfo[key[2]]}${unit[2]}`;
        } else if (subKey) {
          displayText = `${userInfo[key][subKey]}`;
        } else {
          displayText = `${userInfo[key]}${unit || ""}`;
        }

        return (
          <Box
            key={key}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="body1">{displayText.trim()}</Typography>
          </Box>
        );
      })}
    </div>
  );
};

export default UserInfoDisplay;
