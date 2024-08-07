import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import Header from "../components/Header";
import "../styles/service.scss";
import { useRef, useState } from "react";
import axios from "axios";
import { serverAddress } from "../utils/auth-utils";
import ModalWindow from "../components/ModalWindow";

interface Car {
  car_id: string;
  warranty_valid: string;
  warranty_until: string;
  model: string;
  car_order_id: string;
}

function checkLogin() {
  const sessionId = localStorage.getItem("session_id");
  if (sessionId == null) {
    throw redirect({ to: "/auth" });
  }
}

export const Route = createFileRoute("/servicing")({
  loader: checkLogin,
  component: ServiceWarranty,
});

function ServiceWarranty() {
  const [car, setCar] = useState<Car>();
  const regField = useRef<HTMLInputElement>(null);
  const regErrorElem = useRef<HTMLSpanElement>(null);
  const navigate = useNavigate({ from: "/servicing" });
  const [showModalWindow, setShowModalWindow] = useState(false);

  const getCar = async () => {
    const errorField = regErrorElem.current as HTMLSpanElement;
    const regNumber = regField.current?.value;
    if (regNumber?.length != 7) {
      errorField.innerText = "Wrong format of registration number <XXDDXXX>";
      return;
    }

    const carData = (
      await axios.get(serverAddress + "/service/reg-number", {
        params: { regNumber: regNumber?.toUpperCase() },
      })
    ).data as Car[];

    if (carData.length === 0) {
      errorField.innerText =
        "We couldn't find car with this number in our database";
    } else {
      errorField.innerText = "";
      setCar({
        ...carData[0],
        warranty_until: carData[0].warranty_until.slice(0, 10),
      });
    }
  };

  const sendData = async (e: SubmitEvent) => {
    e.preventDefault();
    const sessionId = localStorage.getItem("session_id");
    const form = e.target as HTMLFormElement;

    const dataToSend = {
      warranty: (form[0] as HTMLSelectElement).value == "Warranty",
      mileage: (form[1] as HTMLInputElement).value,
      pickup: (form[2] as HTMLInputElement).checked,
      description: (form[3] as HTMLTextAreaElement).value,
      car_order_id: car?.car_order_id,
      sessionId: sessionId,
    };

    const res = (await axios.post(serverAddress + "/service", dataToSend)).data;

    if (res.status == "OK") {
      setShowModalWindow(true);
    } else {
      console.log("Error! " + res.message);
    }
  };

  return (
    <>
      <ModalWindow
        title={`Thank you for creating service request!`}
        mainText={
          "Our Customer Service Team will contact you shortly to confirm details."
        }
        onOkAction={() => {
          navigate({ to: "/" });
        }}
        show={showModalWindow}
      />
      <Header elementToHiglight={"header-warranty-repair"} />
      <div className="service-container">
        <div
          className="main-slide"
          style={{
            backgroundImage: `url(${car?.car_id != null ? "src/assets/service-bg.avif" : ""})`,
          }}
        >
          <div
            className={`reg-number-reader ${car?.car_id != null ? "hide-left" : ""}`}
          >
            <h2>Need Car Service? Enter Your Reg Number to Begin</h2>
            <input
              type="text"
              maxLength={7}
              name="service-reg-number"
              ref={regField}
            />
            <span ref={regErrorElem} className="reg-error"></span>
            <p>
              Please note: We only service cars purchased from our dealership
            </p>
            <button type="button" onClick={() => getCar()}>
              Continue
            </button>
          </div>
          <div
            className={`request-creator ${car?.car_id == null ? "hide-right" : ""}`}
          >
            <form id="service-form" onSubmit={(e) => sendData(e)}>
              <h2>Service/Warranty request Form</h2>

              <p>
                Car: <u>{car?.model}</u>{" "}
                <span
                  style={{
                    color: `${car?.warranty_valid == "1" ? "rgb(16, 172, 16)" : "rgb(206, 14, 0)"}`,
                  }}
                >
                  {car?.warranty_valid == "1"
                    ? `Warranty valid until ${car?.warranty_until}`
                    : `Warranty has expired on ${car?.warranty_until}`}
                </span>
              </p>

              <div key={"request-type"}>
                <label htmlFor="request-type">
                  I would like to make request for
                </label>
                <select id="request-type">
                  <option>Service</option>
                  <option disabled={car?.warranty_valid == "0"}>
                    Warranty
                  </option>
                </select>
              </div>

              <div key={"current-mileage"}>
                <label htmlFor="current-mileage">Current mileage:</label>
                <input type="number" id="current-mileage" required />
              </div>

              <div key={"pickup"}>
                <input type="checkbox" id="pickup" />
                <label htmlFor="pickup">
                  Pickup the car from my home address
                </label>
              </div>

              <div key={"problem-description"}>
                <label htmlFor="problem-description">
                  Please describe the problem with as much detail as possible:
                </label>
                <br />
                <textarea id="problem-description" required />
              </div>

              <center>
                <button type="submit">Submit Request</button>
              </center>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
