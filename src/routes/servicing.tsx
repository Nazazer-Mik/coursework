import { createFileRoute, redirect } from "@tanstack/react-router";
import Header from "../components/Header";
import "../styles/service.scss";
import { useRef, useState } from "react";
import axios from "axios";
import { serverAddress } from "../utils/auth-utils";

interface Car {
  car_id: string;
  waranty_valid: string;
  warranty_until: string;
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

    console.log(carData);
    if (carData.length === 0) {
      errorField.innerText =
        "We couldn't find car with this number in our database";
    } else {
      errorField.innerText = "";
      setCar(carData[0]);
    }
  };

  return (
    <>
      <Header elementToHiglight={"header-warranty-repair"} />
      <div className="service-container">
        <div className="main-slide">
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
            <div>FFS</div>
          </div>
        </div>
      </div>
    </>
  );
}
