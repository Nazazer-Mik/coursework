import { createFileRoute } from "@tanstack/react-router";
import AdminNavWrapper from "../../components/AdminNavWrapper";

export const Route = createFileRoute("/admin/service-requests")({
  component: AdminServiceRequests,
});

function AdminServiceRequests() {
  return (
    <AdminNavWrapper elementToHighlight={"admin-nav-service-requests"}>
      AdminServiceRequests
    </AdminNavWrapper>
  );
}
