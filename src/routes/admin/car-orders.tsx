import { createFileRoute } from "@tanstack/react-router";
import NavWrapper from "../../components/AdminComponents/NavWrapper";
import "../../styles/admin/car-orders.scss";
import SimpleTable from "../../components/AdminComponents/SimpleTable";
import axios from "axios";
import { serverAddress } from "../../utils/auth-utils";
import { Dispatch, useEffect, useState } from "react";

export interface CarOrder {
  car_order_id: string;
  car_id_fk: string;
  customer_id_fk: string;
  time_of_purchase: string;
  delivery: string;
  final_price: string;
  payment_method: string;
  status: string;
}

type CarOrdersTables = {
  unconfirmed: CarOrder[];
  all: CarOrder[];
};

function getStatusColor(status: string) {
  const statColors = {
    "Awaiting confirmation": "#eaff7b",
    Completed: "#00ffab",
    Rejected: "#d84242",
    Confirmed: "#29bdc1",
    Cancelled: "#913f92",
  };

  return statColors[status];
}

function CarOrdersHeader() {
  return (
    <tr>
      <th>ID</th>
      <th>Car ID</th>
      <th>Cutomer ID</th>
      <th>Purchase Time</th>
      <th>Delivery</th>
      <th>Final Price</th>
      <th>Payment Method</th>
      <th>Status</th>
    </tr>
  );
}

async function updateProperty(
  orderId: string,
  propertyValue: string,
  updateActionName: string,
  setUpdate: Dispatch<React.SetStateAction<number>>
) {
  await axios.post(serverAddress + "/admin/car-orders", {
    action: updateActionName,
    data: {
      carOrderId: orderId,
      property: propertyValue,
    },
  });

  setUpdate(Date.now());
}

function CarOrdersFilling(
  arr: CarOrder[],
  setUpdate: Dispatch<React.SetStateAction<number>>
) {
  return arr?.map((o: CarOrder) => (
    <tr>
      <td>{o.car_order_id}</td>
      <td>{o.car_id_fk}</td>
      <td>{o.customer_id_fk}</td>
      <td>{o.time_of_purchase.replace("T", " ").slice(0, 19)}</td>
      <td>{o.delivery}</td>
      <td>{o.final_price}</td>
      <td>
        <select
          defaultValue={o.payment_method}
          onChange={(e) =>
            updateProperty(
              o.car_order_id,
              e.target.value,
              "UPDATE payment_method",
              setUpdate
            )
          }
        >
          <option>Cash</option>
          <option>Visa Debit</option>
          <option>Visa Credit</option>
          <option>Mastercard Debit</option>
          <option>Mastercard Credit</option>
        </select>
      </td>
      <td>
        <select
          defaultValue={o.status}
          style={{ backgroundColor: getStatusColor(o.status) }}
          onChange={(e) =>
            updateProperty(
              o.car_order_id,
              e.target.value,
              "UPDATE status",
              setUpdate
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

export const Route = createFileRoute("/admin/car-orders")({
  component: AdminCarOrders,
});

function AdminCarOrders() {
  const [update, setUpdate] = useState(Date.now());
  const [orders, setOrders] = useState<CarOrdersTables>({} as CarOrdersTables);

  useEffect(() => {
    const fetchData = async () => {
      const allOrders = (await axios.get(serverAddress + "/admin/car-orders"))
        .data;
      const unconfOrders = (
        await axios.get(serverAddress + "/admin/car-orders", {
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
    <NavWrapper elementToHighlight={"admin-nav-car-orders"}>
      <div className="car-order-tables-container">
        <div className="awaiting-confirmation-orders">
          <h2>Orders waiting for confirmation</h2>
          <SimpleTable>
            {CarOrdersHeader()}
            {CarOrdersFilling(orders.unconfirmed, setUpdate)}
          </SimpleTable>
        </div>
        <div className="all-orders">
          <h2>All car orders</h2>
          <SimpleTable>
            {CarOrdersHeader()}
            {CarOrdersFilling(orders.all, setUpdate)}
          </SimpleTable>
        </div>
      </div>
    </NavWrapper>
  );
}