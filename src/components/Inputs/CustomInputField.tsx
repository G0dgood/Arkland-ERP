import React, { useState, useEffect } from "react";
import { ErrorMessage, useField } from "formik";
import { InputFieldProps } from "../../pages/interfaces/input";

const CustomInputField = ({
  label,
  className,
  password,
  placeholder,
  maxLength,
  minLength,
  inputMode,
  defaultValue,
  style,
  value,
  readOnly,
  onChange,
  required,
  disabled,
  type,
  handleChange,
  ...props
}: InputFieldProps) => {
  const [field, meta] = useField(props);
  const [labelColor, setLabelColor] = useState(false);

  const handleFocus = () => {
    setLabelColor(true);
  };

  const handleBlur = () => {
    setLabelColor(false);
  };

  return (
    <div className={`input ${className ? className : ""}`}>
      <label
        htmlFor={field.name}
        className={`input__label ${meta.touched && meta.error && "error"} ${labelColor ? "focused" : ""
          }`}
      >
        {label}
      </label>
      <input
        className={`input__field ${meta.touched && meta.error && "error"}`}
        {...field}
        {...props}
        type={type}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={handleChange}
        autoComplete="off"
        defaultValue={defaultValue}
        placeholder={placeholder}
        inputMode={inputMode}
        onChange={onChange}
        style={style}
        maxLength={maxLength}
        minLength={minLength}
        value={value}
        disabled={disabled}
      />
      <ErrorMessage
        component="p"
        name={field.name}
        className="input__error text-danger mt-2"
      />
    </div>
  );
};

export default CustomInputField;
