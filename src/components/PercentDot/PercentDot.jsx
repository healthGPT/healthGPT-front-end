const PercentDot = ({ backgroundImage, right = "15px" }) => {
  return (
    <div className="levelDot">
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
