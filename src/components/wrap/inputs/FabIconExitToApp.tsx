
// src/components/wrap/inputs/FabIconExitToApp.tsx

import Fab from "@mui/material/Fab";
import IconExitToApp from "../../ext/displays/IconExitToApp";

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
      <IconExitToApp />
    </Fab>
  );
};

export default ButtonRefresh;
