import axios from "axios";
import { userRegData } from "../routes/register";
import { UseNavigateResult } from "@tanstack/react-router";

export interface serverResponse {
  status: string;
  message: string;
  session_id: string;
}

export const serverAddress = "http://localhost:3000";

export const emailRegexp =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
export const passwordRegexp = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
export const ukPhoneNumberRegexp = /^0\d{10}$/;
export const nameRegexp = /^[a-zA-Z]{2,}$/;
export const addressRegexp = /^.{5,}$/;

export function CheckLoginCredentials(email: string, password: string): string {
  const emailConverted = email.toLowerCase();

  if (!emailConverted.match(emailRegexp) || !password.match(passwordRegexp))
    return "Email or password has incorrect format";

  return "OK";
}

export function CheckRegisterCredentials(userData: userRegData): string {
  const emailConverted = userData.email.toLowerCase();

  if (!userData.firstName.match(nameRegexp))
    return "First name has incorrect format";
  if (!userData.lastName.match(nameRegexp))
    return "Last name has incorrect format";

  if (!userData.homeAddress.match(addressRegexp))
    return "Home Address is too short";

  if (!userData.phoneNumber.match(ukPhoneNumberRegexp))
    return "Phone number has incorrect format";

  if (!emailConverted.match(emailRegexp)) return "Email has incorrect format";

  if (!userData.password.match(passwordRegexp))
    return "Password is not strong enough";

  return "OK";
}

export async function CompleteRequest(
  path: string,
  dataToSend: object,
  errorField: HTMLSpanElement,
  navigate: UseNavigateResult<"/register"> | UseNavigateResult<"/auth">
) {
  const response = (await axios.post(serverAddress + path, dataToSend))
    .data as serverResponse;

  if (response.status !== "OK") {
    errorField.innerHTML = response.message;
  } else {
    errorField.innerHTML = "";

    localStorage.setItem("session_id", response.session_id);
    await navigate({ to: "/" });
  }
}
