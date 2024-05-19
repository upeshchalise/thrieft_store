/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldPath, FieldValues, UseFormRegister } from "react-hook-form";
import React from "react";
import clsx from "clsx";

interface BaseInputProps<FormValues extends FieldValues> {
  id?: string;
  placeholder?: string;
  type?: string;
  label?: string;
  register?: UseFormRegister<FormValues>; // Making register optional
  name: FieldPath<FormValues>;
  className?: string;
  readOnly?: boolean;
  error?: string;
  disabled?: boolean;
  defaultValue?: string | number | any;
  // customValidation?: (value: any, formValues: FormValues) => boolean | string;
  value?: string | number | readonly string[] | undefined;
}

const Input = <FormValues extends FieldValues>({
  id,
  placeholder,
  type,
  register,
  name,
  className,
  error,
  readOnly,
  disabled,
  defaultValue,
  // customValidation,
  ...rest
}: BaseInputProps<FormValues>) => {
  return (
    <>
      <input
        id={id}
        placeholder={placeholder}
        type={type}
        {...(register ? register(name) : {})}
        autoFocus={false}
        className={clsx(className)}
        defaultValue={defaultValue}
        disabled={disabled}
        error={!!error}
        readOnly={readOnly}
        {...rest}
        style={{
          textTransform: type === "email" ? "lowercase" : undefined,
        }}
      ></input>
      {error && <small>{error}</small>}
    </>
  );
};

export default Input;
