import React from "react";
import "./styles.scss";
import CarCard from "../CarCard";

interface PreCardData {
  model: string;
  color: string;
  range: string;
  zero_sixty: string;
  engine_power_kw: string;
  wheels: string;
  price: string;
}

export default function PreCarCard({
  model,
  color,
  range,
  zero_sixty,
  engine_power_kw,
  wheels,
  price,
}: PreCardData) {
  return (
    <CarCard
      imagePath={`src/assets/preassembled/${model.toLocaleLowerCase().replace(" ", "")}-${color.toLowerCase()}.avif`}
    >
      <div className="pre-car-text">
        <h3>{model}</h3>
        <div className="spec-lines">
          <p>
            Range: <span>{range + " mi"}</span>
          </p>
          <p>
            0 - 60: <span>{zero_sixty + "s"}</span>
          </p>
          <p>
            Power: <span>{engine_power_kw + " kW"}</span>
          </p>
          <p>
            Wheels: <span>{wheels}</span>
          </p>
        </div>
        <div className="price">
          Final price: <span>{price}</span>
        </div>
      </div>
    </CarCard>
  );
}
