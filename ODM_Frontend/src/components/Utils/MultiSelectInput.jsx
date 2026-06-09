import Select from "react-select";

const MultiSelectInput = ({
  label,
  options = [],
  value = [],
  onChange,
  placeholder,
}) => {
  return (
    <fieldset className="fieldset w-full h-full">
      <label className="label text-lg">{label}</label>

      <Select
        isMulti
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
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

export default MultiSelectInput;
