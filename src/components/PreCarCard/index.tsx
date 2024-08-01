import React from "react";
import "./styles.scss";

export default function PreCarCard() {
  return (
    <div className="preassembled-car-card">
      <div className="car-picture"></div>
      <div className="text-section">
        <h3>Polestar 3</h3>
        <p>Range: 500 miles</p>
        <p>Motor: Single</p>
        <div className="price">$44500</div>
      </div>
    </div>
  );
}
