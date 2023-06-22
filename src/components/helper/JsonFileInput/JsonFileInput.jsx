import React from "react";
import "./JsonFileInput.styles.css";

const JsonFileInput = ({ onFileChange }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      try {
        const jsonData = JSON.parse(content);
        onFileChange(jsonData);
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="input-file">
      <div className="input-file-upload">
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="custom-file-input"
          data-testid="json-file-input"
        />
      </div>
    </div>
  );
};

export default JsonFileInput;
