import React from "react";

// Components
import LeftAccordionCategories from "../../components/LeftAccordionCategories/LeftAccordionCategories";
import RightSideView from "../../components/RightComponent/RightSideView";
import WholeScreen from "../../components/Layout/WholeScreen";
import LeftSide from "../../components/Layout/LeftSide";
import RightSide from "../../components/Layout/RightSide";

import "./Home.styles.css";

const Home = () => {
  return (
    <React.Fragment>
      <WholeScreen>
        <LeftSide>
          <LeftAccordionCategories />
        </LeftSide>
        <RightSide>
          <RightSideView />
        </RightSide>
      </WholeScreen>
    </React.Fragment>
  );
};

export default Home;
