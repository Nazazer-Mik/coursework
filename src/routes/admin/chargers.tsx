import { createFileRoute } from "@tanstack/react-router";
import AdminNavWrapper from "../../components/AdminNavWrapper";

export const Route = createFileRoute("/admin/chargers")({
  component: AdminChargers,
});

function AdminChargers() {
  return (
    <AdminNavWrapper elementToHighlight={"admin-nav-chargers"}>
      AdminChargers
    </AdminNavWrapper>
  );
}
