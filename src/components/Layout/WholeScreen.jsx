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

export default WholeScreen;
