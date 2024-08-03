import { createFileRoute } from "@tanstack/react-router";
import NavWrapper from "../../components/AdminComponents/NavWrapper";
import TableWithContents from "../../components/AdminComponents/TableWithContents";
import CreateButton from "../../components/AdminComponents/buttons/CreateButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverAddress } from "../../utils/auth-utils";
import { Model } from "../custom-vehicle";
import EditButton from "../../components/AdminComponents/buttons/EditButton";
import DeleteButton from "../../components/AdminComponents/buttons/DeleteButton";
import "../../styles/admin/table-view.scss";

function LoadModels(models: Model[] | null) {
  if (models == null) {
    return <div className="loading">Loading...</div>;
  }

  return models.map((m) => (
    <tr>
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
          createButton={<CreateButton />}
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
        </TableWithContents>
      </div>
    </NavWrapper>
  );
}
