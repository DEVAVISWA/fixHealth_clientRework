import { Alert, Snackbar, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMessage, resetMessage } from "../store/models/messageBar";

const MessageBar = () => {
  const dispatch = useDispatch();
  const { active, message, duration, type } = useSelector(
    (state) => state.message
  );
  const HandleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeMessage());
  };
  return (
    <Snackbar open={active} autoHideDuration={duration} onClose={HandleClose}>
      <Alert onClose={HandleClose} severity={type} sx={{ width: "100%" }}>
        {/* <Typography variant="h6">{message}</Typography> */}
        {message}
      </Alert>
    </Snackbar>
  );
};

export default MessageBar;
