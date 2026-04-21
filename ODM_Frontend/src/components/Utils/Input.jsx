const Input = ({
  icon,
  label,
  placeholder,
  type,
  name,
  value,
  onChange,
}) => {
  return (
    <div>
      <fieldset className="fieldset">
        <label className="label text-lg flex items-center gap-2">
          <span>{icon}</span>
          <span>{label}</span>
        </label>

        <input
          type={type}
          className="input shadow-xl text-base-content rounded-xl w-96"
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
        />
      </fieldset>
    </div>
  );
};

export default Input;
