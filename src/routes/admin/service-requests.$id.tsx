import { createFileRoute, Link } from "@tanstack/react-router";
import "../../styles/admin/service-request-id.scss";
import NavWrapper from "../../components/AdminComponents/NavWrapper";
import { getStatusColor, updateStatus } from "./service-requests_";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverAddress } from "../../utils/auth-utils";

type UserData = {
  firstName: string;
  lastName: string;
  homeAddress: string;
  phoneNumber: string;
  email: string;
};

type CarData = {
  model: string;
  modelCode: string;
  year: string;
  color: string;
  motor: string;
  battery: string;
  driveline: string;
  regNumber: string;
  vinCode: string;
  dateOfPurchase: string;
  warrantyYears: string;
};

interface ServiceData {
  id: string;
  status: string;
  mileage: string;
  pickup: string;
  description: string;
  avgMileage: string;
  hasCharger: string;
  timeInUse: string;
  otherRequests: { requestId: string }[];
  userData: UserData;
  carData: CarData;
}

async function getData(id: string, path: string) {
  return (
    await axios.get(serverAddress + path, {
      params: { id: id },
    })
  ).data[0];
}

const fetchStatus = async (id: string) => {
  const data = await getData(id, "/admin/service/status");
  return data.status;
};

async function fetchAllData(id: string) {
  const status = await fetchStatus(id);
  const details = await getData(id, "/admin/service/details");
  const userData = await getData(id, "/admin/service/user-contacts");
  const carData = await getData(id, "/admin/service/car-details");
  const avgMileage = await getData(id, "/admin/service/avg-mileage");
  const charger = await getData(id, "/admin/service/has-charger");
  const otherRequests = (
    await axios.get(serverAddress + "/admin/service/other-requests", {
      params: { id: id },
    })
  ).data;

  const daysInUse = (await getData(id, "/admin/service/days-in-use")).daysInUse;
  const yearsInUse = Math.floor(daysInUse / 365);

  return {
    id: id,
    ...details,
    status: status,
    userData: userData,
    carData: carData,
    otherRequests: otherRequests,
    avgMileage: avgMileage.averageMileage,
    timeInUse: `${yearsInUse} year(s) ${daysInUse - 365 * yearsInUse} day(s)`,
    hasCharger: charger.hasCharger == "1" ? "Yes" : "No",
  };
}

export const Route = createFileRoute("/admin/service-requests/$id")({
  loader: ({ params }) => fetchAllData(params.id),
  component: AdminServiceRequestsId,
});

function AdminServiceRequestsId() {
  const [serviceData, setServiceData] = useState<ServiceData>({
    id: "",
    status: "",
    userData: {} as UserData,
    carData: {} as CarData,
    mileage: "",
    pickup: "",
    description: "",
    avgMileage: "",
    hasCharger: "",
    timeInUse: "",
    otherRequests: [],
    ...Route.useLoaderData(),
  });
  const [update, setUpdate] = useState(Date.now());

  useEffect(() => {
    (async () => {
      const status = await fetchStatus(serviceData.id);

      setServiceData({
        ...serviceData,
        status: status,
      });
    })();
  }, [update]);

  return (
    <NavWrapper elementToHighlight={"admin-nav-service-requests"}>
      <div className="service-reqs-id">
        <div className="upper-line">
          <Link to="/admin/service-requests" className="back-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#d26100"
            >
              <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
            </svg>
            <div>Back</div>
          </Link>

          <h2>Case #{serviceData.id}</h2>

          <select
            defaultValue={serviceData.status}
            style={{ backgroundColor: getStatusColor(serviceData.status) }}
            onChange={(e) =>
              updateStatus(serviceData.id, e.target.value, setUpdate)
            }
            name={"status-" + serviceData.id}
          >
            <option key={"new"}>New</option>
            <option key={"parts"}>Waiting for parts</option>
            <option key={"in-progress"}>In progress</option>
            <option key={"cancelled"}>Cancelled</option>
            <option key={"completed"}>Completed</option>
          </select>
        </div>
        <div className="main-content">
          <div className="case-info">
            <h3>Request details: </h3>
            <div className="statistics">
              <div>
                <span>Mileage: </span>
                {serviceData.mileage} miles
              </div>
              <div>
                <span>Pickup: </span>
                {serviceData.pickup == "1" ? "Yes" : "No"}
              </div>
              <div>
                <span>Average Mileage/Year: </span>
                {serviceData.avgMileage} miles
              </div>
              <div>
                <span>Car in use: </span>
                {serviceData.timeInUse}
              </div>
              <div>
                <span>User has charger: </span>
                {serviceData.hasCharger}
              </div>
              <div>
                <span>Other incidents: </span>
                {serviceData.otherRequests.map((r) => "#" + r.requestId + "; ")}
              </div>
            </div>
            <div className="description">
              <h3>Description: </h3>
              <p>{serviceData.description}</p>
            </div>
          </div>
          <div className="general-info">
            <fieldset>
              <legend>User Information</legend>
              <div>
                <span>Full Name: </span>
                {serviceData.userData.firstName +
                  " " +
                  serviceData.userData.lastName}
              </div>
              <div>
                <span>Home Address: </span>
                {serviceData.userData.homeAddress}
              </div>
              <div>
                <span>Phone number: </span>
                {serviceData.userData.phoneNumber}
              </div>
              <div>
                <span>Email: </span>
                {serviceData.userData.email}
              </div>
            </fieldset>
            <fieldset>
              <legend>Car Specs</legend>
              <div>
                <span>Model: </span>
                {serviceData.carData.model}
              </div>
              <div>
                <span>Model Code: </span>
                {serviceData.carData.modelCode}
              </div>
              <div>
                <span>Year: </span>
                {serviceData.carData.year}
              </div>
              <div>
                <span>Color: </span>
                {serviceData.carData.color}
              </div>
              <div>
                <span>Motor: </span>
                {serviceData.carData.motor}
              </div>
              <div>
                <span>Battery: </span>
                {serviceData.carData.battery} kW
              </div>
              <div>
                <span>Driveline: </span>
                {serviceData.carData.driveline}
              </div>
              <div>
                <span>Reg Number: </span>
                {serviceData.carData.regNumber}
              </div>
              <div>
                <span>VIN Code: </span>
                {serviceData.carData.vinCode}
              </div>
              <div>
                <span>Purchased on: </span>
                {serviceData.carData.dateOfPurchase.slice(0, 10)}
              </div>
              <div>
                <span>Warranty: </span>
                {serviceData.carData.warrantyYears} Years
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </NavWrapper>
  );
}
