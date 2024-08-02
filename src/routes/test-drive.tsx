import { createFileRoute } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const Route = createFileRoute("/test-drive")({
  component: TestDrive,
});

function TestDrive() {
  return (
    <>
      <Header elementToHiglight={"header-test-drive"} />
      <div className="chargers-container">
        <Footer />
      </div>
    </>
  );
}
