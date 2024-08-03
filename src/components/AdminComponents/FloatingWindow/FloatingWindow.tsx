import { ReactNode } from "react";
import "./styles.scss";

type FloatingWindowArgs = {
  cancelAction: () => void;
  saveAction: () => void;
  clearAction: () => void;
  hide: boolean;
  children: ReactNode;
};

export default function FloatingWindow({
  cancelAction,
  saveAction,
  clearAction,
  hide,
  children,
}: FloatingWindowArgs) {
  return (
    <div className={`floating-window-container ${hide ? "hidden" : ""}`}>
      <div className="floating-window">
        <div>{children}</div>
        <div className="buttons-pane">
          <div className="clear-button" onClick={clearAction}>
            Clear Fields
          </div>
          <div className="right-side">
            <div className="cancel-button" onClick={cancelAction}>
              Cancel
            </div>
            <div className="save-button" onClick={saveAction}>
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
