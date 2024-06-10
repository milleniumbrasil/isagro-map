
// src/components/wrap/feedback/TransitionAlert.tsx

import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

interface TransitionAlertProps {
  message: string;
  severity: "success" | "info" | "warning" | "error";
  show?: boolean;
}

const TransitionAlert: React.FC<TransitionAlertProps> = ({
  message,
  severity,
  show = true,
}) => {
  const [open, setOpen] = React.useState(show);

  React.useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <Box sx={{ width: "95%" }}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => setOpen(false)}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
          sx={{ mb: 2 }}
          severity={severity}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
};
export default TransitionAlert;
