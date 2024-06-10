
// src/components/wrap/inputs/FabIconSearch.tsx

import Fab from "@mui/material/Fab";
import SearchIcon from "../../../components/ext/displays/IconSearchExt";

interface ButtonProps {
  onClick?: () => void;
}
const ButtonRefresh: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <Fab
      sx={{
        position: "static",
        bottom: 16,
        right: 16,
      }}
      aria-label='Search'
      color='primary'
      onClick={onClick}
    >
      <SearchIcon />
    </Fab>
  );
};

export default ButtonRefresh;
