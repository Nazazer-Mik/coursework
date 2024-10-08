import { createFileRoute, Link } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/new-vehicles.scss";
import ModelCard from "../components/ModelCard";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { serverAddress } from "../utils/auth-utils";
import FilterPane from "../components/FilterPane";

export interface Model {
  model_code: string;
  model: string;
  year: string;
  engine_power_kw: string;
  battery_kwh: string;
  range_mi: string;
  top_speed_mi: string;
  driveline: string;
  zero_sixty: string;
  towing_capacity: string;
  features: string;
  price: string;
  availability: string;
  motor: string;
  torque: string;
}

export interface Filters {
  model: string;
  driveline: string;
  motor: string;
}

type TrendingModel = {
  orders_quantity: string;
  model_code_fk: string;
};

function showModels(
  models: Model[] | null,
  trendingModel: TrendingModel
): ReactNode {
  if (models === null) {
    return <div className="loading-text">Loading...</div>;
  } else {
    return models.map((m) => (
      <Link
        to="/custom-vehicle/$modelCode"
        params={{ modelCode: m.model_code }}
      >
        <ModelCard
          modelName={m.model}
          price={"£" + m.price}
          motor={m.motor}
          imagePath={`src/assets/models/${m.model_code}.avif`}
          key={m.model_code}
          trending={trendingModel.model_code_fk === m.model_code}
        />
      </Link>
    ));
  }
}

export const Route = createFileRoute("/custom-vehicle")({
  component: CustomVehicles,
});

function CustomVehicles() {
  const [models, setModels] = useState<Model[] | null>(null);
  const [trendingModel, setTrendingModel] = useState<TrendingModel>({
    orders_quantity: "",
    model_code_fk: "",
  });
  const [filters, setFilters] = useState<Filters>({
    model: "any",
    driveline: "any",
    motor: "any",
  });

  const onFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  useEffect(() => {
    async function fetchModels() {
      const m = (
        await axios.get(serverAddress + "/custom-vehicle", {
          params: {
            ...filters,
          },
        })
      ).data;

      const tm = (
        await axios.get(serverAddress + "/custom-vehicle/trending-now")
      ).data;

      setModels(m);
      setTrendingModel(tm);
    }

    fetchModels();
  }, [filters]);

  return (
    <>
      <Header elementToHiglight={"header-build-vehicle"} />
      <div className="vehicles-container">
        <div className="main-pane" style={{ paddingBottom: "3vw" }}>
          <FilterPane>
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
            <h3>Driveline:</h3>
            <select
              name="driveline"
              value={filters.driveline}
              onChange={onFilterChange}
            >
              <option>any</option>
              <option>Rear-wheel drive</option>
              <option>All-wheel drive</option>
            </select>
            <h3>Engine:</h3>
            <select
              name="motor"
              value={filters.motor}
              onChange={onFilterChange}
            >
              <option>any</option>
              <option>Single motor</option>
              <option>Dual motor</option>
              <option>Dual motor Perfomance</option>
            </select>
          </FilterPane>
          <div className="content-box">{showModels(models, trendingModel)}</div>
        </div>
        <Footer />
      </div>
    </>
  );
}
