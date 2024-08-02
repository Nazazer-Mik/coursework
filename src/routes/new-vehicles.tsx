import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/new-vehicles.scss";
import PreCarCard from "../components/PreCarCard";
import FilterPane from "../components/FilterPane";

export const Route = createFileRoute("/new-vehicles")({
  component: NewVehicles,
});

function NewVehicles() {
  return (
    <>
      <Header elementToHiglight={"header-new-vehicle"} />
      <div className="vehicles-container">
        <div className="main-pane">
          <FilterPane>WTF</FilterPane>
          <div className="content-box">
            <PreCarCard
              model="Polestar 2"
              color="Black"
              range="460"
              zero_sixty="0.5"
              engine_power_kw="220"
              wheels="R15"
              price="$44500"
            ></PreCarCard>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
