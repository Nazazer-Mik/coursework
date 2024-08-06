import axios from "axios";
import { serverResponse } from "../../routes/admin/custom-vehicles";
import { Model } from "../../routes/custom-vehicle_";
import { Car } from "../../routes/new-vehicles_";
import { serverAddress } from "../auth-utils";
import { ChangeEvent, Dispatch } from "react";
import { ChargerModel } from "../../routes/admin/chargers";

type KeysType = (keyof Car)[] | (keyof Model)[] | (keyof ChargerModel)[];

export function cleanFields(keys: KeysType, prefix: string) {
  for (const k of keys) {
    if (k === "model_code_fk") continue;

    const elem = document.getElementById(`${prefix}-` + k) as HTMLInputElement;
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
    const elem = document.getElementById(`${prefix}-` + k) as
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

export async function createObject(
  errorElem: HTMLParagraphElement,
  keys: KeysType,
  prefix: string,
  setCreateWindowHidden: Dispatch<React.SetStateAction<boolean>>
) {
  const dataToSend = collectDataFromFields(keys, prefix, errorElem);

  if (dataToSend === null) return;

  const res = (
    await axios.post(serverAddress + `/admin/${prefix}`, {
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

export async function deleteObject(
  pk_name: string,
  pk: string,
  prefix: string,
  collection: Car[] | Model[] | ChargerModel[],
  setCollection: Dispatch<
    React.SetStateAction<Car[] | Model[] | ChargerModel[]>
  >,
  doUpdate: Dispatch<React.SetStateAction<number>>
) {
  const confirmation = confirm("Are you sure you want to delete this row?");

  if (confirmation === false) return;

  const res = (
    await axios.post(serverAddress + `/admin/${prefix}`, {
      method: "DELETE",
      data: { [pk_name]: pk },
    })
  ).data as serverResponse;

  if (res.status !== "OK") {
    const mess = "Internal Server Error! " + res.message;
    alert(mess);
    console.log(mess);
  } else {
    const newCollection = [...collection];
    newCollection.splice(
      newCollection.findIndex((m) => m[pk_name] === pk),
      1
    );
    setCollection(newCollection);
    doUpdate(Date.now());
  }
}

export async function saveEditData(
  errorElem: HTMLParagraphElement,
  keys: KeysType,
  prefix: string,
  setEditWindowHidden: Dispatch<React.SetStateAction<boolean>>,
  carId: string
) {
  const dataToSend = collectDataFromFields(keys, "new-vehicles", errorElem);

  if (dataToSend === null) return;

  const res = (
    await axios.post(serverAddress + `/admin/${prefix}`, {
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

export async function ChangeModelProperty(
  prop: string,
  e: ChangeEvent<HTMLInputElement>,
  oldVal: string,
  modelCode: string,
  prefix: string,
  doUpdate: Dispatch<React.SetStateAction<number>>
) {
  const val = e.target.value;

  const confirmation = confirm(
    `Are you sure you want to change value from ${oldVal} to ${val}?`
  );

  if (confirmation === false) {
    e.target.value = oldVal;
    return;
  }

  const res = (
    await axios.post(`${serverAddress}/admin/${prefix}`, {
      method: "UPDATE",
      data: { model_code: modelCode, property: prop, value: val },
    })
  ).data as serverResponse;

  if (res.status !== "OK") {
    const mess = "Internal Server Error! " + res.message;
    alert(mess);
    console.log(mess);
  } else {
    doUpdate(Date.now());
  }
}
