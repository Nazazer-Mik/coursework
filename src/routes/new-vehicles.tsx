import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/new-vehicles.scss";

export const Route = createFileRoute("/new-vehicles")({
  component: NewVehicles,
});

function NewVehicles() {
  return (
    <>
      <Header />
      <div className="new-vehicles-container">
        <div className="main-pane">WTF</div>
        <Footer />
      </div>
    </>
  );
}
