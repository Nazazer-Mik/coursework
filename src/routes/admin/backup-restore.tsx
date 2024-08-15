import { createFileRoute } from "@tanstack/react-router";
import NavWrapper from "../../components/AdminComponents/NavWrapper";
import "../../styles/admin/backup.scss";
import axios from "axios";
import { serverAddress } from "../../utils/auth-utils";

export const Route = createFileRoute("/admin/backup-restore")({
  component: AdminBackupRestore,
});

function AdminBackupRestore() {
  const requestBackup = async () => {
    const res = await axios.get(serverAddress + "/admin/backup");
    console.log(res);
  };

  return (
    <NavWrapper elementToHighlight={"admin-nav-backup-restore"}>
      <div className="backup-wrapper">
        <h2 className="backup-title">
          Website Database Backup and Restoration
        </h2>
        <div className="button-container">
          <button
            type="button"
            className="backup-button"
            onClick={requestBackup}
          >
            Download Backup
          </button>
        </div>
      </div>
    </NavWrapper>
  );
}
