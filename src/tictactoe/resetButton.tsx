import "./resetButton.css";

export default function ResetButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button className="reset" onClick={onClick}>
      Reset button
    </button>
  );
}