import { createFileRoute } from "@tanstack/react-router";
import NavWrapper from "../../components/AdminComponents/NavWrapper";
import SimpleTable from "../../components/AdminComponents/SimpleTable";
import "../../styles/admin/orders.scss";
import { Dispatch, useEffect, useState } from "react";
import { serverAddress } from "../../utils/auth-utils";
import axios from "axios";
import { getStatusColor, updateProperty } from "./car-orders";

export interface ChargerOrder {
  charger_order_id: string;
  charger_id_fk: string;
  model: string;
  customer_id_fk: string;
  delivery: string;
  installation: string;
  serial_number: string;
  final_price: string;
  status: string;
}

type ChargerOrdersTables = {
  unconfirmed: ChargerOrder[];
  all: ChargerOrder[];
};

function ChargerOrdersHeader() {
  return (
    <tr key={"header"}>
      <th>ID</th>
      <th>Charger ID</th>
      <th>Charger Model</th>
      <th>Cutomer ID</th>
      <th>Delivery</th>
      <th>Installation</th>
      <th>Serial Number</th>
      <th>Final Price</th>
      <th>Status</th>
    </tr>
  );
}

function ChargerOrdersFilling(
  arr: ChargerOrder[],
  setUpdate: Dispatch<React.SetStateAction<number>>
) {
  return arr?.map((o: ChargerOrder) => (
    <tr key={o.charger_order_id}>
      <td>{o.charger_order_id}</td>
      <td>{o.charger_id_fk}</td>
      <td>{o.model}</td>
      <td>{o.customer_id_fk}</td>
      <td>{o.delivery == "1" ? "Yes" : "No"}</td>
      <td>{o.installation == "1" ? "Yes" : "No"}</td>
      <td>{o.serial_number}</td>
      <td>{o.final_price}</td>
      <td>
        <select
          defaultValue={o.status}
          style={{ backgroundColor: getStatusColor(o.status) }}
          onChange={(e) =>
            updateProperty(
              o.charger_order_id,
              e.target.value,
              "UPDATE status",
              setUpdate,
              "charger"
            )
          }
        >
          <option>Awaiting confirmation</option>
          <option>Confirmed</option>
          <option>Rejected</option>
          <option>Cancelled</option>
          <option>Completed</option>
        </select>
      </td>
    </tr>
  ));
}

export const Route = createFileRoute("/admin/charger-orders")({
  component: AdminChargerOrders,
});

function AdminChargerOrders() {
  const [update, setUpdate] = useState(Date.now());
  const [orders, setOrders] = useState<ChargerOrdersTables>(
    {} as ChargerOrdersTables
  );

  useEffect(() => {
    const fetchData = async () => {
      const allOrders = (
        await axios.get(serverAddress + "/admin/charger-orders")
      ).data;
      const unconfOrders = (
        await axios.get(serverAddress + "/admin/charger-orders", {
          params: { status: "Awaiting confirmation" },
        })
      ).data;

      setOrders({
        unconfirmed: unconfOrders,
        all: allOrders,
      });
    };

    fetchData();
  }, [update]);

  return (
    <NavWrapper elementToHighlight={"admin-nav-charger-orders"}>
      <div className="car-order-tables-container">
        <div className="awaiting-confirmation-orders">
          <h2>Charger orders waiting for confirmation</h2>
          <SimpleTable>
            {ChargerOrdersHeader()}
            {ChargerOrdersFilling(orders.unconfirmed, setUpdate)}
          </SimpleTable>
        </div>
        <div className="all-orders">
          <h2>All charger orders</h2>
          <SimpleTable>
            {ChargerOrdersHeader()}
            {ChargerOrdersFilling(orders.all, setUpdate)}
          </SimpleTable>
        </div>
      </div>
    </NavWrapper>
  );
}
