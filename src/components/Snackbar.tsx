import React from "react";
import { Button, IconButton, Snackbar as MUISnackbar } from "@mui/material";
import { Close } from "@mui/icons-material";

interface SnackbarProps {
  message: string;
}

const Snackbar: React.FC<SnackbarProps> = ({ message }) => {
  const [isOpen, setOpen] = React.useState<boolean>();

  function handleClose(
    event: React.SyntheticEvent | Event,
    reason?: string
  ): void {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  React.useEffect(() => {
    setOpen(Boolean(message));
  }, [message]);
  return (
    <>
      <MUISnackbar
        open={isOpen}
        autoHideDuration={4000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </>
  );
};

export default Snackbar;
