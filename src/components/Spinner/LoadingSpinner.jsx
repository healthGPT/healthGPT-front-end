import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "32px",
        height: "32px",
        border: "1.5px solid rgba(0, 0, 0, 0.200)",
        borderRadius: "6px",
      }}
    >
      <FontAwesomeIcon
        icon={faSpinner}
        spin
        size="xs"
        style={{ opacity: ".6" }}
      />
    </div>
  );
};

export default LoadingSpinner;
