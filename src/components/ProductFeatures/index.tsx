import { ReactNode } from "react";
import "./styles.scss";

type ProductFeaturesArgs = {
  title: string;
  children: ReactNode;
};

export default function ProductFeatures({
  title,
  children,
}: ProductFeaturesArgs) {
  return (
    <div className="product-features">
      <h2>{title}</h2>
      <ul>{children}</ul>
    </div>
  );
}
