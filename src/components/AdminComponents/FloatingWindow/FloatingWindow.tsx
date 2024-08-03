import { ReactNode } from "react";
import "./styles.scss";

type FloatingWindowArgs = {
  cancelAction: () => void;
  saveAction: () => void;
  hide: boolean;
  children: ReactNode;
};

export default function FloatingWindow({
  cancelAction,
  saveAction,
  hide,
  children,
}: FloatingWindowArgs) {
  return (
    <div className={`floating-window-container ${hide ? "hidden" : ""}`}>
      <div className="floating-window">
        <div>{children}</div>
        <div className="buttons-pane">
          <div className="cancel-button" onClick={cancelAction}>
            Cancel
          </div>
          <div className="save-button" onClick={saveAction}>
            Save
          </div>
        </div>
      </div>
    </div>
  );
}
