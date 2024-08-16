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
    const res = (await axios.get(serverAddress + "/admin/backup")).data;
    const file = new Blob([JSON.stringify(res)], { type: "json" });
    const a = document.createElement("a");
    const url = URL.createObjectURL(file);

    const currentdate = new Date();
    const datetime =
      currentdate.getDate() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getFullYear() +
      "--" +
      currentdate.getHours() +
      "_" +
      currentdate.getMinutes() +
      "_" +
      currentdate.getSeconds();

    a.href = url;
    a.download = `backup-${datetime}.json`;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
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
