import React from "react";
import "./styles.scss";
import { Link } from "@tanstack/react-router";

type HeaderProps = {
  bgUrl?: string | null;
};

function checkLogined() {
  const id = localStorage.getItem("session_id");
  return id != null;
}

export default function Header({ bgUrl = null }: HeaderProps) {
  return (
    <>
      <header className="header-container">
        <Link to={"/"} className="title">
          <svg
            height="2500"
            viewBox="0 0 800 800"
            width="2500"
            xmlns="http://www.w3.org/2000/svg"
            className="icon-svg"
            style={bgUrl === null ? {} : { backgroundImage: `url(${bgUrl})` }}
          >
            <path
              d="m0 0h800v800h-800z"
              className="svg-sky"
              style={bgUrl === null ? { fill: "#fff" } : {}}
            />{" "}
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
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              stroke="none"
            >
              <path
                fillRule={checkLogined() ? undefined : "evenodd"}
                clipRule="evenodd"
                d="M26.0002 16C26.0002 19.3137 23.314 22 20.0002 22C16.6865 22 14.0002 19.3137 14.0002 16C14.0002 12.6863 16.6865 10 20.0002 10C23.314 10 26.0002 12.6863 26.0002 16ZM24.0002 16C24.0002 18.2091 22.2094 20 20.0002 20C17.7911 20 16.0002 18.2091 16.0002 16C16.0002 13.7909 17.7911 12 20.0002 12C22.2094 12 24.0002 13.7909 24.0002 16Z"
              />
              <path d="M20.0002 25C13.5259 25 8.00952 28.8284 5.9082 34.192C6.4201 34.7004 6.95934 35.1812 7.52353 35.6321C9.08827 30.7077 13.997 27 20.0002 27C26.0035 27 30.9122 30.7077 32.477 35.6321C33.0412 35.1812 33.5804 34.7004 34.0923 34.1921C31.991 28.8284 26.4746 25 20.0002 25Z" />
            </svg>
          </Link>
        </nav>
        <div className="header-triangle"></div>
      </header>
      <div className="header-rigid-box"></div>
    </>
  );
}
