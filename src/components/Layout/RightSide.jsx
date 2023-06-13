const RightSide = ({ children }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "60%",
        backgroundColor: "#2c2ad5",
        overflow: "auto",
      }}
    >
      {children}
    </div>
  );
};

export default RightSide;
