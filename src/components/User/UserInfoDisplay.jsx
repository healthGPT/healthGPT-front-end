import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const UserInfoDisplay = ({ userInfo }) => {
  const attributeMappings = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Age", key: "age" },
    { label: "Sex", key: "sex" },
    { label: "Height", key: "heightFeet", unit: "ft" },
    { label: "", key: "heightInches", unit: "in" },
    { label: "Weight", key: "weight", unit: "lbs" },
    { label: "Job", key: "job", subKey: "job" },
  ];

  return (
    <div>
      {attributeMappings.map(({ label, key, subKey, unit }) => {
        if (key === "heightFeet") {
          return (
            <Box
              key={key}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="body1">
                {label}
                {label && ":"}
              </Typography>
              <Typography variant="body1">
                {userInfo[key]} ft {userInfo.heightInches} in
              </Typography>
            </Box>
          );
        }
        if (key === "heightInches") {
          return null;
        }
        if (key === "job") {
          return (
            <Box
              key={key}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="body1">{label}:</Typography>
              <Typography variant="body1">{userInfo[key].job}</Typography>
            </Box>
          );
        }
        return (
          <Box
            key={key}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="body1">
              {label}
              {label && ":"}
            </Typography>
            <Typography variant="body1">
              {subKey ? userInfo[key][subKey] : userInfo[key]}
              {key === "weight" && unit === "lbs" && " lbs"}
            </Typography>
          </Box>
        );
      })}
    </div>
  );
};

export default UserInfoDisplay;
