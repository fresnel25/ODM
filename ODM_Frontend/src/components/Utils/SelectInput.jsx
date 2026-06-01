const SelectInput = ({
  label,
  icon,
  options = [],
  placeholder = "Choisir une option",
  value,
  onChange,
}) => {
  return (
    <fieldset className="fieldset w-full xl:w-96">
      <label className="label text-lg flex items-center gap-2">
        {icon && <span>{icon}</span>}
        <span>{label}</span>
      </label>

      <select
        className="select shadow-xl text-base-content rounded-xl"
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option, index) => (
          <option key={index} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </select>
    </fieldset>
  );
};

export default SelectInput;
