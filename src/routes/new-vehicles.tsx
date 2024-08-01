import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/new-vehicles.scss";
import PreCarCard from "../components/PreCarCard";

export const Route = createFileRoute("/new-vehicles")({
  component: NewVehicles,
});

function NewVehicles() {
  return (
    <>
      <Header />
      <div className="vehicles-container">
        <div className="main-pane">
          <div className="filter-box">
            <h2>Filters</h2>
          </div>
          <div className="content-box">
            <PreCarCard />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
