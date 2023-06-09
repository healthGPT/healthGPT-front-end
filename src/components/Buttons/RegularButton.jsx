import "./Buttons.styles.css";

const RegularButton = ({ buttonWord = "Summarize data", handleDataUpdate }) => {
  return (
    <>
      <button
        className="custom-btn btn-13"
        style={{ cursor: "pointer", marginTop: "60px" }}
        type="submit"
        onClick={handleDataUpdate}
      >
        <span style={{ textTransform: "uppercase" }}>{buttonWord}</span>
      </button>
    </>
  );
};

export default RegularButton;
