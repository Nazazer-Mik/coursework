import React, { ChangeEvent, RefObject, useRef, useState } from "react";
import {
  createFileRoute,
  Link,
  useNavigate,
  UseNavigateResult,
} from "@tanstack/react-router";
import "../styles/auth.scss";
import { CheckRegisterCredentials, CompleteRequest } from "../utils/auth-utils";
import { md5 } from "js-md5";

export type userRegData = {
  firstName: string;
  lastName: string;
  dob: string;
  homeAddress: string;
  phoneNumber: string;
  email: string;
  password: string;
};

async function handleFormSubmit(
  event: React.FormEvent<HTMLFormElement>,
  errorElem: RefObject<HTMLSpanElement>,
  formData: userRegData,
  navigate: UseNavigateResult<"/register">
) {
  event.preventDefault();

  const errorField = errorElem.current as HTMLSpanElement;
  const clientSideCheck = CheckRegisterCredentials(formData);

  if (clientSideCheck !== "OK") {
    errorField.innerHTML = clientSideCheck;
    return;
  } else {
    errorField.innerHTML = "";
  }

  const hashedPassword = md5(formData.password);
  const newFormData = {
    ...formData,
    password: hashedPassword,
  };

  CompleteRequest("/register", newFormData, errorField, navigate);
}

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const errorElem = useRef(null);
  const navigate = useNavigate({ from: "/register" });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    homeAddress: "",
    phoneNumber: "",
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
    <div className="auth-container">
      <div className="right-panel">
        <Link to={"/"}>
          <h2>Polestar</h2>
        </Link>
        <h1>Register new Polestar ID</h1>
        <form
          id="register"
          onSubmit={(event) =>
            handleFormSubmit(event, errorElem, formData, navigate)
          }
        >
          <div className="register-names">
            <div>
              <label htmlFor="register-first-name">First Name</label>
              <input
                type="text"
                id="register-first-name"
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}
                maxLength={20}
                required
              />
            </div>
            <div>
              <label htmlFor="register-last-name">Last Name</label>
              <input
                type="text"
                id="register-last-name"
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
                maxLength={20}
                required
              />
            </div>
          </div>

          <label htmlFor="register-dob">Date Of Birth</label>
          <input
            type="date"
            id="register-dob"
            name="dob"
            onChange={handleChange}
            value={formData.dob}
            required
          />

          <label htmlFor="register-address">Home Address</label>
          <input
            type="text"
            id="register-address"
            name="homeAddress"
            onChange={handleChange}
            value={formData.homeAddress}
            maxLength={100}
            required
          />

          <label htmlFor="register-number">Phone Number</label>
          <input
            type="number"
            id="register-number"
            name="phoneNumber"
            onChange={handleChange}
            value={formData.phoneNumber}
            maxLength={12}
            required
          />

          <label htmlFor="register-email">Email address</label>
          <input
            type="email"
            id="register-email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            maxLength={50}
            required
          />

          <label htmlFor="register-password">Password</label>
          <input
            type="password"
            id="register-password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            maxLength={30}
            required
          />
          <p>
            Already have an account? <Link to={"/auth"}>Log in here</Link>.
          </p>
          <span
            className="errorText"
            id="errorTextRegister"
            ref={errorElem}
          ></span>
          <center>
            <button type="submit">Create Account</button>
          </center>
        </form>
      </div>
    </div>
  );
}
