import { createFileRoute } from "@tanstack/react-router";
import NavWrapper from "../../components/AdminComponents/NavWrapper";
import TableWithContents from "../../components/AdminComponents/TableWithContents";
import "../../styles/admin/table-view.scss";
import { Dispatch, useEffect, useRef, useState } from "react";
import axios from "axios";
import { serverAddress } from "../../utils/auth-utils";
import CreateButton from "../../components/AdminComponents/buttons/CreateButton";
import DeleteButton from "../../components/AdminComponents/buttons/DeleteButton";
import FloatingWindow from "../../components/AdminComponents/FloatingWindow/FloatingWindow";
import "../../styles/admin/vehicles.scss";
import "../../styles/admin/charger.scss";
import {
  ChangeModelProperty,
  cleanFields,
  createObject,
  deleteObject,
} from "../../utils/admin/vehicles-utils";

export interface ChargerModel {
  charger_id: string;
  model: string;
  connector_type: string;
  charging_speed_w: string;
  length: string;
  availability: string;
  price: string;
}

function loadChargers(
  chargers: ChargerModel[] | null,
  setChargers: Dispatch<React.SetStateAction<ChargerModel[] | null>>,
  doUpdate: Dispatch<React.SetStateAction<number>>
) {
  if (chargers == null) {
    return <div className="loading">Loading...</div>;
  }

  return chargers.map((c: ChargerModel) => (
    <tr key={c.charger_id}>
      <td>{c.charger_id}</td>
      <td>{c.model}</td>
      <td>{c.connector_type}</td>
      <td>{c.charging_speed_w}</td>
      <td>{c.length}</td>
      <td>
        <input
          min={0}
          type="number"
          name="availability"
          defaultValue={c.availability}
          onBlur={(e) =>
            ChangeModelProperty(
              "availability",
              e,
              c.availability,
              c.charger_id,
              "charger",
              doUpdate
            )
          }
        />
      </td>
      <td>
        <input
          type="number"
          min={0}
          name="price"
          defaultValue={c.price}
          onBlur={(e) =>
            ChangeModelProperty(
              "price",
              e,
              c.price,
              c.charger_id,
              "charger",
              doUpdate
            )
          }
        />
      </td>
      <td>
        <DeleteButton
          actionOnPress={() =>
            deleteObject(
              "charger_id",
              c.charger_id,
              "charger",
              chargers,
              setChargers,
              doUpdate
            )
          }
        />
      </td>
    </tr>
  ));
}

export const Route = createFileRoute("/admin/chargers")({
  component: AdminChargers,
});

function AdminChargers() {
  const [createWindowHidden, setCreateWindowHidden] = useState(true);
  const [chargers, setChargers] = useState<ChargerModel[] | null>(null);
  const [updateNeeded, doUpdate] = useState(Date.now());
  const errorElem = useRef<HTMLParagraphElement>(null);

  const chargerKeys: (keyof ChargerModel)[] = [
    "charger_id",
    "model",
    "connector_type",
    "charging_speed_w",
    "length",
    "availability",
    "price",
  ];

  const getFields = () =>
    chargerKeys.slice(1, 7).map((k) => (
      <div key={k} className="charger-prop-field">
        <label htmlFor={"charger-" + k}>{k}</label>
        <input type="text" id={"charger-" + k} required></input>
      </div>
    ));

  useEffect(() => {
    async function fetchData() {
      const data = (await axios.get(serverAddress + "/admin/charger-models"))
        .data;
      setChargers(data);
    }

    fetchData();
  }, [createWindowHidden, updateNeeded]);

  return (
    <NavWrapper elementToHighlight={"admin-nav-chargers"}>
      <div className="table-wrapper">
        <TableWithContents
          title="List of Charger Models"
          createButton={
            <CreateButton actionOnPress={() => setCreateWindowHidden(false)} />
          }
        >
          <table>
            <tr key={"header"}>
              <th>ID</th>
              <th>Model Name</th>
              <th>Connector Type</th>
              <th>Charging Speed (W)</th>
              <th>Length (Meters)</th>
              <th>Stock</th>
              <th>Price</th>
              <th></th>
            </tr>
            {loadChargers(chargers, setChargers, doUpdate)}
          </table>
        </TableWithContents>
      </div>
      <FloatingWindow
        hide={createWindowHidden}
        cancelAction={() => setCreateWindowHidden(true)}
        saveAction={() =>
          createObject(
            errorElem.current as HTMLParagraphElement,
            chargerKeys.slice(1, 7),
            "charger",
            setCreateWindowHidden
          )
        }
        clearAction={() => cleanFields(chargerKeys.slice(1, 7), "charger")}
      >
        <div className="charger-properties">{getFields()}</div>
        <p className="charger-error-line" ref={errorElem}></p>
      </FloatingWindow>
    </NavWrapper>
  );
}
