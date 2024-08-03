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

export function collectDataFromFields(
  keys: KeysType,
  prefix: string,
  errorElem: HTMLParagraphElement
) {
  const dataToSend = {} as Car | Model;

  for (const k of keys) {
    const elem = document.getElementById(`${prefix}-vehicles-` + k) as
      | HTMLInputElement
      | HTMLSelectElement;
    const value = elem.value;

    if (value == "") {
      errorElem.innerHTML = "Please fill all the fields";
      return null;
    }

    dataToSend[k] = String(value);
  }

  return dataToSend;
}

export async function createVehicle(
  errorElem: HTMLParagraphElement,
  keys: KeysType,
  prefix: string,
  setCreateWindowHidden: Dispatch<React.SetStateAction<boolean>>
) {
  const dataToSend = collectDataFromFields(keys, prefix, errorElem);

  if (dataToSend === null) return;

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

export async function deleteVehicle(
  pk_name: string,
  pk: string,
  prefix: string,
  collection: Car[] | Model[],
  setCollection: Dispatch<React.SetStateAction<Car[] | Model[]>>
) {
  const confirmation = confirm("Are you sure you want to delete this row?");

  if (confirmation === false) return;

  const res = (
    await axios.post(serverAddress + `/admin/${prefix}-vehicles`, {
      method: "DELETE",
      data: { [pk_name]: pk },
    })
  ).data as serverResponse;

  if (res.status !== "OK") {
    const mess = "Internal Server Error! " + res.message;
    alert(mess);
    console.log(mess);
  } else {
    setCollection(
      collection.splice(
        collection.findIndex((m) => m[pk_name] === pk),
        1
      )
    );
  }
}

export async function saveEditData(
  errorElem: HTMLParagraphElement,
  keys: KeysType,
  prefix: string,
  setEditWindowHidden: Dispatch<React.SetStateAction<boolean>>,
  carId: string
) {
  const dataToSend = collectDataFromFields(keys, "new", errorElem);

  if (dataToSend === null) return;

  const res = (
    await axios.post(serverAddress + `/admin/${prefix}-vehicles`, {
      method: "UPDATE",
      data: { ...dataToSend, car_id: carId },
    })
  ).data as serverResponse;

  if (res.status !== "OK") {
    const mess = "Internal Server Error! " + res.message;
    alert(mess);
    console.log(mess);
    return;
  }

  errorElem.innerHTML = "";
  setEditWindowHidden(true);
}
