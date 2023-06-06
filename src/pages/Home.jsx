import LeftAccordionCategories from "../components/LeftAccordionCategories/LeftAccordionCategories";

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
      }}
    >
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
