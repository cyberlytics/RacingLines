import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import Modal from "@material-ui/core/Modal";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CloseIcon from "@material-ui/icons/Close";

export default function SnackBarField() {

  const [open, setOpen] = React.useState(true);
  

  const handleToClose = (event, reason) => {
    if ("clickaway" == reason) return;
    setOpen(false);
  };

  const action =(
    <React.Fragment style={{ display: "flex" }}>
      <IconButton
        size="small"
        aria-label="close"
        color="black"
        backgroundColor="Black"
        onClick={handleToClose}>
        <CloseIcon fontSize="medium" />
      </IconButton>
    </React.Fragment>
  );


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
      >
       <SnackbarContent action={action} style={{ backgroundColor:'transparent', width:"590px", height:"250px"}} message={<div horizontal="bottom" vertical="left"><img margin="0" padding="0" src={process.env.PUBLIC_URL + "/images/TheKeyboard.png"}/></div>}/>
      </Snackbar>
    </div>
  );
}

