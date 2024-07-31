import React, { ChangeEvent, RefObject, useRef, useState } from "react";
import {
  createFileRoute,
  Link,
  useNavigate,
  UseNavigateResult,
} from "@tanstack/react-router";
import "../styles/auth.scss";
import { md5 } from "js-md5";
import { CompleteRequest } from "../utils/auth-utils";

type adminData = {
  username: string;
  password: string;
};

async function handleFormSubmit(
  event: React.FormEvent<HTMLFormElement>,
  errorElem: RefObject<HTMLSpanElement>,
  formData: adminData,
  navigate: UseNavigateResult<"/admin-auth">
) {
  event.preventDefault();

  const errorField = errorElem.current as HTMLSpanElement;

  const hashed_password = md5(formData.password);

  const dataToSend = {
    username: formData.username,
    password: hashed_password,
  };

  CompleteRequest(
    "/admin-auth",
    dataToSend,
    errorField,
    navigate,
    "/admin",
    "admin_session_id"
  );
}

export const Route = createFileRoute("/admin-auth")({
  component: AdminLogin,
});

function AdminLogin() {
  const errorElem = useRef(null);
  const navigate = useNavigate({ from: "/admin-auth" });

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="auth-container">
        <div className="right-panel">
          <Link to={"/"}>
            <h2>Polestar</h2>
          </Link>
          <h1>Sign in to Admin Panel</h1>
          <form
            id="admin-auth"
            onSubmit={(event) =>
              handleFormSubmit(event, errorElem, formData, navigate)
            }
          >
            <label htmlFor="admin-username">Username</label>
            <input
              type="text"
              id="admin-username"
              name="username"
              maxLength={30}
              onChange={handleChange}
              value={formData.username}
              required
            />
            <label htmlFor="admin-password">Password</label>
            <input
              type="password"
              id="admin-password"
              name="password"
              maxLength={30}
              onChange={handleChange}
              value={formData.password}
              required
            />
            <span
              className="errorText"
              id="errorTextAuth"
              ref={errorElem}
            ></span>
            <center>
              <button type="submit">Sign in</button>
            </center>
          </form>
        </div>
      </div>
    </>
  );
}
