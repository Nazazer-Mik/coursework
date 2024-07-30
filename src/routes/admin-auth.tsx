import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import "../styles/auth.scss";

export const Route = createFileRoute("/admin-auth")({
  component: AdminLogin,
});

function AdminLogin() {
  return (
    <>
      <div className="auth-container">
        <div className="right-panel">
          <Link to={"/"}>
            <h2>Polestar</h2>
          </Link>
          <h1>Sign in to Admin Panel</h1>
          <form id="admin-auth">
            <label htmlFor="admin-username">Username</label>
            <input type="email" id="admin-username" maxLength={30} />
            <label htmlFor="admin-password">Password</label>
            <input type="password" id="admin-password" maxLength={30} />
            <center>
              <button type="submit">Sign in</button>
            </center>
          </form>
        </div>
      </div>
    </>
  );
}
