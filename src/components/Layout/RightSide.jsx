const RightSide = ({ children }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "60%",
        backgroundColor: "#fafafc",
        overflow: "auto",
        // borderLeft: "1px solid rgb(40, 112, 163)",
      }}
    >
      {children}
    </div>
  );
};

export default RightSide;
