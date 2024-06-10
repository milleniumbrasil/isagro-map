
// src/components/wrap/layouts/Box.tsx

import Box, { BoxProps } from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { BoxWrapperTheme } from "./Box.Theme";

interface BoxWrapperProps extends BoxProps {
  children?: React.ReactNode;
}

const BoxWrapper: React.FC<BoxWrapperProps> = (props) => {
  const currentTheme = useTheme();
  const boxWrapperTheme = BoxWrapperTheme(currentTheme);

  return (
    <Box sx={{ ...boxWrapperTheme, ...props.sx }} {...props}>
      {props.children}
    </Box>
  );
};

export default BoxWrapper;
