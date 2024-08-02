import { createFileRoute } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const Route = createFileRoute("/servicing")({
  component: ServiceWarranty,
});

function ServiceWarranty() {
  return (
    <>
      <Header elementToHiglight={"header-warranty-repair"} />
      <div className="chargers-container">
        <Footer />
      </div>
    </>
  );
}
