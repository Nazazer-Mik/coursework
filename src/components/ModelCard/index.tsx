import React from "react";
import "./styles.scss";
import ProductCard from "../ProductCard";

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
    <ProductCard imagePath={imagePath}>
      <div className="model-text">
        <div>
          <h3>{modelName}</h3>
          <h4>
            <span>Modification:</span> {motor}
          </h4>
        </div>
        <div className="price-container">
          Starting from: <span className="price">{price}</span>
        </div>
      </div>
    </ProductCard>
  );
}
