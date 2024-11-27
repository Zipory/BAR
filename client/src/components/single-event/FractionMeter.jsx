import React from "react";
import "../../style/FractionMeter.css"; // External CSS file for styles

const FractionMeter = ({ numerator, denominator }) => {
  // Calculate the percentage width of the inner meter
  const percentage = denominator > 0 ? (numerator / denominator) * 100 : 0;

  return (
    <div className="meter">
      <div
        className="inner-meter"
        style={{ width: `${percentage}%` }}
      ></div>
      <div className="meter-label">{`${numerator}/${denominator}`}</div>
    </div>
  );
};

export default FractionMeter;
