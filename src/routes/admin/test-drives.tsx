import { createFileRoute } from "@tanstack/react-router";
import NavWrapper from "../../components/AdminComponents/NavWrapper";
import SimpleTable from "../../components/AdminComponents/SimpleTable";
import { Dispatch, useEffect, useState } from "react";
import { serverAddress } from "../../utils/auth-utils";
import axios from "axios";
import { getStatusColor } from "./car-orders";
import "../../styles/admin/test-drive.scss";

interface TestDrive {
  test_drive_booking_id: string;
  model_code_fk: string;
  customer_id_fk: string;
  customer_name: string;
  booking_time: string;
  requested_on: string;
  status: string;
}

interface CustomerData {
  fullName: string;
  email: string;
  phoneNumber: string;
  carsPurchased: string;
  serviceUsed: string;
  testDrived: string;
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

function changeVisibility(action: string, id: string) {
  const elem = document.getElementById(`customer-info-${id}`) as HTMLDivElement;

  if (action === "show") {
    elem.style.display = "block";
  } else if (action === "hide") {
    elem.style.display = "none";
  }
}

async function fetchCustomerData(
  id: string,
  modelCode: string,
  setCustomerData: Dispatch<React.SetStateAction<CustomerData>>
) {
  const params = { params: { id: id } };
  const user = (await axios.get(serverAddress + "/admin/user/contacts", params))
    .data[0];

  const carsPurchased = (
    await axios.get(serverAddress + "/admin/user/cars-purchased", params)
  ).data[0];

  const serviceUsed = (
    await axios.get(serverAddress + "/admin/user/service-used", params)
  ).data[0];

  const testDrived = (
    await axios.get(serverAddress + "/admin/user/test-drived", {
      params: {
        id: id,
        modelCode: modelCode,
      },
    })
  ).data[0];

  setCustomerData({
    ...user,
    ...serviceUsed,
    ...carsPurchased,
    ...testDrived,
  });
}

function TestDrivesFilling(
  bookings: TestDrive[] | undefined,
  setUpdate: Dispatch<React.SetStateAction<number>>
) {
  const [customerData, setCustomerData] = useState({} as CustomerData);
  return bookings == undefined ? (
    <div className="loading">Loading...</div>
  ) : (
    bookings.map((b) => (
      <tr key={b.test_drive_booking_id}>
        <td>{b.test_drive_booking_id}</td>
        <td>{b.model_code_fk}</td>
        <td>
          <div
            className="hoverable"
            onMouseEnter={() => {
              changeVisibility("show", b.test_drive_booking_id);
              fetchCustomerData(
                b.customer_id_fk,
                b.model_code_fk,
                setCustomerData
              );
            }}
            onMouseLeave={() => {
              changeVisibility("hide", b.test_drive_booking_id);
              setCustomerData({} as CustomerData);
            }}
          >
            {b.customer_id_fk}
            <div
              className="customer-info"
              id={`customer-info-${b.test_drive_booking_id}`}
            >
              <div className="info-box">
                {customerData.testDrived == null ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    <p>
                      Name: <span>{customerData.fullName}</span>
                    </p>
                    <p>
                      Phone number: <span>{customerData.phoneNumber}</span>
                    </p>
                    <p>
                      Email: <span>{customerData.email}</span>
                    </p>
                    <p>
                      Cars purchased: <span>{customerData.carsPurchased}</span>
                    </p>
                    <p>
                      Service used: <span>{customerData.serviceUsed}</span>
                    </p>
                    <p>
                      Test drived: <span>{customerData.testDrived}</span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </td>
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
