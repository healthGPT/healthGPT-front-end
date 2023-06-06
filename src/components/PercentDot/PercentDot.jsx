const PercentDot = ({ backgroundImage, right = "15px" }) => {
  return (
    <div
      className="levelDot"
      style={{
        top: "15px",
        right: right,
        borderRadius: "20px",
      }}
    >
      <div
        style={{
          width: "20px",
          height: "20px",
          backgroundImage: backgroundImage,
          borderRadius: "20px",
        }}
      ></div>
    </div>
  );
};

export default PercentDot;
