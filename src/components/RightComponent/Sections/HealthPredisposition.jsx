import { useContext } from "react";
import { JsonDataContext } from "../../../context/UserUploads/JsonDataContext";

const HealthPredisposition = () => {
  const { jsonDataHealthPredisposition } = useContext(JsonDataContext);
  return (
    <div className="scrollable-section" style={{ color: "white" }}>
      <h1>Health Predisposition</h1>
      {jsonDataHealthPredisposition && (
        <pre>{JSON.stringify(jsonDataHealthPredisposition, null, 2)}</pre>
      )}
    </div>
  );
};

export default HealthPredisposition;
