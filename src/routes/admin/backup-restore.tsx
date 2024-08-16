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
          <div>
            <button type="button" className="restore-button">
              Restore From Backup
            </button>
            <label htmlFor="backup-upload" className="upload-label">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#f06e00"
              >
                <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
              </svg>
              Upload JSON File
            </label>
            <input type="file" id="backup-upload" />
          </div>
        </div>
      </div>
    </NavWrapper>
  );
}
