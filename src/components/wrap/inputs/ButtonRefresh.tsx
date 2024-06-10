
// src/components/wrap/inputs/ButtonRefresh.tsx

import Fab from "@mui/material/Fab";
import RefreshIcon from "@mui/icons-material/Refresh";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};
interface ButtonProps {
  onClick?: () => void;
}
const ButtonRefresh: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <Fab sx={fabStyle} aria-label='Save' color='primary' onClick={onClick}>
      <RefreshIcon />
    </Fab>
  );
};

export default ButtonRefresh;
