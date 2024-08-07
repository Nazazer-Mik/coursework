import { createFileRoute, redirect } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/test-drive.scss";

function checkLogin() {
  const sessionId = localStorage.getItem("session_id");
  if (sessionId == null) {
    throw redirect({ to: "/auth" });
  }
}

export const Route = createFileRoute("/test-drive")({
  loader: checkLogin,
  component: TestDrive,
});

function TestDrive() {
  return (
    <>
      <Header elementToHiglight={"header-test-drive"} />
      <div className="test-drive-container">
        <div className="main-slide">Test Drive Request</div>
        <Footer />
      </div>
    </>
  );
}
