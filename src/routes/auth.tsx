import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import "../styles/auth.scss";

export const Route = createFileRoute("/auth")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <>
      <div className="auth-container">
        <div className="right-panel">
          <Link to={"/"}>
            <h2>Polestar</h2>
          </Link>
          <h1>Sign in with Polestar ID</h1>
          <form id="auth">
            <label htmlFor="auth-email">Email address</label>
            <input type="email" id="auth-email" maxLength={50} />
            <label htmlFor="auth-password">Password</label>
            <input type="password" id="auth-password" maxLength={30} />
            <p>
              Not a member yet? Get started with a{" "}
              <Link to={"/register"}>new account</Link>.
            </p>
            <center>
              <button type="submit">Sign in</button>
            </center>
          </form>
        </div>
      </div>
    </>
  );
}
