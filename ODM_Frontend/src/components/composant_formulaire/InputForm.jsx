const InputForm = ({ label, placeholder, value, onChange, type = "text" }) => (
  <div>
    <fieldset className="fieldset">
      <label className="label text-lg">{label}</label>
      <input
        type={type}
        className="input shadow-xl rounded-xl w-96"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </fieldset>
  </div>
);

export default InputForm;
