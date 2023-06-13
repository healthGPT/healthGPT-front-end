import React from "react";
import "./CoolLoadingSpinner.styles.css"; // Import the CSS file for styling

const CoolLoadingSpinner = () => {
  return (
    <section>
      <div className="loader">
        {[...Array(20)].map((_, i) => (
          <span key={i} style={{ "--i": i + 1 }}></span>
        ))}
      </div>
    </section>
  );
};

export default CoolLoadingSpinner;
