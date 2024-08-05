import { ReactNode } from "react";
import "./styles.scss";

export default function SimpleTable({ children }: { children: ReactNode }) {
  return <table className="simple-table">{children}</table>;
}
