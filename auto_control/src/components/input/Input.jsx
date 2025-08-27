

import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function Input({ nameInput, style, maxLength, label, type, value, onChange, onClick, onBlur, readOnly, placeholder, className, id, checked, rest, nameRadio, tooltipText, // <<< novo prop para o tooltip
  tooltipPlacement = "right", // <<< default placement
}) {
  if (type === "radio") {
    // Preparado para checked
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

      <OverlayTrigger
        placement={tooltipPlacement}
        overlay={<Tooltip id={`tooltip-${id}`}>{tooltipText}</Tooltip>}
      >
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
          className={`input input-bordered ${className || ""}`}
        />
      </OverlayTrigger>
    </div>
  );
}

export default Input;
