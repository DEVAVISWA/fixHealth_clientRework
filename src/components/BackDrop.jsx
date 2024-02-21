import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const BackDrop = ({ active }) => {
  return (
    <div>
      {active ? (
        <Backdrop open={true} color="#fff">
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}
    </div>
  );
};

export default BackDrop;
