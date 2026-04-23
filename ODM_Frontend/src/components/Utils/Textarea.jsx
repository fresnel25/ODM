const Textarea = ({ icon, label, placeholder, name, value, onChange }) => {
  return (
    <fieldset className="fieldset w-full h-full">
      <label className="label text-lg flex items-center gap-2">
        {icon && <span>{icon}</span>}
        <span>{label}</span>
      </label>

      <textarea
        className="textarea shadow-xl text-base-content rounded-xl xl:w-full"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      ></textarea>
    </fieldset>
  );
};

export default Textarea;
