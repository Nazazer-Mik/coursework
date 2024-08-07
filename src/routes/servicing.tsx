import { createFileRoute, redirect } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/service.scss";

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
  return (
    <>
      <Header elementToHiglight={"header-warranty-repair"} />
      <div className="service-container">
        <div className="main-slide">d</div>
        <Footer />
      </div>
    </>
  );
}
