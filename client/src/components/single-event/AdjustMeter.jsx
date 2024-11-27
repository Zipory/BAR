import React from 'react'

function AdjustMeter({meter, innerMeter, label, numerator, denominator}) {
    // Ensure denominator is not zero to avoid division errors
    if (denominator <= 0) {
      console.error("Denominator must be greater than zero.");
      return;
    }

    // Calculate the percentage width for the inner meter
    const percentage = (numerator / denominator) * 100;

    // Update the inner meter width and label text
    innerMeter.style.width = `${percentage}%`;
    label.textContent = `${numerator}/${denominator}`;
  }

export default AdjustMeter