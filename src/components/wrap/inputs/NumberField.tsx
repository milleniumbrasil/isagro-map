
// src/components/wrap/inputs/NumberField.tsx

import React from "react";
import InputFieldWrapper from "./InputField";
import NumbersIcon from "../../ext/displays/IconNumbersExt";

export interface NumberFieldWrapperProps {
  placeholder: string;
  errorMessage: string;
  label: string;
  value: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  icon?: React.ReactNode;
  required: boolean;
}

const NumberFieldWrapper: React.FC<NumberFieldWrapperProps> = (props) => {
  return <InputFieldWrapper {...props} icon={<NumbersIcon />} />;
};

export default NumberFieldWrapper;
