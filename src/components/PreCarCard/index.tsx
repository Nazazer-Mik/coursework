import React from "react";
import "./styles.scss";

interface PreCardData {
  model: string;
  color: string;
  range: string;
  zero_sixty: string;
  engine_power_kw: string;
  wheels: string;
  price: string;
  motor: string;
  top: boolean;
}

export default function PreCarCard({
  model,
  color,
  range,
  zero_sixty,
  engine_power_kw,
  wheels,
  price,
  motor,
  top,
}: PreCardData) {
  return (
    <div className={`pre-car-card`}>
      {top ? <div className="top-pick">Top choice</div> : ""}
      <div
        className="car-picture"
        style={{
          backgroundImage: `url("${`src/assets/preassembled/${model.toLocaleLowerCase().replace(" ", "")}/${color.toLowerCase()}-${wheels.toLocaleLowerCase().replace(" ", "-")}.avif`}")`,
        }}
      ></div>
      <div className="text-section">
        <div className="pre-car-text">
          <h3>
            {model}
            <span>{motor}</span>
          </h3>
          <hr />
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
            Final price: <span>{"£" + price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
