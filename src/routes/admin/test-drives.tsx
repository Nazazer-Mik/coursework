import { createFileRoute } from "@tanstack/react-router";
import NavWrapper from "../../components/AdminComponents/NavWrapper";
import SimpleTable from "../../components/AdminComponents/SimpleTable";
import { Dispatch, useEffect, useState } from "react";
import { serverAddress } from "../../utils/auth-utils";
import axios from "axios";
import { getStatusColor } from "./car-orders";

interface TestDrive {
  test_drive_booking_id: string;
  model_code_fk: string;
  customer_id_fk: string;
  customer_name: string;
  booking_time: string;
  requested_on: string;
  status: string;
}

export async function updateStatus(
  bookingId: string,
  val: string,
  setUpdate: Dispatch<React.SetStateAction<number>>
) {
  await axios.post(`${serverAddress}/admin/test-drive`, {
    action: "UPDATE STATUS",
    data: {
      bookingId: bookingId,
      status: val,
    },
  });

  setUpdate(Date.now());
}

function TestDriveHeaders() {
  return (
    <tr key={"header"}>
      <th>ID</th>
      <th>Model</th>
      <th>Customer ID</th>
      <th>Customer Name</th>
      <th>Booking Time</th>
      <th>Requested On</th>
      <th>Status</th>
    </tr>
  );
}

function TestDrivesFilling(
  bookings: TestDrive[] | undefined,
  setUpdate: Dispatch<React.SetStateAction<number>>
) {
  return bookings == undefined ? (
    <div className="loading">Loading...</div>
  ) : (
    bookings.map((b) => (
      <tr key={b.test_drive_booking_id}>
        <td>{b.test_drive_booking_id}</td>
        <td>{b.model_code_fk}</td>
        <td>{b.customer_id_fk}</td>
        <td>{b.customer_name}</td>
        <td>{b.booking_time.replace("T", ", ").slice(0, 17)}</td>
        <td>{b.requested_on.replace("T", ", ").slice(0, 17)}</td>
        <td>
          <select
            name={b.test_drive_booking_id}
            defaultValue={b.status}
            style={{ backgroundColor: getStatusColor(b.status) }}
            onChange={(e) =>
              updateStatus(b.test_drive_booking_id, e.target.value, setUpdate)
            }
          >
            <option>Awaiting confirmation</option>
            <option>Confirmed</option>
            <option>Rejected</option>
            <option>Cancelled</option>
          </select>
        </td>
      </tr>
    ))
  );
}

export const Route = createFileRoute("/admin/test-drives")({
  component: AdminTestDrives,
});

function AdminTestDrives() {
  const [update, setUpdate] = useState(Date.now());
  const [futureTestDrives, setFutureTestDrives] = useState<TestDrive[]>();

  useEffect(() => {
    const fetchData = async () => {
      const testDrives = (await axios.get(serverAddress + "/admin/test-drive"))
        .data;

      setFutureTestDrives(testDrives);
    };

    fetchData();
  }, [update]);

  return (
    <NavWrapper elementToHighlight={"admin-nav-test-drives"}>
      <div className="car-order-tables-container">
        <div className="awaiting-confirmation-orders">
          <h2>Present and Future Test Drive Bookings</h2>
          <SimpleTable>
            {TestDriveHeaders()}
            {TestDrivesFilling(futureTestDrives, setUpdate)}
          </SimpleTable>
        </div>
      </div>
    </NavWrapper>
  );
}
