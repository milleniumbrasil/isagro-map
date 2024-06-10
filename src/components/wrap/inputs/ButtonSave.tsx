
// src/components/wrap/inputs/ButtonSave.tsx

import React from "react";
import Fab from "@mui/material/Fab";
import SaveIcon from "@mui/icons-material/Save";

const fabStyle = {
  bottom: 16,
  right: 16,
  margin: 5,
};

interface ButtonProps {
  onClick?: () => void;
}

const ButtonSave: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <Fab sx={fabStyle} aria-label='Save' color='primary' onClick={onClick}>
      <SaveIcon />
    </Fab>
  );
};

export default ButtonSave;
