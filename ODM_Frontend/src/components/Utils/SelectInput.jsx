const SelectInput = ({
  label,
  icon,
  options = [],
  placeholder = "Choisir une option",
  value,
  onChange,
  
}) => {
  return (
    <fieldset className="fieldset">
      <label className="label text-lg flex items-center gap-2">
        {icon && <span>{icon}</span>}
        <span>{label}</span>
      </label>

      <select
      
        className="select shadow-xl text-base-content rounded-xl w-96"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      >
        
        <option disabled>{placeholder}</option>

        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    </fieldset>
  );
};

export default SelectInput;
