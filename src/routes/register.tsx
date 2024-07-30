import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import "../styles/auth.scss";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="auth-container">
      <div className="right-panel">
        <Link to={"/"}>
          <h2>Polestar</h2>
        </Link>
        <h1>Register new Polestar ID</h1>
        <form id="register">
          <div className="register-names">
            <div>
              <label htmlFor="register-first-name">First Name</label>
              <input type="text" id="register-first-name" maxLength={20} />
            </div>
            <div>
              <label htmlFor="register-last-name">Last Name</label>
              <input type="text" id="register-last-name" maxLength={20} />
            </div>
          </div>

          <label htmlFor="register-dob">Date Of Birth</label>
          <input type="date" id="register-dob" />

          <label htmlFor="register-address">Home Address</label>
          <input type="text" id="register-address" maxLength={100} />

          <label htmlFor="register-number">Phone Number</label>
          <input type="number" id="register-number" maxLength={12} />

          <label htmlFor="register-email">Email address</label>
          <input type="email" id="register-email" maxLength={50} />

          <label htmlFor="register-password">Password</label>
          <input type="password" id="register-password" maxLength={30} />
          <p>
            Already have an account? <Link to={"/auth"}>Log in here</Link>.
          </p>
          <center>
            <button type="submit">Create Account</button>
          </center>
        </form>
      </div>
    </div>
  );
}
