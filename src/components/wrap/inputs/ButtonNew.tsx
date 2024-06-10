
// src/components/wrap/inputs/ButtonNew.tsx

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};
interface ButtonProps {
  onClick?: () => void;
}
const ButtonNew: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <Fab sx={fabStyle} aria-label='Save' color='primary' onClick={onClick}>
      <AddIcon />
    </Fab>
  );
};

export default ButtonNew;
