import React, { ReactNode } from "react";
import "./styles.scss";

type TabArgs = {
  title: string;
  createButton: ReactNode;
  children: ReactNode;
};

export default function TableWithContents({
  title,
  createButton,
  children,
}: TabArgs) {
  return (
    <div className="table">
      <div className="title">
        {title}
        <span>{createButton}</span>
      </div>
      <div className="content">{children}</div>
    </div>
  );
}
