import React from "react";
import "./styles.scss";

interface minimalCarData {
  modelName: string;
  price: string;
  motor: string;
  imagePath: string;
}

export default function ModelCard({
  modelName,
  price,
  motor,
  imagePath,
}: minimalCarData) {
  return (
    <div className="model-car-card">
      <div
        className="car-picture"
        style={{ backgroundImage: `url("${imagePath}")` }}
      ></div>
      <div className="text-section">
        <h3>{modelName}</h3>
        <h4>
          <span>Modification:</span> {motor}
        </h4>
        <div className="price-container">
          Starting from: <span className="price">{price}</span>
        </div>
      </div>
    </div>
  );
}
