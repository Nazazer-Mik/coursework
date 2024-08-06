import { createFileRoute } from "@tanstack/react-router";
import NavWrapper from "../../components/AdminComponents/NavWrapper";
import TableWithContents from "../../components/AdminComponents/TableWithContents";
import CreateButton from "../../components/AdminComponents/buttons/CreateButton";
import { ChangeEvent, Dispatch, useEffect, useRef, useState } from "react";
import axios from "axios";
import { serverAddress } from "../../utils/auth-utils";
import { Model } from "../custom-vehicle_";
import DeleteButton from "../../components/AdminComponents/buttons/DeleteButton";
import "../../styles/admin/table-view.scss";
import FloatingWindow from "../../components/AdminComponents/FloatingWindow/FloatingWindow";
import "../../styles/admin/vehicles.scss";
import {
  ChangeModelProperty,
  cleanFields,
  createObject,
  deleteObject,
} from "../../utils/admin/vehicles-utils";

export interface serverResponse {
  status: string;
  message: string;
}

function LoadModels(
  models: Model[] | null,
  changeProperty: (
    prop: string,
    e: ChangeEvent<HTMLInputElement>,
    oldVal: string,
    modelCode: string,
    prefix: string,
    doUpdate: Dispatch<React.SetStateAction<number>>
  ) => void,
  setModels: Dispatch<React.SetStateAction<Model[]>>,
  doUpdate: Dispatch<React.SetStateAction<number>>
) {
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
      <td>
        <input
          type="number"
          name={m.availability}
          defaultValue={m.availability}
          min={0}
          style={{ width: "50px" }}
          onBlur={(e) =>
            changeProperty(
              "availability",
              e,
              m.availability,
              m.model_code,
              "custom-vehicles",
              doUpdate
            )
          }
        />
      </td>
      <td>
        <input
          type="number"
          name={m.price}
          defaultValue={m.price}
          min={0}
          style={{ width: "70px" }}
          onBlur={(e) =>
            changeProperty(
              "price",
              e,
              m.price,
              m.model_code,
              "custom-vehicles",
              doUpdate
            )
          }
        />
      </td>
      <td>
        <DeleteButton
          actionOnPress={() =>
            deleteObject(
              "model_code",
              m.model_code,
              "custom-vehicles",
              models as Model[],
              setModels,
              doUpdate
            )
          }
        />
      </td>
    </tr>
  ));
}

export const Route = createFileRoute("/admin/custom-vehicles")({
  component: AdminCustomVehicles,
});

function AdminCustomVehicles() {
  const [models, setModels] = useState<Model[] | null>(null);
  const [createWindowHidden, setCreateWindowHidden] = useState<boolean>(true);
  const [updateNeeded, doUpdate] = useState(Date.now());
  const errorElem = useRef<HTMLDivElement>(null);

  const modelKeys: (keyof Model)[] = [
    "model_code",
    "model",
    "year",
    "engine_power_kw",
    "battery_kwh",
    "range_mi",
    "top_speed_mi",
    "driveline",
    "zero_sixty",
    "towing_capacity",
    "features",
    "price",
    "availability",
    "motor",
    "torque",
  ];

  const getMostFields = () => {
    const res = [];

    for (const k of modelKeys) {
      if (k === "features") continue;

      res.push(
        <div key={k}>
          <label htmlFor={"custom-vehicles-" + k}>{k}</label>
          <input type="text" id={"custom-vehicles-" + k} required></input>
        </div>
      );
    }

    return res;
  };

  useEffect(() => {
    async function fetchData() {
      const data = (await axios.get(serverAddress + "/custom-vehicle")).data;
      setModels(data);
    }

    fetchData();
  }, [createWindowHidden, updateNeeded]);

  return (
    <NavWrapper elementToHighlight={"admin-nav-custom-vehicles"}>
      <div className="table-wrapper">
        <TableWithContents
          title="Custom Vehicles List"
          createButton={
            <CreateButton actionOnPress={() => setCreateWindowHidden(false)} />
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
            </tr>
            {LoadModels(
              models,
              ChangeModelProperty,
              setModels as Dispatch<React.SetStateAction<Model[]>>,
              doUpdate
            )}
          </table>
          <FloatingWindow
            hide={createWindowHidden}
            cancelAction={() => setCreateWindowHidden(true)}
            saveAction={() =>
              createObject(
                errorElem.current as HTMLParagraphElement,
                modelKeys,
                "custom-vehicles",
                setCreateWindowHidden
              )
            }
            clearAction={() => cleanFields(modelKeys, "custom-vehicles")}
          >
            <div className="vehicles-properties">{getMostFields()}</div>
            <div className="custom-vehicles-features-property">
              <div>
                <label htmlFor="custom-vehicles-features">Features</label>
                <textarea id="custom-vehicles-features" required></textarea>
              </div>
            </div>
            <p className="vehicles-error-line" ref={errorElem}></p>
          </FloatingWindow>
        </TableWithContents>
      </div>
    </NavWrapper>
  );
}
