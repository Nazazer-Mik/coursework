import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ProductFeatures from "../components/ProductFeatures";
import SpecsTable from "../components/SpecsTable";
import ModalWindow from "../components/ModalWindow";
import Header from "../components/Header";
import { useCallback, useEffect, useMemo, useState } from "react";
import { serverAddress } from "../utils/auth-utils";
import axios from "axios";
import { Model } from "./custom-vehicle_";
import "../styles/custom-vehicle-page.scss";
import CustomizeSlide from "../components/CustomizeSlide";

interface Options {
  option_id: string;
  model: string;
  option_type: string;
  option_name: string;
  price: string;
}

async function fetchModelData(modelCode: string) {
  const res = (
    await axios.post(serverAddress + "/custom-vehicles/full-spec", {
      model_code: modelCode,
    })
  ).data;
  const options = (
    await axios.get(serverAddress + "/custom-vehicles/options", {
      params: {
        model: res.model,
      },
    })
  ).data;

  return [res, options];
}

export const Route = createFileRoute("/custom-vehicle/$modelCode")({
  loader: ({ params }) => fetchModelData(params.modelCode),
  component: CustomVehicleAd,
});

function CustomVehicleAd() {
  const [model, options] = Route.useLoaderData() as [Model, Options[]];
  const availableValues = {
    color: [] as string[],
    interior_color: [] as string[],
    wheels: [] as string[],
  };

  options.forEach((o) => {
    if (o.option_type === "color") availableValues.color.push(o.option_name);
    else if (o.option_type === "interior_color")
      availableValues.interior_color.push(o.option_name);
    else if (o.option_type === "wheels")
      availableValues.wheels.push(o.option_name);
  });

  const colorEquivalent = {
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

  const navigate = useNavigate({ from: "/custom-vehicle/$modelCode" });
  const [showModalWindow, setShowModalWindow] = useState(false);
  const [carData, setCarData] = useState({
    ...model,
    color: availableValues.color[0],
    interior_color: availableValues.interior_color[0],
    wheels: availableValues.wheels[0],
    towing_hitch: "No",
    warranty_years: "3",
  });

  const [totalPrice, setTotalPrice] = useState(Number(carData.price));

  useEffect(() => {
    const getFinalPrice = () =>
      Number(carData.price) +
      options.reduce((total, o) => {
        for (const p of [
          carData.color,
          carData.interior_color,
          carData.wheels,
          carData.towing_hitch,
        ]) {
          if (o.option_name === p) {
            return total + Number(o.price);
          }
        }
        return total;
      }, 0);

    setTotalPrice(getFinalPrice());
  }, [carData]);

  const carImage =
    `../src/assets/preassembled/${model.model.toLowerCase().replace(" ", "")}/` +
    `${carData.color.toLowerCase()}-${carData.wheels.toLowerCase().replaceAll(" ", "-")}.avif`;

  const getOptionPrice = (optionType: string, optionName: string) => {
    let price = "";
    options.forEach((o: Options) => {
      if (o.option_type === optionType && o.option_name === optionName)
        price = o.price;
    });

    return price == "0" ? "Free" : `£${price}`;
  };

  const processOrder = async () => {
    const session_id = localStorage.getItem("session_id");

    if (session_id == null) {
      await navigate({ to: "/auth" });
      return;
    }

    const res = (
      await axios.post(serverAddress + "/custom-vehicle/buy", {
        user_session_id: session_id,
        car: { ...carData, final_price: totalPrice },
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
        title={`Thank you for ordering ${model.model}!`}
        mainText={
          "Our Customer Service Team will contact you shortly to confirm the order."
        }
        onOkAction={() => {
          navigate({ to: "/custom-vehicle" });
        }}
        show={showModalWindow}
      />
      <Header elementToHiglight={"header-build-vehicle"} />
      <div className="model-page-container">
        <CustomizeSlide imagePath={carImage}>
          <div>
            <h2>
              Choose the color of <u>{carData.model}</u>
            </h2>
          </div>
          <div className="selectable-options">
            {availableValues.color.map((c) => (
              <div
                className={c === carData.color ? "selected" : ""}
                onClick={() => setCarData({ ...carData, color: c })}
              >
                <div
                  className="color-circle"
                  style={{ backgroundColor: colorEquivalent[c] }}
                ></div>
                <div className="option-name">{c}</div>
                <span>{getOptionPrice("color", c)}</span>
              </div>
            ))}
          </div>
        </CustomizeSlide>
        <CustomizeSlide
          imagePath={`../src/assets/interiors/${carData.interior_color}.avif`}
        >
          <div>
            <h2>Choose interior style of the Car</h2>
          </div>
          <div className="selectable-options">
            {availableValues.interior_color.map((c) => (
              <div
                className={
                  "no-circles " +
                  (c === carData.interior_color ? "selected" : "")
                }
                onClick={() => setCarData({ ...carData, interior_color: c })}
              >
                <div className="option-name">{c}</div>
                <span>{getOptionPrice("interior_color", c)}</span>
              </div>
            ))}
          </div>
        </CustomizeSlide>
        <CustomizeSlide imagePath={carImage}>
          <div>
            <h2>Choose the rims for the Car</h2>
          </div>
          <div className="selectable-options">
            {availableValues.wheels.map((c) => (
              <div
                className={
                  "no-circles " + (c === carData.wheels ? "selected" : "")
                }
                onClick={() => setCarData({ ...carData, wheels: c })}
              >
                <div className="option-name">{c}</div>
                <span>{getOptionPrice("wheels", c)}</span>
              </div>
            ))}
          </div>
        </CustomizeSlide>
        <div className="towing-hitch-option">
          <div>
            <h2>Would you like to have a towing hitch on your car?</h2>
          </div>
          <div>
            <div
              className={
                "option-name " +
                (carData.towing_hitch === "Yes" ? "selected" : "")
              }
              onClick={() => setCarData({ ...carData, towing_hitch: "Yes" })}
            >
              Yes
              <span>{getOptionPrice("towing_hitch", "Yes")}</span>
            </div>
            <div
              className={
                "option-name " +
                (carData.towing_hitch === "No" ? "selected" : "")
              }
              onClick={() => setCarData({ ...carData, towing_hitch: "No" })}
            >
              No
            </div>
          </div>
        </div>
        <ProductFeatures title="Vehicle Features and Details">
          {model.features.split(";").map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ProductFeatures>
        <SpecsTable>
          <tr>
            <td>
              <span>Modification</span>
              {carData.model_code
                .replaceAll("-", " ")
                .replace("polestar", "polestar ")
                .split(" ")
                .map(
                  (word: string) => word.charAt(0).toUpperCase() + word.slice(1)
                )
                .join(" ")}
            </td>
            <td>
              <span>Model Year</span>
              {carData.year}
            </td>
          </tr>
          <tr>
            <td>
              <span>Engine</span>
              Electric {carData.motor}
            </td>
            <td>
              <span>Engine Power</span>
              {carData.engine_power_kw} kW (
              {Math.round(Number(model.engine_power_kw) * 1.36)} bhp)
            </td>
          </tr>
          <tr>
            <td>
              <span>Zero To Sixty</span>
              {carData.zero_sixty}s
            </td>
            <td>
              <span>Torque</span>
              {carData.torque} Nm
            </td>
          </tr>
          <tr>
            <td>
              <span>Top Speed</span>
              {carData.top_speed_mi} mph (
              {Math.round(Number(model.top_speed_mi) * 1.61)} kmh)
            </td>
            <td>
              <span>Battery Capacity</span>
              {carData.battery_kwh} kWh
            </td>
          </tr>
          <tr>
            <td>
              <span>Range</span>
              {carData.range_mi} miles
            </td>
            <td>
              <span>Driveline</span>
              {carData.driveline}
            </td>
          </tr>
          <tr>
            <td>
              <span>Towing Capacity</span>
              Up to {carData.towing_capacity} kg
            </td>
            <td>
              <span>Warranty</span>
              {carData.warranty_years} Years
            </td>
          </tr>
        </SpecsTable>
      </div>
      <div className="checkout-pane">
        <div className="checkout">
          Check<em>out</em>
        </div>
        <div className="price">
          <p>
            Total: <span>£{totalPrice}</span>
          </p>
          <button type="button" onClick={processOrder}>
            Order Now
          </button>
        </div>
      </div>
    </>
  );
}
