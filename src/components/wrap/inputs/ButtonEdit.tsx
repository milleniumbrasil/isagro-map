
// src/components/wrap/inputs/ButtonEdit.tsx

import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};
interface ButtonProps {
  onClick?: () => void;
}
const ButtonEdit: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <Fab sx={fabStyle} aria-label='Save' color='primary' onClick={onClick}>
      <EditIcon />
    </Fab>
  );
};

export default ButtonEdit;
