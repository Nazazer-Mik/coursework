import { createFileRoute } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/charging.scss";
import axios from "axios";
import { serverAddress } from "../utils/auth-utils";
import { useState } from "react";

export interface ChargerModel {
  charger_id: string;
  model: string;
  connector_type: string;
  charging_speed_w: string;
  length: string;
  availability: string;
  price: string;
}

async function fetchChargerModels() {
  return (await axios.get(serverAddress + "/charging")).data;
}

export const Route = createFileRoute("/charging")({
  loader: fetchChargerModels,
  component: ChargingPage,
});

function ChargingPage() {
  const chargers = Route.useLoaderData() as ChargerModel[];
  const [chargerSelected, setChargerSelected] = useState(
    chargers[0].charger_id
  );

  const fillChargerList = () => {
    return chargers.map((c) => (
      <div
        className={`charger-model no-select-drag ${chargerSelected == c.charger_id && "highlighted"}`}
        key={c.charger_id}
        onClick={() => setChargerSelected(c.charger_id)}
      >
        <h4>{c.model}</h4>
        <div className="charger-properties">
          <p>
            <span>Charging speed: </span>
            {Number(c.charging_speed_w) / 1000}kW
          </p>
          <p>
            <span>Connector type: </span>
            {c.connector_type}
          </p>
          <p>
            <span>Wire Length: </span>
            {c.length}
          </p>
          <p className="charger-price">£{c.price}</p>
        </div>
      </div>
    ));
  };

  return (
    <>
      <Header elementToHiglight={"header-charging"} />
      <div className="chargers-container">
        <div className="first-slide">
          <h2>
            Explore our range of Efficient and Fast EV Chargers for Your Home
            and Business
          </h2>
          <div className="content-container">
            <div className="model-selection">
              <h3>Choose the Best Charger Model for Your Needs:</h3>
              <div className="model-container">{fillChargerList()}</div>
            </div>
            <div className="charger-general-info">
              <img src="src/assets/charger.avif" className="no-select-drag" />
              <p>
                Even though it’s possible to plug an electric car into a regular
                mains socket, this should only be done temporarily. The high
                current demand of an EV calls for the use of a dedicated
                charging station to avoid overly long charging times and going
                against safety regulations.
                <br />
                <hr />
                With an intelligent home charging solution, you can benefit from
                more control to get the most from your EV, as well as being able
                to integrate into some of the smartest EV energy tariffs like
                Intelligent Octopus, so you can charge at the cheapest and
                greenest times available.
                <br />
                <hr />
                We’ve partnered with Ohme to offer existing Polestar UK
                customers a special price on their home chargers. New Polestar 2
                customers can choose to receive a complimentary Ohme home EV
                charger when they order.
              </p>
            </div>
          </div>
        </div>
        <div className="buy-section no-select-drag">
          <button type="button">Order Now</button>
          <p>
            An EV home charger can be easily mounted on an existing wall and
            connected to the wiring that’s already there. The other option is to
            mount it on a post, allowing for more freedom of placement. Expect
            slightly higher installation costs for the latter, as it will
            usually require a new underground mains connection.
          </p>
        </div>
        <div className="optional-services">
          <div>
            <input type="checkbox" />{" "}
            <label>Deliver charger to my home address</label>
          </div>
          <div>
            <input type="checkbox" />{" "}
            <label>Mount charger to my property</label>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
