import "./styles.scss";

type ModalWindowArgs = {
  title: string;
  mainText: string;
  onOkAction: () => void;
  show: boolean;
};

export default function ModalWindow({
  title,
  mainText,
  onOkAction,
  show,
}: ModalWindowArgs) {
  return (
    <div
      className={`modal-window-blur-block ${show ? "" : "hide-modal-window"}`}
    >
      <div className="modal-window">
        <h3>{title}</h3>
        <p>{mainText}</p>
        <button type="button" onClick={onOkAction}>
          OK
        </button>
      </div>
    </div>
  );
}
