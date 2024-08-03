import axios from "axios";
import { serverResponse } from "../../routes/admin/custom-vehicles";
import { Model } from "../../routes/custom-vehicle";
import { Car } from "../../routes/new-vehicles";
import { serverAddress } from "../auth-utils";
import { Dispatch } from "react";

type KeysType = (keyof Car)[] | (keyof Model)[];

export function cleanFields(keys: KeysType, prefix: string) {
  for (const k of keys) {
    if (k === "model_code_fk") continue;

    const elem = document.getElementById(
      `${prefix}-vehicles-` + k
    ) as HTMLInputElement;
    elem.value = "";
  }
}

export async function createVehicle(
  errorElem: HTMLParagraphElement,
  keys: KeysType,
  prefix: string,
  setCreateWindowHidden: Dispatch<React.SetStateAction<boolean>>
) {
  const dataToSend = {} as Car | Model;

  for (const k of keys) {
    const elem = document.getElementById(`${prefix}-vehicles-` + k) as
      | HTMLInputElement
      | HTMLSelectElement;
    const value = elem.value;

    if (value == "") {
      errorElem.innerHTML = "Please fill all the fields";
      return;
    }

    dataToSend[k] = String(value);
  }

  const res = (
    await axios.post(serverAddress + `/admin/${prefix}-vehicles`, {
      method: "CREATE",
      data: dataToSend,
    })
  ).data as serverResponse;

  if (res.status !== "OK") {
    errorElem.innerHTML = res.message;
    return;
  }

  errorElem.innerHTML = "";
  setCreateWindowHidden(true);
}
