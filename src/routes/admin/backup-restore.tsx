import { createFileRoute } from "@tanstack/react-router";
import NavWrapper from "../../components/AdminComponents/NavWrapper";
import "../../styles/admin/backup.scss";
import axios from "axios";
import { serverAddress } from "../../utils/auth-utils";
import { ChangeEvent, useState } from "react";

export const Route = createFileRoute("/admin/backup-restore")({
  component: AdminBackupRestore,
});

function AdminBackupRestore() {
  const [file, setFile] = useState<File>();

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

  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      setFile(input.files[0]);
    }
  };

  const processFile = async () => {
    if (file == null) {
      alert("Please, upload the file first.");
      return;
    } else if (file.type != "application/json") {
      alert("The file should be of JSON format.");
      return;
    }

    if (
      confirm("Are you sure you want to restore database?") &&
      confirm("This action will erase all current data!")
    ) {
      const data = await file.text();
      const res = (
        await axios.post(serverAddress + "/admin/restore", {
          dbData: data,
          fileName: file.name,
        })
      ).data;

      console.log(res);
    }
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
            <button
              type="button"
              className="restore-button"
              onClick={processFile}
            >
              Restore From Backup
            </button>
            <label htmlFor="backup-upload" className="upload-label">
              {file == null ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#f06e00"
                >
                  <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#10ac10"
                >
                  <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
              )}
              Upload JSON File
            </label>
            <input
              type="file"
              id="backup-upload"
              onChange={onInputChange}
              accept="application/json"
            />
          </div>
        </div>
      </div>
    </NavWrapper>
  );
}
