import Select from "react-select";

const SelectInput = ({
  label,
  icon,
  options = [],
  placeholder = "Choisir une option",
  value,
  onChange,
  isClearable = true,
}) => {
  const selectedOption =
    options.find((option) => String(option.value) === String(value)) || null;

  return (
    <fieldset className="fieldset w-full xl:w-81">
      <label className="label text-lg flex items-center text-base-content gap-2">
        {icon && <span>{icon}</span>}
        <span>{label}</span>
      </label>

      <Select
        options={options}
        value={selectedOption}
        onChange={(selected) => onChange?.(selected ? selected.value : "")}
        placeholder={placeholder}
        isClearable={isClearable}
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "#1d232a",
            borderColor: "#374151",
            borderRadius: "12px",
            minHeight: "45px",
            boxShadow: "none",
          }),
          singleValue: (base) => ({
            ...base,
            color: "white",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "#2563eb"
              : state.isFocused
                ? "#374151"
                : "#1d232a",
            color: "white",
            cursor: "pointer",
          }),
          placeholder: (base) => ({
            ...base,
            color: "#9ca3af",
            fontSize: "15px",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "#1d232a",
            borderRadius: "12px",
            overflow: "hidden",
            zIndex: 50,
          }),
          input: (base) => ({
            ...base,
            color: "white",
          }),
        }}
      />
    </fieldset>
  );
};

export default SelectInput;
