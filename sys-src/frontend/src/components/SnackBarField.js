import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
  
export default function SnackBarField() {
  const [open, setOpen] = React.useState(true);
  

  const handleToClose = (event, reason) => {
    if ("clickaway" == reason) return;
    setOpen(false);
  };

  return (
    <div style={{ }}>
      <Snackbar 
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleToClose}
        message='ImagePlaceholder'
        action={
          <React.Fragment>
            
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleToClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        } 
      />
    </div>
  );
}