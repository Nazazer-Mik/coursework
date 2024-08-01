import { createFileRoute } from "@tanstack/react-router";
import AdminNavWrapper from "../../components/AdminNavWrapper";

export const Route = createFileRoute("/admin/new-vehicles")({
  component: AdminNewVehicles,
});

function AdminNewVehicles() {
  return (
    <AdminNavWrapper elementToHighlight={"admin-nav-new-vehicles"}>
      AdminNewVehicles
    </AdminNavWrapper>
  );
}
