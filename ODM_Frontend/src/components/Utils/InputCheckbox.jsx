import React from "react";

const InputCheckbox = ({
  label,
  checked = false,
  onChange,
  value,
  disabled = false,
}) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="checkbox checkbox-info"
      />

      <span className="text-sm font-medium">{label}</span>
    </label>
  );
};

export default InputCheckbox;
