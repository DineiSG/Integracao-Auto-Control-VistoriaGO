

function Input({ nameInput, style, maxLength, label, type, value, onChange, onClick,onBlur, readOnly, placeholder, className, id, checked, rest, nameRadio }) {
    if (type === "radio") {
      //Preparado para checked
    return (
      <div className="form-check">
        <input
          className={`form-check-input ${className || ""}`}
          type="radio"
          id={id}
          name={nameRadio}
          value={value}
          checked={checked}
          onChange={onChange}
          {...rest}
        />
        <label className="form-check-label" htmlFor={id}>
          {label}
        </label>
      </div>
    );
  }
  return (
    <div className="form-control" id="input-all">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        value={value}
        name={nameInput}
        onClick={onClick}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        style={style}
        onBlur={onBlur}
        readOnly={readOnly}
        className="input input-bordered"
      />
    </div>
  );
}
export default Input;
