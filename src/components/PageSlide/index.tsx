import React, { ReactNode } from "react";
import "./styles.scss";

interface PageSlideProps {
  imagePath: string;
  children: ReactNode;
}

export default function PageSlide({ imagePath, children }: PageSlideProps) {
  const slideHeight: number = window.innerHeight * 0.9;

  return (
    <div
      className="slide"
      style={{ backgroundImage: `url(${imagePath})`, height: slideHeight }}
    >
      {children}
    </div>
  );
}
