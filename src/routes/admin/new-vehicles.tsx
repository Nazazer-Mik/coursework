import { createFileRoute } from "@tanstack/react-router";
import NavWrapper from "../../components/AdminComponents/NavWrapper";
import TableWithContents from "../../components/AdminComponents/TableWithContents";
import "../../styles/admin/table-view.scss";
import { Dispatch, useEffect, useRef, useState } from "react";
import axios from "axios";
import { serverAddress } from "../../utils/auth-utils";
import CreateButton from "../../components/AdminComponents/buttons/CreateButton";
import EditButton from "../../components/AdminComponents/buttons/EditButton";
import DeleteButton from "../../components/AdminComponents/buttons/DeleteButton";
import FloatingWindow from "../../components/AdminComponents/FloatingWindow/FloatingWindow";
import "../../styles/admin/vehicles.scss";
import {
  cleanFields,
  createVehicle,
  deleteVehicle,
  saveEditData,
} from "../../utils/admin/vehicles-utils";

interface Car {
  car_id: string;
  model_code_fk: string;
  color: string;
  interior_color: string;
  wheels: string;
  towing_hitch: string;
  vin_code: string;
  reg_number: string;
  warranty_years: string;
  modifications_price: string;
  sold: string;
  preassembled: string;
}

function LoadCars(
  cars: Car[] | null,
  setCars: Dispatch<React.SetStateAction<Car[]>>,
  editCar: (c: Car) => void
) {
  if (cars == null) {
    return <div className="loading">Loading...</div>;
  } else {
    return cars.map((c) => (
      <tr key={c.car_id}>
        <td>{c.car_id}</td>
        <td>{c.model_code_fk}</td>
        <td>{c.color}</td>
        <td>{c.interior_color}</td>
        <td>{c.wheels}</td>
        <td>{c.towing_hitch ? "Yes" : "No"}</td>
        <td>{c.vin_code}</td>
        <td>{c.reg_number}</td>
        <td>{c.warranty_years}</td>
        <td>{c.modifications_price}</td>
        <td>{c.preassembled ? "Yes" : "No"}</td>
        <td>{c.sold ? "Yes" : "No"}</td>
        <td>
          <EditButton actionOnPress={() => editCar(c)} />
        </td>
        <td>
          <DeleteButton
            actionOnPress={() =>
              deleteVehicle("car_id", c.car_id, "new", cars as Car[], setCars)
            }
          />
        </td>
      </tr>
    ));
  }
}

export const Route = createFileRoute("/admin/new-vehicles")({
  component: AdminNewVehicles,
});

function AdminNewVehicles() {
  const [cars, setCars] = useState<Car[] | null>(null);
  const [editAction, setEditAction] = useState({
    edit: false,
    carId: "",
  });
  const [models, setModels] = useState<{ model_code: string }[]>([]);
  const [createWindowHidden, setCreateWindowHidden] = useState<boolean>(true);
  const errorElem = useRef<HTMLDivElement>(null);

  const carKeys: (keyof Car)[] = [
    "model_code_fk",
    "color",
    "interior_color",
    "wheels",
    "towing_hitch",
    "vin_code",
    "reg_number",
    "warranty_years",
    "modifications_price",
  ];

  const getFields = () => {
    const res = [];

    for (const k of carKeys) {
      res.push(
        <div key={k}>
          <label htmlFor={"new-vehicles-" + k}>{k}</label>
          {k === "model_code_fk" ? (
            <select id={"new-vehicles-" + k} required>
              {models.map((m) => (
                <option key={m.model_code}>{m.model_code}</option>
              ))}
            </select>
          ) : (
            <input type="text" id={"new-vehicles-" + k} required></input>
          )}
        </div>
      );
    }

    return res;
  };

  const editCar = (c: Car) => {
    setCreateWindowHidden(false);

    const fillFieldsWithData = () => {
      for (const k of carKeys) {
        const elem = document.getElementById(
          `new-vehicles-` + k
        ) as HTMLInputElement;

        if (k === "towing_hitch") {
          elem.value = c[k] === "1" ? "Yes" : "No";
        } else {
          elem.value = c[k];
        }
      }
    };

    fillFieldsWithData();
    setEditAction({ edit: true, carId: c.car_id });
  };

  useEffect(() => {
    async function fetchData() {
      const data = (await axios.get(serverAddress + "/admin/new-vehicles"))
        .data;
      setCars(data);
      const modelsData = (
        await axios.get(serverAddress + "/admin/new-vehicles/models")
      ).data;
      setModels(modelsData.models[0]);
    }

    fetchData();
  }, [createWindowHidden, cars]);

  return (
    <NavWrapper elementToHighlight={"admin-nav-new-vehicles"}>
      <div className="table-wrapper">
        <TableWithContents
          title="Assembled Vehicles List"
          createButton={
            <CreateButton actionOnPress={() => setCreateWindowHidden(false)} />
          }
        >
          <table>
            <tr>
              <th>ID</th>
              <th>Model code</th>
              <th>Color</th>
              <th>Interior</th>
              <th>Wheels</th>
              <th>Tow bar</th>
              <th>VIN</th>
              <th>REG</th>
              <th>Warranty</th>
              <th>Mod Price</th>
              <th>Prebuilt</th>
              <th>Sold</th>
              <th></th>
              <th></th>
            </tr>
            {LoadCars(
              cars,
              setCars as Dispatch<React.SetStateAction<Car[]>>,
              editCar
            )}
          </table>
          <FloatingWindow
            hide={createWindowHidden}
            cancelAction={() => setCreateWindowHidden(true)}
            saveAction={() => {
              editAction.edit
                ? saveEditData(
                    errorElem.current as HTMLParagraphElement,
                    carKeys,
                    "new",
                    setCreateWindowHidden,
                    editAction.carId
                  )
                : createVehicle(
                    errorElem.current as HTMLParagraphElement,
                    carKeys,
                    "new",
                    setCreateWindowHidden
                  );
            }}
            clearAction={() => cleanFields(carKeys, "new")}
          >
            <div className="vehicles-properties new-vehicles">
              {getFields()}
            </div>
            <p className="vehicles-error-line" ref={errorElem}></p>
          </FloatingWindow>
        </TableWithContents>
      </div>
    </NavWrapper>
  );
}
