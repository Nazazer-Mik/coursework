import React, { ChangeEvent, RefObject, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import axios from "axios";
import { md5 } from "js-md5";
import "../styles/auth.scss";
import { CheckLoginCredentials, serverAddress } from "../utils/auth-utils";

type userData = {
  email: string;
  password: string;
};

export const Route = createFileRoute("/auth")({
  component: LoginPage,
});

function handleFormSubmit(
  event: React.FormEvent<HTMLFormElement>,
  errorElem: RefObject<HTMLSpanElement>,
  formData: userData
) {
  event.preventDefault();

  const errorField = errorElem.current as HTMLSpanElement;
  const clientSideCheck = CheckLoginCredentials(
    formData.email,
    formData.password
  );
  if (clientSideCheck !== "OK") {
    errorField.innerHTML = clientSideCheck;
    return;
  } else {
    errorField.innerHTML = "";
  }

  const hashed_password = md5(formData.password);

  axios
    .post(serverAddress + "/auth", {
      email: formData.email,
      password: hashed_password,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

function LoginPage() {
  const errorElem = useRef(null);

  const [formData, setFormData] = useState({
    email: "",
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
          <h1>Sign in with Polestar ID</h1>
          <form
            id="auth"
            onSubmit={(event) => handleFormSubmit(event, errorElem, formData)}
          >
            <label htmlFor="auth-email">Email address</label>
            <input
              type="email"
              name="email"
              id="auth-email"
              maxLength={50}
              onChange={handleChange}
              value={formData.email}
              required
            />
            <label htmlFor="auth-password">Password</label>
            <input
              type="password"
              name="password"
              id="auth-password"
              maxLength={30}
              onChange={handleChange}
              value={formData.password}
              required
            />
            <p>
              Not a member yet? Get started with a{" "}
              <Link to={"/register"}>new account</Link>.
            </p>
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
