import React, { useState, useMemo } from "react";
import { ErrorMessage, useField } from "formik";
import Select from "react-select";
interface ReactSelectFieldProps {
  label?: string;
  className?: any;
  name: string;
  placeholder?: string;
  value?: any;
  noValue?: any;
  onChange?: any;
  options?: any;
}

const ReactSelectField = ({
  label,
  className,
  value,
  options,
  onChange,
  ...props
}: ReactSelectFieldProps) => {
  const [field, meta] = useField(props);
  const [labelColor] = useState(false);

  return (
    <div className={`input ${className ? className : ""}`}>
      <label
        htmlFor={field.name}
        className={`input__label ${meta.touched && meta.error && "error"} ${
          labelColor ? "focused" : ""
        }`}
      >
        {label}
      </label>

      <Select options={options} value={value} onChange={onChange} />
      <ErrorMessage component="p" name={field.name} className="input__error" />
    </div>
  );
};

export default ReactSelectField;
