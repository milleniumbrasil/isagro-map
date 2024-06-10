
// src/components/wrap/inputs/TextField.tsx

import React from "react";
import InputFieldWrapper from "./InputField";
import IconTextFields from "../../ext/displays/IconTextFieldsExt";

export interface InputFieldWrapperProps {
  placeholder: string;
  errorMessage: string;
  label: string;
  value: string;
  onChange?: (event: string) => void;
  onBlur?: (event: string) => void; 
  icon?: React.ReactNode;
  required: boolean;
}

const TextFieldWrapper: React.FC<InputFieldWrapperProps> = (props) => {
  const stringValue: string = props.value;
  return (
    <InputFieldWrapper
      {...props}
      icon={props.icon ? props.icon : <IconTextFields />}
      value={stringValue}
    />
  );
};

export default TextFieldWrapper;
