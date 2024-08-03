import "./styles.scss";

type DeleteButtonArgs = {
  actionOnPress: () => void;
};

export default function DeleteButton({ actionOnPress }: DeleteButtonArgs) {
  return (
    <div className="delete-button" onClick={actionOnPress}>
      Delete
    </div>
  );
}
