import "./styles.scss";

type CreateButtonArgs = {
  actionOnPress: () => void;
};

export default function CreateButton({ actionOnPress }: CreateButtonArgs) {
  return (
    <div className="create-button" onClick={actionOnPress}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#fff"
      >
        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
      </svg>
      Create new
    </div>
  );
}
