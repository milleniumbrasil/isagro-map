
// src/components/wrap/inputs/ButtonClose.tsx

import React from "react";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";

const fabStyle = {
  bottom: 16,
  right: 16,
  margin: 5,
};

interface ButtonProps {
  onClick?: () => void;
}

const ButtonClose: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <Fab sx={fabStyle} aria-label='Save' color='primary' onClick={onClick}>
      <CloseIcon />
    </Fab>
  );
};

export default ButtonClose;
