import { createFileRoute } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/new-vehicles.scss";
import ModelCard from "../components/ModelCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverAddress } from "../utils/auth-utils";

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

function showModels(models: Model[] | null) {
  if (models === null) {
    return <div className="loading-text">Loading...</div>;
  } else {
    return models.map((m) => (
      <ModelCard
        modelName={m.model}
        price={"£" + m.price}
        motor={m.motor}
        imagePath={`src/assets/models/${m.model_code}.jpg`}
      />
    ));
  }
}

export const Route = createFileRoute("/custom-vehicle")({
  component: CustomVehicles,
});

function CustomVehicles() {
  const [models, setModels] = useState<Model[] | null>(null);

  useEffect(() => {
    async function fetchModels() {
      const m = (await axios.get(serverAddress + "/custom-vehicle")).data;
      setModels(m);
    }

    fetchModels();
  }, []);

  return (
    <>
      <Header />
      <div className="vehicles-container">
        <div className="main-pane">
          <div className="filter-box">
            <h2>Filters</h2>
          </div>
          <div className="content-box">
            {showModels(models)}
            <ModelCard
              modelName={"Polestar 3"}
              price={"$44500"}
              imagePath="src/assets/home-background.jpg"
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
