import React from "react";
import "./styles.scss";
import { Link, ReactNode } from "@tanstack/react-router";

type WrapperArgs = {
  children: ReactNode;
};

export default function AdminNavWrapper({ children }: WrapperArgs) {
  return (
    <>
      <nav className="side-nav-bar">
        <h1>Polestar</h1>
        <hr />
        <div className="links-container">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/new-vehicles">New Vehicles</Link>
          <Link to="/admin/custom-vehicles">Custom Vehicles</Link>
          <Link to="/admin/chargers">Chargers</Link>
          <Link to="/admin/test-drives">Test Drives</Link>
          <Link to="/admin/service-requests">Service Requests</Link>
          <Link to="/admin/backup-restore">Backup/Restore</Link>
          <button type="button">
            Exit Admin Panel
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>
          </button>
        </div>
      </nav>
      <div className="content-body">{children}</div>
    </>
  );
}
