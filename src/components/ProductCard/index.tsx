import { ReactNode } from "react";
import "./styles.scss";

interface carPictureProp {
  imagePath: string;
  children: ReactNode;
}

export default function CarCard({ imagePath, children }: carPictureProp) {
  return (
    <div className="car-card">
      <div
        className="car-picture"
        style={{ backgroundImage: `url("${imagePath}")` }}
      ></div>
      <div className="text-section">{children}</div>
    </div>
  );
}
