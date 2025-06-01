import "./CheckBox.scss";

export default function CheckBox({
  text,
  checked,
  onChange,
}: {
  text: string | null;
  checked: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <div className="customCheckBoxHolder">
      <input
        type="checkbox"
        checked={checked}
        id={text || undefined}
        className="customCheckBoxInput"
        value={checked ? "true" : "false"}
        onChange={e => onChange && onChange(e.target.checked)}
      />
      <label htmlFor={text || undefined} className="customCheckBoxWrapper">
        <div className="customCheckBox">
          <div className="inner">{text}</div>
        </div>
      </label>
    </div>
  );
}