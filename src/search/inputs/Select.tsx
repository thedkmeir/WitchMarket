// WitchySelect.tsx
import Select from "react-select";
import "./Select.scss";

type WitchySelectProps = {
  inputId?: string;
  options: string[];
  value: string | null;
  onChange: (value: string | null) => void;
  searchable?: boolean;
  placeholder?: string;
};

export default function WitchySelect({
  inputId,
  options,
  value,
  onChange,
  placeholder,
  searchable = true,
}: WitchySelectProps) {
  const selectOptions = options.map((v) => ({
    value: v,
    label: v,
  }));

  const selectedOption = value
    ? selectOptions.find((opt) => opt.value === value) || null
    : null;

  // Witchy color palette
  const colors = {
    bg: "var(--color-3)",
    accent: "var(--color-4-bright)",
    text: "black",
    selected: "var(--color-4)",
    border: "var(--color-2-bright)",
    hover: "var(--color-4-bright)",
  };

  return (
    <Select
      inputId={inputId}
      classNamePrefix="witchy-select"
      options={selectOptions}
      value={selectedOption}
      onChange={(option) => onChange(option ? option.value : null)}
      placeholder={placeholder}
      isClearable={false}
      isSearchable={searchable} // Set to true if you want search functionality
      styles={{
        control: (base, state) => ({
          ...base,
          background: colors.bg,
          borderRadius: 7,
          minHeight: 44,
          maxHeight: 44,
          fontFamily: "'Dancing Script', cursive",
          fontWeight: 700,
          fontSize: 24,
          color: colors.text,
          transition: "border 0.2s, box-shadow 0.2s",
          border: `1px none ${colors.border}`,
        }),
        menuList: (base) => ({
          ...base,
          padding: 0,
          margin: 0,
          maxHeight: "auto",
        }),
        menu: (base) => ({
          ...base,
          borderRadius: 7,
          background: colors.bg,
          boxShadow: `0 10px 30px 0 rgba(33,15,55,0.19)`,
          padding: "5px 5px",
          fontFamily: "'Dancing Script', cursive",
        }),
        option: (base, state) => ({
          ...base,
          background: state.isSelected
            ? colors.selected
            : state.isFocused
            ? colors.hover
            : colors.bg,
          color: colors.text,
          fontWeight: state.isSelected ? 900 : 700,
          borderRadius: 8,
          // margin: "1.5px 8px",
          padding: "11px 18px",
          fontFamily: "'Dancing Script', cursive",
          fontSize: 24,
          transition: "background 0.18s",
        }),
        singleValue: (base) => ({
          ...base,
          color: colors.text,
          fontWeight: 700,
        }),
        placeholder: (base) => ({
          ...base,
          color: colors.text,
          opacity: 0.82,
          fontWeight: 700,
        }),
        dropdownIndicator: (base) => ({
          ...base,
          color: colors.text,
        }),
        indicatorSeparator: (base) => ({
          ...base,
          // backgroundColor: colors.accent,
          display: "none",
        }),
        input: (base) => ({
          ...base,
          fontFamily: "'Dancing Script', cursive",
          fontWeight: 700,

          // display: "none"
        }),
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 8,
        colors: {
          ...theme.colors,
          primary25: colors.hover,
          primary: "none",
        },
      })}
    />
  );
}
