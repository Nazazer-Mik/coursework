import { createFileRoute } from "@tanstack/react-router";
import { Model } from "./custom-vehicle_";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { serverAddress } from "../utils/auth-utils";
import "../styles/new-vehicle-page.scss";

interface Car {
  model_code_fk: string;
  color: string;
  interior_color: string;
  wheels: string;
  towing_hitch: string;
}

interface CarFull extends Car, Model {
  warranty_years: string;
}

async function fetchVehicleData(carProps: string) {
  const props = carProps.split("_");

  const carModif: Car = {
    model_code_fk: props[0],
    color: props[1],
    wheels: props[2].replace("%20", " "),
    interior_color: props[3].replace("%20", " "),
    towing_hitch: props[4],
  };

  const res = (
    await axios.post(serverAddress + "/new-vehicles/full-spec", carModif)
  ).data as CarFull[];

  return res[0];
}

export const Route = createFileRoute("/new-vehicles/$carProps")({
  loader: ({ params }) => fetchVehicleData(params.carProps),
  component: NewVehicleAd,
});

function NewVehicleAd() {
  const car: CarFull = Route.useLoaderData();

  return (
    <>
      <Header elementToHiglight={"header-new-vehicle"} />
      <div className="car-page-container">
        <Footer />
      </div>
    </>
  );
}
