import React from "react";
import "./ResultsDisplay.css";

const DisplayResults = ({ result }) => {
  if (!result) return null;

  return (
    <div className="result-container">
      <h3>Analysis Result:</h3>
      <p className={result === "violation_detected" ? "violation" : "no-violation"}>
        {result === "violation_detected" ? "⚠️ Violation Detected!" : "✅ No Violations"}
      </p>
    </div>
  );
};

export default DisplayResults;
