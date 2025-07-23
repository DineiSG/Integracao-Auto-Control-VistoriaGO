import React from "react";

function Input({ label, type = "text", value, onChange }) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="input input-bordered"
      />
    </div>
  );
}
export default Input;
