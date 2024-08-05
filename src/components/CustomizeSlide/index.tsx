import { ReactNode } from "react";
import "./styles.scss";

type CustomizeSlideArgs = {
  imagePath: string;
  children: ReactNode;
};

export default function CustomizeSlide({
  imagePath,
  children,
}: CustomizeSlideArgs) {
  return (
    <div className="customizing-page">
      <div className="pictures-pane-wrapper">
        <div className="pictures-pane">
          <div className="pictures-container">
            <img
              src={imagePath}
              className="no-select-drag"
              alt="Photo of Polestar Car"
            />
          </div>
        </div>
      </div>
      <div className="right-pane">{children}</div>
    </div>
  );
}
