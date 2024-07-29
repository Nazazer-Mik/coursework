import React from "react";
import "./styles.scss";
import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <>
      <header>
        <Link to={"/"} className="title">
          <svg
            height="2500"
            viewBox="0 0 800 800"
            width="2500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m0 0h800v800h-800z" fill="#fff" />
            <path
              d="m397.33 407.7v335.51l-13.7 16.66-56.61-281.95zm5.58-15.51v-335.56l13.7-16.67 56.6 281.91z"
              fill="#000000"
            />
            <path
              d="m327.02 477.92-281.83-56.52 16.64-13.7h335.5zm146.24-156.03 281.84 56.7-16.65 13.7h-335.54z"
              fill="#1e1e1e"
            />
          </svg>
          <h1>Polestar</h1>
        </Link>
        <nav>
          <Link to={"/new-vehicles"}>New Vehicles</Link>
          <Link to={"/custom-vehicle"}>Build Vehicle</Link>
          <Link to={"/test-drive"}>Test Drive</Link>
          <Link to={"/charging"}>Charging</Link>
          <Link to={"/servicing"}>Warranty & Repair</Link>
          <Link to={"/auth"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </Link>
        </nav>
      </header>
      <div className="header-rigid-box"></div>
    </>
  );
}
