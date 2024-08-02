import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/new-vehicles.scss";
import PreCarCard from "../components/PreCarCard";
import FilterPane from "../components/FilterPane";
import axios from "axios";
import { serverAddress } from "../utils/auth-utils";

export interface Car {
  color: string;
  interior_color: string;
  wheels: string;

  model: string;
  engine_power_kw: string;
  range_mi: string;
  zero_sixty: string;
  motor: string;
  price: string;
}

type Filters = {
  model: string;
  color: string;
  wheels: string;
  minRange: number;
  minPrice: number;
  maxPrice: number;
};

function generateKeyFromObj(c: Car) {
  let res = "";
  for (const [, v] of Object.entries(c)) {
    res += v;
  }
  return res;
}

function ShowCars(cars: Car[] | null): ReactNode {
  if (cars === null) {
    return <div className="loading-text">Loading...</div>;
  } else {
    return cars.map((c) => (
      <PreCarCard
        model={c.model}
        color={c.color}
        range={c.range_mi}
        zero_sixty={c.zero_sixty}
        engine_power_kw={c.engine_power_kw}
        wheels={c.wheels}
        price={c.price}
        key={generateKeyFromObj(c)}
      />
    ));
  }
}

export const Route = createFileRoute("/new-vehicles")({
  component: NewVehicles,
});

function NewVehicles() {
  const [cars, setCars] = useState<Car[] | null>(null);
  const [filters, setFilters] = useState<Filters>({
    model: "any",
    color: "",
    wheels: "any",
    minRange: 0,
    minPrice: 0,
    maxPrice: 0,
  });

  const colors = {
    Snow: "#f5f5f5",
    Space: "#000000",
    Midnight: "#173a50",
    Thunder: "#606163",
    Magnesium: "#bec2c3",
    Jupiter: "#d2c8c9",
    Storm: "#6f747a",
    Electron: "#8a94a0",
    Gold: "#af9866",
  };

  const onFilterChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target as { name: keyof Filters; value: string };
    setFilters({
      ...filters,
      [name]: typeof filters[name] === "number" ? Number(value) : value,
    });

    console.log(filters);
  };

  const getColorsForFiltering = () => {
    const result = [];

    for (const [name, hex] of Object.entries(colors)) {
      result.push(
        <div
          className={`color ${name === filters.color && "color-highlight"}`}
          style={{ backgroundColor: hex }}
          onClick={() =>
            setFilters({
              ...filters,
              color: name === filters.color ? "" : name,
            })
          }
          key={name}
        />
      );
    }

    return result;
  };

  useEffect(() => {
    async function fetchCars() {
      const m = (
        await axios.get(serverAddress + "/new-vehicle", {
          params: {
            ...filters,
          },
        })
      ).data;
      setCars(m);
    }

    fetchCars();
  }, [filters]);

  return (
    <>
      <Header elementToHiglight={"header-new-vehicle"} />
      <div className="vehicles-container">
        <div className="main-pane">
          <FilterPane>
            <div className="new-cars-filters">
              <h3>Model:</h3>
              <select
                name="model"
                value={filters.model}
                onChange={onFilterChange}
              >
                <option>any</option>
                <option>Polestar 2</option>
                <option>Polestar 3</option>
                <option>Polestar 4</option>
              </select>

              <h3>
                Color: <span className="color-name">{filters.color}</span>
              </h3>
              <div className="color-section">{getColorsForFiltering()}</div>

              <h3>Wheel size:</h3>
              <select
                name="wheels"
                value={filters.wheels}
                onChange={onFilterChange}
              >
                <option>any</option>
                <option>R19 Aero</option>
                <option>R20 Aero</option>
                <option>R20 Pro</option>
                <option>R20 Perfomance</option>
                <option>R21 Plus</option>
                <option>R21 Pro</option>
                <option>R21 Sport</option>
                <option>R22 Sport</option>
                <option>R22 Perfomance</option>
              </select>

              <h3>Minimum range: </h3>
              <input
                type="number"
                name="minRange"
                onChange={onFilterChange}
                value={Number(filters.minRange) || ""}
                placeholder="0 miles"
              />

              <h3>Price:</h3>
              <div className="price-container">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="From"
                  onChange={onFilterChange}
                  value={Number(filters.minPrice) || ""}
                />
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="To"
                  onChange={onFilterChange}
                  value={Number(filters.maxPrice) || ""}
                />
              </div>
            </div>
          </FilterPane>
          <div className="content-box">{ShowCars(cars)}</div>
        </div>
        <Footer />
      </div>
    </>
  );
}
