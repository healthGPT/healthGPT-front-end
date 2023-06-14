import { useContext } from "react";
import { JsonDataContext } from "../../../context/UserUploads/JsonDataContext";

const BioresonaceTest = () => {
  const { jsonData } = useContext(JsonDataContext);
  return (
    <div className="scrollable-section">
      <h1>Bioresonance test</h1>
      {jsonData && <pre>{JSON.stringify(jsonData, null, 2)}</pre>}
    </div>
  );
};

export default BioresonaceTest;
