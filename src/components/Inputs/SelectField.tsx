import React, { useState } from "react";
import { ErrorMessage, useField } from "formik";

interface SelectFieldProps {
  label?: string;
  className?: any;
  name: string;
  placeholder?: string;
  values?: any;
  noValue?: any;
  options?: any;
  onChange?: any;
}

const SelectField = ({
  label,
  className,
  values,
  noValue,
  options,
  onChange,
  ...props
}: SelectFieldProps) => {
  const [field, meta] = useField(props);

  const [labelColor] = useState(false);

  const customStyles = {
    option: (provided: any) => ({
      ...provided,
    }),
    control: (provided: any, state: any) => ({
      // provided adds react-select default styles
      ...provided,
      background: "white",
      height: "36px",
      outline: state.isFocused ? "1px solid #01ffff !important" : "",
      border: state.isFocused ? "1px solid #01ffff !important" : "",
      boxShadow: state.isFocused ? "0 0 0 0.2rem rgb(0 128 128 / 25%)" : "",
    }),
    singleValue: (provided: any) => {
      return { ...provided };
    },
  };

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
      <select
        className={`form-control shadow-name reg-input ${
          meta.touched && meta.error && "is-invalid"
        }`}
        id={field.name}
        {...field}
        {...props}
        autoComplete="off"
        onChange={onChange}
        value={values}
      >
        {noValue && <option value="">{noValue}</option>}
        {options &&
          options?.map((item: any, index: any) => (
            <option key={index} value={values ? values[index] : item}>
              {item}
            </option>
          ))}
      </select>

      <ErrorMessage component="p" name={field.name} className="input__error" />
    </div>
  );
};

export default SelectField;
