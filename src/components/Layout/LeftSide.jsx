const LeftSide = ({ children }) => {
  return (
    <div
      style={{
        width: "40%",
        overflow: "auto",
        padding: "10px",
        position: "relative",
        backgroundColor: "white",
      }}
    >
      {children}
    </div>
  );
};

export default LeftSide;
