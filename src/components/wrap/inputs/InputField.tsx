
// src/components/wrap/inputs/InputField.tsx

import Input from "../../ext/inputs/InputExt";
import InputLabel from "../../ext/inputs/InputLabelExt";
import InputAdornment from "../../ext/inputs/InputAdornmentExt";
import FormControl from "../../ext/inputs/FormControlExt";
import FormHelperText from "../../ext/inputs/FormHelperTextExt";

interface InputFieldWrapperProps {
  placeholder: string;
  errorMessage: string;
  label: string;
  value: any;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  icon?: React.ReactNode;
  required: boolean;
}

export default function InputFieldWrapper({
  placeholder,
  label,
  value,
  errorMessage,
  onChange,
  onBlur,
  icon,
  required,
}: InputFieldWrapperProps) {
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange && event){
      onChange(event.target.value);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onBlur && event){
      onBlur(event.target.value);
    }
  };

  return (
    <FormControl
      sx={{ m: 1, width: "100%" }}
      variant='standard'
      error={!!errorMessage}
    >
      <InputLabel htmlFor='standard-adornment-text'>{label}</InputLabel>
      <Input
        id='standard-adornment-text'
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        sx={{ padding: "15px" }}
        endAdornment={
          <InputAdornment position='end'>{icon || null}</InputAdornment>
        }
      />
      {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}
