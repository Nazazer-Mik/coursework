import { createFileRoute } from "@tanstack/react-router";
import NavWrapper from "../../components/AdminComponents/NavWrapper";
import TableWithContents from "../../components/AdminComponents/TableWithContents";
import CreateButton from "../../components/AdminComponents/buttons/CreateButton";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { serverAddress } from "../../utils/auth-utils";
import { Model } from "../custom-vehicle";
import EditButton from "../../components/AdminComponents/buttons/EditButton";
import DeleteButton from "../../components/AdminComponents/buttons/DeleteButton";
import "../../styles/admin/table-view.scss";
import FloatingWindow from "../../components/AdminComponents/FloatingWindow/FloatingWindow";
import "../../styles/admin/custom-vehicles.scss";

function LoadModels(models: Model[] | null) {
  if (models == null) {
    return <div className="loading">Loading...</div>;
  }

  return models.map((m) => (
    <tr key={m.model_code}>
      <td>{m.model_code}</td>
      <td>{m.model}</td>
      <td>{m.year}</td>
      <td>{m.motor}</td>
      <td>{m.engine_power_kw}</td>
      <td>{m.torque}</td>
      <td>{m.battery_kwh}</td>
      <td>{m.range_mi}</td>
      <td>{m.top_speed_mi}</td>
      <td>{m.driveline}</td>
      <td>{m.zero_sixty}</td>
      <td>{m.towing_capacity}</td>
      <td>{m.features.length > 0 ? "..." : ""}</td>
      <td>{m.availability}</td>
      <td>{m.price}</td>
      <td>
        <EditButton />
      </td>
      <td>
        <DeleteButton />
      </td>
    </tr>
  ));
}

export const Route = createFileRoute("/admin/custom-vehicles")({
  component: AdminCustomVehicles,
});

function AdminCustomVehicles() {
  const [models, setModels] = useState<Model[] | null>(null);
  const [windowHidden, setWindowHidden] = useState<boolean>(true);
  const errorElem = useRef<HTMLDivElement>(null);

  const template: Model = {
    model_code: "",
    model: "",
    year: "",
    engine_power_kw: "",
    battery_kwh: "",
    range_mi: "",
    top_speed_mi: "",
    driveline: "",
    zero_sixty: "",
    towing_capacity: "",
    features: "",
    price: "",
    availability: "",
    motor: "",
    torque: "",
  };

  const getMostFields = () => {
    const res = [];

    for (const [k] of Object.entries(template)) {
      if (k === "features") continue;

      res.push(
        <div>
          <label htmlFor={"custom-vehicles-" + k}>{k}</label>
          <input type="text" id={"custom-vehicles-" + k} required></input>
        </div>
      );
    }

    return res;
  };

  const createNewModel = () => {
    // let dataToSend: Model;
    // for (const [k] of Object.entries(template)) {
    //   const elem = document.getElementById(
    //     "custom-vehicle-" + k
    //   ) as HTMLInputElement;
    //   const value = elem.value;

    //   if (value == "") {
    //     errorElem.current?.innerHTML = "Please fill all the fields";
    //     return;
    //   }

    //   dataToSend[k] = value;
    // }

    // errorElem.current?.innerHTML = "";
    setWindowHidden(true);
  };

  useEffect(() => {
    async function fetchData() {
      const data = (await axios.get(serverAddress + "/custom-vehicle")).data;
      setModels(data);
    }

    fetchData();
  }, []);

  return (
    <NavWrapper elementToHighlight={"admin-nav-custom-vehicles"}>
      <div className="table-wrapper">
        <TableWithContents
          title="Assembled Vehicles List"
          createButton={
            <CreateButton actionOnPress={() => setWindowHidden(false)} />
          }
        >
          <table>
            <tr>
              <th>Code</th>
              <th>Model</th>
              <th>Year</th>
              <th>Motor</th>
              <th>Power</th>
              <th>Torque</th>
              <th>Batt kW</th>
              <th>Range</th>
              <th>Top speed</th>
              <th>Driveline</th>
              <th>0-60</th>
              <th>Tow kg</th>
              <th>Features</th>
              <th>Stock</th>
              <th>Price</th>
              <th></th>
              <th></th>
            </tr>
            {LoadModels(models)}
          </table>
          <FloatingWindow
            hide={windowHidden}
            cancelAction={() => setWindowHidden(true)}
            saveAction={createNewModel}
          >
            <div className="custom-vehicles-most-properties">
              {getMostFields()}
            </div>
            <div className="custom-vehicles-features-property">
              <div>
                <label htmlFor="custom-vehicles-features">features</label>
                <textarea id="custom-vehicles-features" required></textarea>
              </div>
            </div>
            <p className="custom-vehicles-error-line" ref={errorElem}></p>
          </FloatingWindow>
        </TableWithContents>
      </div>
    </NavWrapper>
  );
}
