
// src/components/wrap/inputs/PasswordField.tsx

import * as React from "react";

import IconButton from "../../ext/displays/IconButtonExt";
import VisibilityOff from "../../ext/displays/IconVisibilityOffExt";
import Visibility from "../../ext/displays/IconVisibilityExt";
import Input from "../../ext/inputs/InputExt";
import InputLabel from "../../ext/inputs/InputLabelExt";
import InputAdornment from "../../ext/inputs/InputAdornmentExt";
import FormControl from "../../ext/inputs/FormControlExt";
import FormHelperText from "../../ext/inputs/FormHelperTextExt";

interface PasswordFieldWrapperProps {
  errorMessage: string;
  label: string;
  value: any;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  icon?: React.ReactNode;
  required: boolean;
}

export default function PasswordFieldWrapper({
  label,
  value,
  errorMessage,
  onChange,
  onBlur,
  icon,
}: PasswordFieldWrapperProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  
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

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl
      sx={{ m: 1, width: "100%" }}
      variant='standard'
      error={!!errorMessage}
    >
      <InputLabel htmlFor='standard-adornment-password'>{label}</InputLabel>
      <Input
        id='standard-adornment-password'
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {icon ? 
              icon :
              showPassword ? 
                <VisibilityOff /> : 
                <Visibility />
              }
            </IconButton>
          </InputAdornment>
        }
      />
      {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}
