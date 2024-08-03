import { createFileRoute } from "@tanstack/react-router";
import NavWrapper from "../../components/AdminComponents/NavWrapper";

export const Route = createFileRoute("/admin/custom-vehicles")({
  component: AdminCustomVehicles,
});

function AdminCustomVehicles() {
  return (
    <NavWrapper elementToHighlight={"admin-nav-custom-vehicles"}>
      AdminCustomVehicles
    </NavWrapper>
  );
}
