import LeftAccordionCategories from "../../components/LeftAccordionCategories/LeftAccordionCategories";
import PercentDot from "../../components/PercentDot/PercentDot";
import "./Home.styles.css";

const Home = () => {
  return (
    <>
      <WholeScreen>
        <LeftSide>
          <LeftAccordionCategories />
        </LeftSide>
        <RightSide></RightSide>
      </WholeScreen>
    </>
  );
};

export default Home;

const WholeScreen = ({ children }) => {
  return (
    <div
      className="whole-screen"
      style={{ width: "100%", height: "100vh", display: "flex" }}
    >
      {children}
    </div>
  );
};

const LeftSide = ({ children }) => {
  return (
    <div
      style={{
        width: "40%",
        // backgroundColor: "grey",
        overflow: "auto",
        padding: "10px",
        position: "relative",
      }}
    >
      <div className="percent-dots-wrapper">
        <div className="percent-dot-wrapper">
          <PercentDot backgroundImage="linear-gradient(to bottom, #f83600, #FE6D10)" />
          <p className="percent-dots-p-text">
            These are items that in testing have returned a{" "}
            <span style={{ color: "red" }}>high response</span>
          </p>
        </div>
        <div className="percent-dots-wrapper">
          <div className="percent-dot-wrapper">
            <PercentDot backgroundImage="linear-gradient(to bottom, #FEA700, #FFD400)" />
            <p className="percent-dots-p-text">
              These are items that in testing have returned a{" "}
              <span style={{ color: "orange" }}>borderline response</span>
            </p>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

const RightSide = () => {
  return (
    <div
      style={{
        width: "60%",
        backgroundColor: "white",
        overflow: "auto",
      }}
    ></div>
  );
};
