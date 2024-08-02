import { createFileRoute } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const Route = createFileRoute("/charging")({
  component: ChargingPage,
});

function ChargingPage() {
  return (
    <>
      <Header elementToHiglight={"header-charging"} />
      <div className="chargers-container">
        <Footer />
      </div>
    </>
  );
}
