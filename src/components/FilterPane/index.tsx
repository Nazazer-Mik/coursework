import { ReactNode } from "react";
import "./styles.scss";

type FilterProps = {
  children: ReactNode;
};

export default function FilterPane({ children }: FilterProps) {
  return (
    <div className="filter-box">
      <h2>Filters</h2>
      <hr />
      {children}
    </div>
  );
}
