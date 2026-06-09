import Select from "react-select";

const ReactSelectInput = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Choisir...",
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="font-medium text-sm">{label}</label>}

      <Select
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isClearable
        isSearchable
      />
    </div>
  );
};

export default ReactSelectInput;
