import { createFileRoute } from "@tanstack/react-router";
import NavWrapper from "../../components/AdminComponents/NavWrapper";
import SimpleTable from "../../components/AdminComponents/SimpleTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverAddress } from "../../utils/auth-utils";

interface Request {
  service_request_id: string;
  car_order_id_fk: string;
  customer_id_fk: string;
  milage: string;
  pickup: string;
  status: string;
}

function getStatusColor(status: string) {
  const statColors = {
    "Waiting for parts": "#eaff7b",
    Completed: "#00ffab",
    Cancelled: "#d84242",
    New: "#29bdc1",
    "In progress": "#913f92",
  };

  return statColors[status];
}

function ServiceHeaders() {
  return (
    <tr key={"header"}>
      <th>ID</th>
      <th>Car Order ID</th>
      <th>Customer ID</th>
      <th>Mileage</th>
      <th>Pick Up</th>
      <th>Status</th>
    </tr>
  );
}

function TableFilling(reqs: Request[]) {
  return reqs.map((r) => (
    <tr key={r.service_request_id}>
      <td>{r.service_request_id}</td>
      <td>{r.car_order_id_fk}</td>
      <td>{r.customer_id_fk}</td>
      <td>{r.milage}</td>
      <td>{r.pickup == "1" ? "Yes" : "No"}</td>
      <td>
        <select
          defaultValue={r.status}
          style={{ backgroundColor: getStatusColor(r.status) }}
        >
          <option key={"new"}>New</option>
          <option key={"parts"}>Waiting for parts</option>
          <option key={"in-progress"}>In progress</option>
          <option key={"cancelled"}>Cancelled</option>
          <option key={"completed"}>Completed</option>
        </select>
      </td>
    </tr>
  ));
}

export const Route = createFileRoute("/admin/service-requests")({
  component: AdminServiceRequests,
});

function AdminServiceRequests() {
  const [reqs, setReqs] = useState({
    serviceReqs: [] as Request[],
    warrantyReqs: [] as Request[],
  });

  useEffect(() => {
    const fetchData = async () => {
      const serviceReqs = (await axios.get(serverAddress + "/admin/service"))
        .data;
      const warrantyReqs = (await axios.get(serverAddress + "/admin/warranty"))
        .data;

      setReqs({
        serviceReqs: serviceReqs,
        warrantyReqs: warrantyReqs,
      });
    };

    fetchData();
  }, []);

  return (
    <NavWrapper elementToHighlight={"admin-nav-service-requests"}>
      <div className="car-order-tables-container">
        <div className="awaiting-confirmation-orders">
          <h2>Service Requests</h2>
          <SimpleTable>
            {ServiceHeaders()}
            {TableFilling(reqs.serviceReqs)}
          </SimpleTable>
        </div>
        <div className="all-orders">
          <h2>Warranty Requests</h2>
          <SimpleTable>
            {ServiceHeaders()}
            {TableFilling(reqs.warrantyReqs)}
          </SimpleTable>
        </div>
      </div>
    </NavWrapper>
  );
}
