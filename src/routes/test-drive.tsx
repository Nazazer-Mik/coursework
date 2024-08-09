import { createFileRoute, redirect } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/test-drive.scss";
import axios from "axios";
import { serverAddress } from "../utils/auth-utils";
import { Model } from "./custom-vehicle_";
import { useState } from "react";

async function checkLogin() {
  const sessionId = localStorage.getItem("session_id");
  if (sessionId == null) {
    throw redirect({ to: "/auth" });
  }

  const models = (
    await axios.get(serverAddress + "/custom-vehicle", {
      params: { model: "any", driveline: "any", motor: "any" },
    })
  ).data;

  return [models];
}

export const Route = createFileRoute("/test-drive")({
  loader: checkLogin,
  component: TestDrive,
});

const timeSlots = [
  { from: "9:00", to: "12:00" },
  { from: "12:00", to: "15:00" },
  { from: "15:00", to: "18:00" },
];

function TestDrive() {
  const [models] = Route.useLoaderData() as [Model[]];
  const [choices, setChoices] = useState({ model: "", date: "", timeSlot: -1 });

  return (
    <>
      <Header elementToHiglight={"header-test-drive"} />
      <div className="test-drive-container">
        <div className="main-slide">
          <div className="central-block">
            <h2>
              Experience the Revolution: Schedule Your Polestar Test Drive Today
            </h2>
            <div className="main-content">
              <div className="model-selection">
                <h3 className="no-select-drag">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#1e1e1e"
                  >
                    <path d="M240-200v40q0 17-11.5 28.5T200-120h-40q-17 0-28.5-11.5T120-160v-320l84-240q6-18 21.5-29t34.5-11h440q19 0 34.5 11t21.5 29l84 240v320q0 17-11.5 28.5T800-120h-40q-17 0-28.5-11.5T720-160v-40H240Zm-8-360h496l-42-120H274l-42 120Zm-32 80v200-200Zm100 160q25 0 42.5-17.5T360-380q0-25-17.5-42.5T300-440q-25 0-42.5 17.5T240-380q0 25 17.5 42.5T300-320Zm360 0q25 0 42.5-17.5T720-380q0-25-17.5-42.5T660-440q-25 0-42.5 17.5T600-380q0 25 17.5 42.5T660-320Zm-460 40h560v-200H200v200Z" />
                  </svg>
                  Polestar Model to test drive
                </h3>
                <div className="content">
                  <div className="models">
                    {models.map((m) => (
                      <div
                        className={`model-card no-select-drag ${choices.model === m.model_code ? "model-active" : ""}`}
                        key={m.model_code}
                        onClick={() =>
                          setChoices({ ...choices, model: m.model_code })
                        }
                      >
                        {m.model_code
                          .replace("polestar", "polestar ")
                          .split("-")
                          .map(
                            (s) =>
                              s[0].toUpperCase() + s.slice(1, s.length) + " "
                          )}
                      </div>
                    ))}
                  </div>
                  <div
                    className="picture"
                    style={{
                      backgroundImage: `url("/src/assets/models/${choices.model == "" ? "no-car" : choices.model}.avif")`,
                    }}
                  ></div>
                </div>
              </div>
              <div
                className={`date-selection ${choices.model == "" ? "inactive" : ""}`}
              >
                <h3 className="no-select-drag">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#1e1e1e"
                  >
                    <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" />
                  </svg>
                  Date of test drive
                </h3>
                <div className="content">
                  <label htmlFor="test-drive-date">
                    Select date convenient for you:{" "}
                  </label>
                  <input
                    type="date"
                    id="test-drive-date"
                    className={`${choices.date != "" ? "date-active" : ""}`}
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={(e) =>
                      setChoices({ ...choices, date: e.target.value })
                    }
                  />
                </div>
              </div>
              <div
                className={`time-selection ${choices.date == "" ? "inactive" : ""}`}
              >
                <h3 className="no-select-drag">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#1e1e1e"
                  >
                    <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
                  </svg>
                  Time slot of selected date
                </h3>
                <div className="content">
                  {timeSlots.map((s, i) => (
                    <div
                      className={`time-slot ${choices.timeSlot == i ? "time-slot-active" : ""}`}
                      key={i}
                      onClick={() => setChoices({ ...choices, timeSlot: i })}
                    >
                      <h4>Time Slot #{i + 1}</h4>
                      <p>
                        Session between {s.from} and {s.to}
                      </p>
                    </div>
                  ))}

                  <button
                    type="button"
                    className={`complete-td-request ${choices.timeSlot == -1 ? "invisible" : ""}`}
                    onClick={() => console.log("HUIH")}
                  >
                    Submit Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
