import { createFileRoute } from "@tanstack/react-router";
import NavWrapper from "../../components/AdminComponents/NavWrapper";
import TableWithContents from "../../components/AdminComponents/TableWithContents";
import "../../styles/admin/new-vehicles.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverAddress } from "../../utils/auth-utils";
import CreateButton from "../../components/AdminComponents/buttons/CreateButton";
import EditButton from "../../components/AdminComponents/buttons/EditButton";
import DeleteButton from "../../components/AdminComponents/buttons/DeleteButton";

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

function LoadCars(cars: Car[] | null) {
  if (cars == null) {
    return <div className="loading">Loading...</div>;
  } else {
    return cars.map((c) => (
      <tr>
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
          <EditButton />
        </td>
        <td>
          <DeleteButton />
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

  useEffect(() => {
    async function fetchData() {
      const data = (await axios.get(serverAddress + "/admin/new-vehicles"))
        .data;
      setCars(data);
    }

    fetchData();
  }, []);

  return (
    <NavWrapper elementToHighlight={"admin-nav-new-vehicles"}>
      <div className="new-vehicles-body">
        <TableWithContents
          title="Assembled Vehicles List"
          createButton={<CreateButton />}
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
            {LoadCars(cars)}
          </table>
        </TableWithContents>
      </div>
    </NavWrapper>
  );
}
