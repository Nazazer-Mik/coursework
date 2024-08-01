import { createFileRoute } from "@tanstack/react-router";
import AdminNavWrapper from "../../components/AdminNavWrapper";

export const Route = createFileRoute("/admin/test-drives")({
  component: AdminTestDrives,
});

function AdminTestDrives() {
  return (
    <AdminNavWrapper elementToHighlight={"admin-nav-test-drives"}>
      AdminTestDrives
    </AdminNavWrapper>
  );
}
