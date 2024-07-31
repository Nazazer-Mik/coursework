import React from "react";
import "./styles.scss";
import { Link } from "@tanstack/react-router";

function checkLoggedIn(sessionAttributeName: string) {
  const id = localStorage.getItem(sessionAttributeName);
  return id != undefined;
}

export default function Footer() {
  return (
    <footer>
      <div className="links-container">
        <div>
          <h3>Useful pages and products we offer</h3>
          <Link to={"/"}>Home page</Link>
          <Link to={"/new-vehicles"}>Buy preassembled car</Link>
          <Link to={"/custom-vehicle"}>Customise car</Link>
          <Link to={"/charging"}>Buy charger</Link>
        </div>
        <div>
          <h3>Enjoy our services</h3>
          <Link to={"/test-drive"}>Book a test drive</Link>
          <Link to={"/servicing"}>Request service</Link>
          <Link to={""} onClick={() => {}} className="inactive">
            Contact our support team
          </Link>
        </div>
        <div>
          <h3>Authorization</h3>
          <Link to={"/register"}>Registration</Link>
          <Link to={checkLoggedIn("session_id") ? "/" : "/auth"}>
            Login page
          </Link>
          <Link
            to={checkLoggedIn("admin_session_id") ? "/admin" : "/admin-auth"}
          >
            Admin
          </Link>
        </div>
      </div>
      <hr />
      <div className="trademark-line">
        Polestar © 2024. All rights reserved.
      </div>
    </footer>
  );
}
