import { createFileRoute } from "@tanstack/react-router";
import AdminNavWrapper from "../../components/AdminNavWrapper";

export const Route = createFileRoute("/admin/custom-vehicles")({
  component: AdminCustomVehicles,
});

function AdminCustomVehicles() {
  return (
    <AdminNavWrapper elementToHighlight={"admin-nav-custom-vehicles"}>
      AdminCustomVehicles
    </AdminNavWrapper>
  );
}
