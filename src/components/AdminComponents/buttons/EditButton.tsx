import "./styles.scss";

type EditButtonArgs = {
  actionOnPress: () => void;
};

export default function EditButton({ actionOnPress }: EditButtonArgs) {
  return (
    <div className="edit-button" onClick={actionOnPress}>
      Edit
    </div>
  );
}
