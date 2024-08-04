import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
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

  model_code_fk: string;
  towing_hitch: string;
  model: string;
  engine_power_kw: string;
  range_mi: string;
  zero_sixty: string;
  motor: string;
  price: string;
}

interface PopularCar {
  total_orders: string;
  color: string;
  interior_color: string;
  wheels: string;
  model_code_fk: string;
  motor: string;
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

function ShowCars(
  cars: Car[] | null,
  popularCars: PopularCar[] | null
): ReactNode {
  if (cars === null) {
    return <div className="loading-text">Loading...</div>;
  } else {
    return cars.map((c) => {
      let topPick = false;
      popularCars?.forEach((p) => {
        if (
          p.color === c.color &&
          p.interior_color === c.interior_color &&
          p.model_code_fk === c.model_code_fk &&
          p.motor === c.motor &&
          p.wheels === c.wheels
        ) {
          topPick = true;
        }
      });

      const carProps = `${c.model_code_fk}_${c.color}_${c.wheels}_${c.interior_color}_${c.towing_hitch}`;

      return (
        <Link to="/new-vehicles/$carProps" params={{ carProps: carProps }}>
          <PreCarCard
            model={c.model}
            color={c.color}
            range={c.range_mi}
            zero_sixty={c.zero_sixty}
            engine_power_kw={c.engine_power_kw}
            wheels={c.wheels}
            price={c.price}
            motor={c.motor}
            key={generateKeyFromObj(c)}
            top={topPick}
          />
        </Link>
      );
    });
  }
}

export const Route = createFileRoute("/new-vehicles")({
  component: NewVehicles,
});

function NewVehicles() {
  const [popularCars, setPopularCars] = useState<PopularCar[] | null>(null);
  const [cars, setCars] = useState<Car[] | null>(null);
  const [pages, setTotalPages] = useState(1);
  const [currentPage, setPage] = useState(1);
  const scrollContainer = useRef<HTMLDivElement | null>(null);
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
    setPage(1);
  };

  const getColorsForFiltering = () => {
    const result = [];

    for (const [name, hex] of Object.entries(colors)) {
      result.push(
        <div
          className={`color ${name === filters.color && "color-highlight"}`}
          style={{ backgroundColor: hex }}
          onClick={() => {
            setFilters({
              ...filters,
              color: name === filters.color ? "" : name,
            });
            setPage(1);
          }}
          key={name}
        />
      );
    }

    return result;
  };

  const CreatePages = () => {
    const numbersGenerated = [];
    for (let num = 1; num <= pages; num++) {
      let additionalClass = "";
      if (num === currentPage) additionalClass = "page-number-highlighted";

      numbersGenerated.push(
        <span
          className={`page-number ${additionalClass}`}
          onClick={() => setPage(num)}
          key={num}
        >
          {num}
        </span>
      );
    }
    return numbersGenerated;
  };

  const ChangePage = (newPage: number): void => {
    if (newPage > 0 && newPage <= pages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const data = (
        await axios.get(serverAddress + "/new-vehicle", {
          params: {
            ...filters,
            page: currentPage,
          },
        })
      ).data;

      setPopularCars(
        (await axios.get(serverAddress + "/new-vehicle/popular-cars")).data
      );
      setTotalPages(Math.ceil(data.pages / 15));
      setCars(data.cars);
    }

    (scrollContainer.current as HTMLDivElement)?.scrollTo(0, 0);
    fetchData();
  }, [filters, currentPage]);

  return (
    <>
      <Header elementToHiglight={"header-new-vehicle"} />
      <div className="vehicles-container" ref={scrollContainer}>
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
          <div className="content-box">{ShowCars(cars, popularCars)}</div>
        </div>
        <div className="page-line">
          <svg
            className="left-arrow"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1e1e1e"
            onClick={() => ChangePage(currentPage - 1)}
          >
            <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
          </svg>
          {CreatePages()}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1e1e1e"
            onClick={() => ChangePage(currentPage + 1)}
          >
            <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
          </svg>
        </div>
        <Footer />
      </div>
    </>
  );
}
