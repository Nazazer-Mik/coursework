import { createFileRoute } from "@tanstack/react-router";
import AdminNavWrapper from "../../components/AdminNavWrapper";

export const Route = createFileRoute("/admin/backup-restore")({
  component: AdminBackupRestore,
});

function AdminBackupRestore() {
  return (
    <AdminNavWrapper elementToHighlight={"admin-nav-backup-restore"}>
      AdminBackupRestore
    </AdminNavWrapper>
  );
}
