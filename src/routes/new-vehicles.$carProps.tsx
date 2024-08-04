import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Model } from "./custom-vehicle_";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { serverAddress } from "../utils/auth-utils";
import "../styles/new-vehicle-page.scss";
import { useState } from "react";
import ModalWindow from "../components/ModalWindow";

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
  const navigate = useNavigate({ from: "/new-vehicles/$carProps" });
  const [showModalWindow, setShowModalWindow] = useState(false);
  const modelNameTruncated = car.model.toLocaleLowerCase().replace(" ", "");
  const [picturePaths, setPicturePaths] = useState({
    time: Date.now(), // Trying to make this shit to rerender
    paths: [
      `${`../src/assets/preassembled/${modelNameTruncated}/${car.color.toLowerCase()}-${car.wheels.toLocaleLowerCase().replace(" ", "-")}.avif`}`,
      `../src/assets/preassembled/${modelNameTruncated}/roofs/${car.color.toLowerCase()}.avif`,
      `../src/assets/interiors/${car.interior_color}.avif`,
    ],
  });

  const switchPhoto = (direction: string) => {
    const paths = picturePaths.paths;

    if (direction === "previous") paths.reverse();
    const last = paths.shift();
    paths.push(last as string);
    if (direction === "previous") paths.reverse();

    console.log(paths);

    setPicturePaths({ time: Date.now(), paths: paths });
  };

  const processOrder = async () => {
    const session_id = localStorage.getItem("session_id");

    if (session_id == null) {
      await navigate({ to: "/auth" });
      return;
    }

    const res = (
      await axios.post(serverAddress + "/new-vehicle/buy", {
        user_session_id: session_id,
        car: { ...car },
      })
    ).data;

    if (res.status == "OK") {
      setShowModalWindow(true);
    } else {
      console.log(res);
    }
  };

  return (
    <>
      <ModalWindow
        title={`Thank you for ordering ${car.model}!`}
        mainText={
          "Our Customer Service Team will contact you shortly to confirm the order."
        }
        onOkAction={() => {
          navigate({ to: "/new-vehicles" });
        }}
        show={showModalWindow}
      />
      <Header elementToHiglight={"header-new-vehicle"} />
      <div className="car-page-container">
        <div className="first-page">
          <div className="pictures-pane-wrapper">
            <div className="pictures-pane">
              <div className="pictures-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="#1e1e1e"
                  className="arrow-left"
                  onClick={() => switchPhoto("previous")}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>

                <img
                  src={picturePaths.paths[0]}
                  className="no-select-drag"
                  alt="Photo of Polestar Car"
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="#1e1e1e"
                  className="arrow-right"
                  onClick={() => switchPhoto("next")}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="right-pane">
            <div>
              <h1>
                {car.model} <br />
                <span>Year {car.year}</span>
              </h1>

              <p className="main-page-property">
                <span>Engine: </span>
                {car.motor} Electric Power
              </p>
              <p className="main-page-property">
                <span>Driveline: </span>
                {car.driveline}
              </p>
              <p className="main-page-property color">
                <span>Color: </span>
                {car.color}
              </p>
            </div>

            <div>
              <p className="price-line">
                Price (<u>including VAT</u>): <span> £{car.price}</span>
              </p>
              <button type="button" onClick={processOrder}>
                Order Now
              </button>
            </div>
          </div>
        </div>
        <div className="features">
          <h2>Vehicle Features and Details</h2>
          <ul>
            {car.features.split(";").map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
        <div className="spec-section">
          <div className="table-container">
            <h2>Specifications and Technical Infromation</h2>
            <table>
              <tr>
                <td>
                  <span>Modification</span>
                  {car.model_code
                    .replaceAll("-", " ")
                    .replace("polestar", "polestar ")
                    .split(" ")
                    .map(
                      (word: string) =>
                        word.charAt(0).toUpperCase() + word.slice(1)
                    )
                    .join(" ")}
                </td>
                <td>
                  <span>Model Year</span>
                  {car.year}
                </td>
              </tr>
              <tr>
                <td>
                  <span>Engine</span>
                  Electric {car.motor}
                </td>
                <td>
                  <span>Engine Power</span>
                  {car.engine_power_kw} kW (
                  {Math.round(Number(car.engine_power_kw) * 1.36)} bhp)
                </td>
              </tr>
              <tr>
                <td>
                  <span>Zero To Sixty</span>
                  {car.zero_sixty}s
                </td>
                <td>
                  <span>Torque</span>
                  {car.torque} Nm
                </td>
              </tr>
              <tr>
                <td>
                  <span>Top Speed</span>
                  {car.top_speed_mi} mph (
                  {Math.round(Number(car.top_speed_mi) * 1.61)} kmh)
                </td>
                <td>
                  <span>Battery Capacity</span>
                  {car.battery_kwh} kWh
                </td>
              </tr>
              <tr>
                <td>
                  <span>Range</span>
                  {car.range_mi} miles
                </td>
                <td>
                  <span>Driveline</span>
                  {car.driveline}
                </td>
              </tr>
              <tr>
                <td>
                  <span>Towing Capacity</span>
                  Up to {car.towing_capacity} kg
                </td>
                <td>
                  <span>Color</span>
                  {car.color}
                </td>
              </tr>
              <tr>
                <td>
                  <span>Interior Type</span>
                  {car.interior_color}
                </td>
                <td>
                  <span>Wheels</span>
                  {car.wheels}
                </td>
              </tr>
              <tr>
                <td>
                  <span>Towing Hitch</span>
                  {car.towing_hitch === "1" ? "Yes" : "No"}
                </td>
                <td>
                  <span>Warranty</span>
                  {car.warranty_years} Years
                </td>
              </tr>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
