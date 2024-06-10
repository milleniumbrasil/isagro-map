
// src/components/wrap/inputs/ButtonSearch.tsx

import React from "react";
import Fab from "@mui/material/Fab";
import SearchIcon from "@mui/icons-material/Search";

const fabStyle = {
  bottom: 16,
  right: 16,
  margin: 5,
};

interface ButtonProps {
  onClick?: () => void;
}

const ButtonSearch: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <Fab
      sx={fabStyle}
      aria-label='Save'
      color='primary'
      onClick={onClick}
      id='btn-search'
    >
      <SearchIcon />
    </Fab>
  );
};

export default ButtonSearch;
