import { createFileRoute, Link } from "@tanstack/react-router";
import NavWrapper from "../../components/AdminComponents/NavWrapper";
import SimpleTable from "../../components/AdminComponents/SimpleTable";
import { Dispatch, useEffect, useState } from "react";
import axios from "axios";
import { serverAddress } from "../../utils/auth-utils";

interface Request {
  service_request_id: string;
  car_order_id_fk: string;
  customer_id_fk: string;
  first_name: string;
  last_name: string;
  milage: string;
  pickup: string;
  status: string;
}

export async function updateStatus(
  requestId: string,
  val: string,
  setUpdate: Dispatch<React.SetStateAction<number>>
) {
  await axios.post(`${serverAddress}/admin/service/update-status`, {
    action: "UPDATE",
    data: {
      serviceRequestId: requestId,
      value: val,
    },
  });

  setUpdate(Date.now());
}

export function getStatusColor(status: string) {
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
      <th>Customer Name</th>
      <th>Mileage</th>
      <th>Pick Up</th>
      <th>Status</th>
    </tr>
  );
}

function TableFilling(
  reqs: Request[],
  setUpdate: Dispatch<React.SetStateAction<number>>
) {
  return reqs.map((r) => (
    <tr key={r.service_request_id}>
      <td>
        <Link
          to="/admin/service-requests/$id"
          params={{ id: r.service_request_id }}
        >
          &nbsp;{r.service_request_id}&nbsp;
        </Link>
      </td>

      <td>{r.car_order_id_fk}</td>
      <td>{r.customer_id_fk}</td>
      <td>{r.first_name + " " + r.last_name}</td>
      <td>{r.milage}</td>
      <td>{r.pickup == "1" ? "Yes" : "No"}</td>
      <td>
        <select
          defaultValue={r.status}
          style={{ backgroundColor: getStatusColor(r.status), width: "100%" }}
          onChange={(e) =>
            updateStatus(r.service_request_id, e.target.value, setUpdate)
          }
          name={"status" + r.service_request_id}
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
  const [update, setUpdate] = useState(Date.now());
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
  }, [update]);

  return (
    <NavWrapper elementToHighlight={"admin-nav-service-requests"}>
      <div className="car-order-tables-container">
        <div className="awaiting-confirmation-orders">
          <h2>Service Requests</h2>
          <SimpleTable>
            {ServiceHeaders()}
            {TableFilling(reqs.serviceReqs, setUpdate)}
          </SimpleTable>
        </div>
        <div className="all-orders">
          <h2>Warranty Requests</h2>
          <SimpleTable>
            {ServiceHeaders()}
            {TableFilling(reqs.warrantyReqs, setUpdate)}
          </SimpleTable>
        </div>
      </div>
    </NavWrapper>
  );
}
