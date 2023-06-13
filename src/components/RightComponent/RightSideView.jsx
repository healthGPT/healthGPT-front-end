import React, { useContext } from "react";
import { JsonDataContext } from "../../context/UserUploads/JsonDataContext";
import SearchBar from "../Search/SearchBar";

import RegularButton from "../Buttons/RegularButton";

import "./RightComponent.style.css";

import { GptContext } from "../../context/GPT/gptContextProvider";

import { SectionContext } from "../../context/Sections/SectionsContext";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// import RenderParagraphsResponse from "../helper/RenderParagraphs/renderParagraphs";

import RenderParagraphsResponse from "../helper/RenderParagraphs";

const RightSideView = () => {
  const { section } = useContext(SectionContext);

  const renderSection = () => {
    switch (section) {
      case "User Info":
        return <UserInfo />;
      case "Blood Panel Test":
        return <BloodPanel />;
      case "Health Predisposition Report":
        return <HealthPredisposition />;
      case "Bioresonace Test":
        return <BioresonaceTest />;
      case "Pharmacognetics Report":
        return <PharmacogeneticsReport />;
      case "All":
        return <AllSections />;
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      {renderSection()}

      <SearchBar />
    </React.Fragment>
  );
};

export default RightSideView;

// const UserInfo = () => {
//   const { context, responses } = useContext(GptContext);
//   return (
//     <div
//       className="scrollable-section"
//       style={{ color: "white", paddingTop: "20px" }}
//     >
//       <div>
//         {context.map((text, index) => (
//           <p key={index}>{text}</p>
//         ))}

//         {responses.map((response, index) => (
//           <RenderParagraphsResponse key={index} data={response} />
//         ))}

//         {responses && (
//           <div>
//             <p>Further actions suggestions</p>
//             <RegularButton />
//             <RegularButton />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

const UserInfo = () => {
  const { context, responses } = useContext(GptContext);

  return (
    <div className="scrollable-section" style={{ color: "white" }}>
      <Typography variant="h2" component="h1">
        User Info Section
      </Typography>
      <Box mt={2}>
        {context.map((text, index) => (
          <Typography variant="body1" key={index}>
            {text}
          </Typography>
        ))}
      </Box>

      <Box mt={4}>
        {responses.map((response, index) => (
          <RenderParagraphsResponse key={index} data={response} />
        ))}
      </Box>

      {responses && (
        <Box mt={4}>
          <Typography
            variant="h4"
            component="h3"
            color="white"
            style={{ fontWeight: 300 }}
          >
            Further Action Suggestions:
          </Typography>
          <Box mt={2}>
            {/* if software engineer render this */}
            {/* good opportunity to incorporate other services here */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "rgb(3, 200, 168)",
                color: "#ffffff",
                marginRight: "5px",
              }}
            >
              Yoga
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "rgb(3, 200, 168)",
                color: "#ffffff",
                marginRight: "5px",
              }}
            >
              Running plan
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "rgb(3, 200, 168)",
                color: "#ffffff",
                marginRight: "5px",
              }}
            >
              Workout routine
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "rgb(3, 200, 168)", color: "#ffffff" }}
            >
              Diet Plan
            </Button>
            {/* <Button style={{ marginLeft: "10px" }} variant="contained">
              Action 2
            </Button> */}
          </Box>
        </Box>
      )}
    </div>
  );
};

const BloodPanel = () => {
  return (
    <div className="scrollable-section">
      <h1>blood panel test</h1>
    </div>
  );
};

const HealthPredisposition = () => {
  const { jsonDataHealthPredisposition } = useContext(JsonDataContext);
  return (
    <div className="scrollable-section" style={{ color: "white" }}>
      <h1>Health Predisposition</h1>
      {jsonDataHealthPredisposition && (
        <pre>{JSON.stringify(jsonDataHealthPredisposition, null, 2)}</pre>
      )}
    </div>
  );
};

const BioresonaceTest = () => {
  const { jsonData } = useContext(JsonDataContext);
  return (
    <div className="scrollable-section">
      <h1>Bioresonance test</h1>
      {jsonData && <pre>{JSON.stringify(jsonData, null, 2)}</pre>}
    </div>
  );
};

const PharmacogeneticsReport = () => {
  return (
    <div className="scrollable-section">
      <h1>Pharmacogenetics report</h1>
    </div>
  );
};

const AllSections = () => {
  return (
    <div className="scrollable-section">
      <h1>All Sections</h1>
    </div>
  );
};
