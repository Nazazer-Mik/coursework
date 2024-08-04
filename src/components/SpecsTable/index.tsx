import { ReactNode } from "react";
import "./styles.scss";

type SpecsTableArgs = {
  children: ReactNode;
};

export default function SpecsTable({ children }: SpecsTableArgs) {
  return (
    <div className="spec-section">
      <div className="table-container">
        <h2>Specifications and Technical Infromation</h2>
        <table>{children}</table>
      </div>
    </div>
  );
}
