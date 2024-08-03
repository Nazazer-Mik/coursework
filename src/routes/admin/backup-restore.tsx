import { createFileRoute } from "@tanstack/react-router";
import NavWrapper from "../../components/AdminComponents/NavWrapper";

export const Route = createFileRoute("/admin/backup-restore")({
  component: AdminBackupRestore,
});

function AdminBackupRestore() {
  return (
    <NavWrapper elementToHighlight={"admin-nav-backup-restore"}>
      AdminBackupRestore
    </NavWrapper>
  );
}
