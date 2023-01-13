import React, { useState, useMemo } from "react";
import { ErrorMessage, useField } from "formik";
import Select from "react-select";
import countryList from "react-select-country-list";
interface CountrySelectFieldProps {
  label?: string;
  className?: any;
  name: string;
  placeholder?: string;
  value?: any;
  noValue?: any;
  onChange?: any;
}

const CountrySelectField = ({
  label,
  className,
  value,
  onChange,
  ...props
}: CountrySelectFieldProps) => {
  const [field, meta] = useField(props);
  const [labelColor] = useState(false);

  const options: any = useMemo(() => countryList().getData(), []);

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

export default CountrySelectField;
