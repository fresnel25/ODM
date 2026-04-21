const Textarea = ({ icon, label, placeholder, name, value, onChange }) => {
  return (
    <div>
      <fieldset className="fieldset">
        <label className="label text-lg flex items-center gap-2">
          <span>{icon}</span>
          <span>{label}</span>
        </label>

        <textarea
          className="textarea shadow-xl text-base-content rounded-xl w-full h-full"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
        ></textarea>
      </fieldset>
    </div>
  );
};

export default Textarea;
